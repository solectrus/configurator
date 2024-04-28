import type { Answers } from '@/types/answers'
import yaml from 'js-yaml'
import { MqttMapper } from './mqttMapper'

import dashboardServiceFile from '@/templates/services/dashboard.yml?raw'
import influxdbServiceFile from '@/templates/services/influxdb.yml?raw'
import postgresqlServiceFile from '@/templates/services/postgresql.yml?raw'
import redisServiceFile from '@/templates/services/redis.yml?raw'
import senecCollectorServiceFile from '@/templates/services/senec-collector.yml?raw'
import mqttCollectorServiceFile from '@/templates/services/mqtt-collector.yml?raw'
import forecastCollectorServiceFile from '@/templates/services/forecast-collector.yml?raw'
import shellyCollectorServiceFile from '@/templates/services/shelly-collector.yml?raw'
import watchtowerServiceFile from '@/templates/services/watchtower.yml?raw'
import postgresqlBackupServiceFile from '@/templates/services/postgresql-backup.yml?raw'
import influxdbBackupServiceFile from '@/templates/services/influxdb-backup.yml?raw'
import traefikServiceFile from '@/templates/services/traefik.yml?raw'

const dashboardService = yaml.load(dashboardServiceFile) as DockerService
const influxdbService = yaml.load(influxdbServiceFile) as DockerService
const postgresqlService = yaml.load(postgresqlServiceFile) as DockerService
const redisService = yaml.load(redisServiceFile) as DockerService
const senecCollectorService = yaml.load(senecCollectorServiceFile) as DockerService
const mqttCollectorService = yaml.load(mqttCollectorServiceFile) as DockerService
const forecastCollectorService = yaml.load(forecastCollectorServiceFile) as DockerService
const shellyCollectorService = yaml.load(shellyCollectorServiceFile) as DockerService
const watchtowerService = yaml.load(watchtowerServiceFile) as DockerService
const postgresqlBackupService = yaml.load(postgresqlBackupServiceFile) as DockerService
const influxdbBackupService = yaml.load(influxdbBackupServiceFile) as DockerService
const traefikService = yaml.load(traefikServiceFile) as DockerService

type DockerService = {
  image: string
  environment?: string[]
  ports?: string[]
  volumes?: string[]
  links?: string[]
  depends_on?: Record<string, { condition: string }>
  labels?: string[]
  healthcheck?: {
    test: string
    interval: string
    timeout: string
    retries: number
    start_period: string
  }
}

export type DockerCompose = {
  services: Record<string, DockerService>
}

export class ComposeGenerator {
  private compose: DockerCompose

  constructor(private answers: Answers) {
    this.compose = {
      services: {},
    }
  }

  public build() {
    this.configureBaseServices()
    this.configureCollectorServices()
    this.configureTraefik()
    this.configureBackup()
    this.configureWatchtower()

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

      if (this.answers.distributed_choice === 'cloud') {
        this.compose.services.influxdb.ports = ['8086:8086']
      }

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
    }

    if (this.answers.heatpump_access == 'shelly') {
      if (this.answers.installation_type === 'local' || this.answers.distributed_choice === 'local')
        this.addService('shelly-collector', shellyCollectorService)
    }

    if (this.mqttRequired()) {
      // Deep clone to avoid modifying the original template
      const service = structuredClone(mqttCollectorService)

      // Add variable names
      const varNames = Object.keys(this.mqttMapper.variables())
      service.environment ||= []
      service.environment.push(...varNames)

      this.addService('mqtt-collector', service)
    }

    if (this.answers.forecast === true) {
      this.addService('forecast-collector', forecastCollectorService)
    }
  }

  private mqttRequired() {
    if (this.answers.distributed_choice === 'cloud') return false

    if (this.answers.battery_vendor === 'other') return true
    if (this.answers.wallbox_vendor === 'other') return true
    if (this.answers.heatpump_access === 'mqtt') return true
    if (this.answers.devices?.length === 1 && this.answers.devices.includes('inverter')) return true

    return false
  }

  private configureWatchtower() {
    if (Object.keys(this.compose.services).length > 0) {
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

  private configureTraefik() {
    if (this.answers.traefik && this.compose.services.dashboard) {
      this.addService('traefik', traefikService)

      this.compose.services.dashboard.labels = [
        ...(this.compose.services.dashboard.labels ?? []),
        'traefik.enable=true',
        'traefik.http.routers.app-solectrus.rule=Host(`${APP_DOMAIN}`)',
        'traefik.http.routers.app-solectrus.entrypoints=websecure',
        'traefik.http.routers.app-solectrus.tls.certresolver=myresolver',
        'traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https',
        'traefik.http.routers.redirs.rule=hostregexp(`{host:.+}`)',
        'traefik.http.routers.redirs.entrypoints=web',
        'traefik.http.routers.redirs.middlewares=redirect-to-https',
      ]

      this.compose.services.influxdb.labels = [
        ...(this.compose.services.influxdb.labels ?? []),
        'traefik.enable=true',
        'traefik.http.routers.influxdb-solectrus.rule=Host(`${APP_DOMAIN}`)',
        'traefik.http.routers.influxdb-solectrus.entrypoints=influxdb',
        'traefik.http.routers.influxdb-solectrus.tls.certresolver=myresolver',
        'traefik.http.routers.influxdb-solectrus.tls=true',
      ]

      this.compose.services.dashboard.ports = undefined
      this.compose.services.influxdb.ports = undefined
    }
  }

  private get mqttMapper() {
    return new MqttMapper(this.answers)
  }
}
