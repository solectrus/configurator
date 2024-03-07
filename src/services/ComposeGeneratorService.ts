import type { Answers } from '@/types/answers'
import yaml from 'js-yaml'

import dashboardService from '@/templates/services/dashboard.yml'
import influxdbService from '@/templates/services/influxdb.yml'
import postgresqlService from '@/templates/services/postgresql.yml'
import redisService from '@/templates/services/redis.yml'
import senecCollectorService from '@/templates/services/senec-collector.yml'
import mqttCollectorService from '@/templates/services/mqtt-collector.yml'
import forecastCollectorService from '@/templates/services/forecast-collector.yml'
import shellyCollectorService from '@/templates/services/shelly-collector.yml'
import watchtowerService from '@/templates/services/watchtower.yml'
import postgresqlBackupService from '@/templates/services/postgresql-backup.yml'
import influxdbBackupService from '@/templates/services/influxdb-backup.yml'

type DockerService = {
  image: string
  environment?: string[]
  ports?: string[]
  volumes?: string[]
  links: string[]
  depends_on?: Record<string, { condition: string }>
  labels?: string[]
  healthcheck?: {
    test: string
  }
}

export type DockerCompose = {
  version: string
  services: Record<string, DockerService>
}

export class ComposeGeneratorService {
  private compose: DockerCompose

  constructor(private answers: Answers) {
    this.compose = {
      version: '3.7',
      services: {},
    }
  }

  public build() {
    this.configureBaseServices()
    this.configureCollectorServices()
    this.configureWatchtower()
    this.configureBackup()

    const text = Object.keys(this.compose.services).length
      ? yaml.dump(this.compose, { lineWidth: -1 })
      : ''

    return {
      raw: () => this.compose,
      text: () => text,
    }
  }

  private configureBaseServices() {
    if (
      this.answers.installation_type &&
      (this.answers.installation_type != 'distributed' ||
        (this.answers.distributed_choice && this.answers.distributed_choice != 'local'))
    ) {
      this.addService('dashboard', dashboardService)
      this.addService('influxdb', influxdbService)
      this.addService('postgresql', postgresqlService)
      this.addService('redis', redisService)
    }
  }

  private addService(serviceName: string, serviceConfig: DockerService) {
    this.compose.services[serviceName] = { ...serviceConfig }

    if (serviceConfig.environment?.includes('INFLUX_HOST') && this.compose.services.influxdb) {
      this.compose.services[serviceName].depends_on = { influxdb: { condition: 'service_healthy' } }
      this.compose.services[serviceName].links = ['influxdb']
    }
  }

  private configureCollectorServices() {
    switch (this.answers.battery_vendor) {
      case 'senec3':
        if (
          this.answers.installation_type &&
          (this.answers.installation_type !== 'distributed' ||
            (this.answers.distributed_choice && this.answers.distributed_choice === 'local'))
        )
          this.addService('senec-collector', senecCollectorService)
        break

      case 'senec4':
        this.addService('senec-collector', senecCollectorService)
        break

      case 'other':
        this.addService('mqtt-collector', mqttCollectorService)
        break
    }

    if (this.answers.wallbox_vendor === 'other') {
      if (this.answers.installation_type === 'local' || this.answers.distributed_choice === 'local')
        this.addService('mqtt-collector', mqttCollectorService)
    }

    if (this.answers.heatpump_access == 'shelly') {
      if (this.answers.installation_type === 'local' || this.answers.distributed_choice === 'local')
        this.addService('shelly-collector', shellyCollectorService)
    }

    if (this.answers.forecast === true) {
      this.addService('forecast-collector', forecastCollectorService)
    }
  }

  private configureWatchtower() {
    if (this.answers.updates === true) {
      this.addService('watchtower', watchtowerService)

      for (const serviceName in this.compose.services) {
        this.compose.services[serviceName].labels = [
          ...(this.compose.services[serviceName].labels ?? []),
          'com.centurylinklabs.watchtower.scope=solectrus',
        ]
      }
    }
  }

  private configureBackup() {
    if (this.answers.backup === true) {
      if (this.compose.services.postgresql) {
        this.addService('postgresql-backup', postgresqlBackupService)
      }

      if (this.compose.services.influxdb) {
        this.addService('influxdb-backup', influxdbBackupService)
      }
    }
  }
}
