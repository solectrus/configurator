import type { Answers } from '@/stores/survey'
import yaml from 'js-yaml'

import appService from '@/templates/services/app.yml'
import influxdbService from '@/templates/services/influxdb.yml'
import dbService from '@/templates/services/db.yml'
import redisService from '@/templates/services/redis.yml'
import senecCollectorService from '@/templates/services/senec-collector.yml'
import mqttCollectorService from '@/templates/services/mqtt-collector.yml'
import forecastCollectorService from '@/templates/services/forecast-collector.yml'
import shellyCollectorService from '@/templates/services/shelly-collector.yml'
import watchtowerService from '@/templates/services/watchtower.yml'

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

export class ComposeGeneratorService {
  private answers: Answers
  private compose: {
    version: string
    services: Record<string, DockerService>
  }

  constructor(answers: Answers) {
    this.answers = answers
    this.compose = {
      version: '3.7',
      services: {}
    }
  }

  public build(): string {
    this.configureBaseServices()
    this.configureCollectorServices()
    this.configureWatchtower()

    return Object.keys(this.compose.services).length
      ? yaml.dump(this.compose, { lineWidth: -1 })
      : ''
  }

  private configureBaseServices() {
    if (
      this.answers.installation_type &&
      (this.answers.installation_type != 'distributed' ||
        this.answers.q_distributed_choice != 'local')
    ) {
      this.addService('influxdb', influxdbService)
      this.addService('db', dbService)
      this.addService('redis', redisService)
      this.addService('app', appService)
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
      case 'battery_senec3':
        if (
          this.answers.installation_type &&
          (this.answers.installation_type !== 'distributed' ||
            this.answers.q_distributed_choice === 'local')
        )
          this.addService('senec-collector', senecCollectorService)
        break

      case 'battery_senec4':
        this.addService('senec-collector', senecCollectorService)
        break

      case 'battery_other':
        this.addService('mqtt-collector', mqttCollectorService)
        break
    }

    if (this.answers.wallbox_vendor === 'wallbox_other') {
      if (
        this.answers.installation_type === 'local' ||
        this.answers.q_distributed_choice === 'local'
      )
        this.addService('mqtt-collector', mqttCollectorService)
    }

    if (this.answers.heatpump_access == 'heatpump_shelly') {
      this.addService('shelly-collector', shellyCollectorService)
    }

    if (this.answers.q_forecast === true) {
      this.addService('forecast-collector', forecastCollectorService)
    }
  }

  private configureWatchtower() {
    if (this.answers.q_updates === true) {
      this.addService('watchtower', watchtowerService)

      for (const serviceName in this.compose.services) {
        this.compose.services[serviceName].labels = [
          ...(this.compose.services[serviceName].labels ?? []),
          'com.centurylinklabs.watchtower.scope=solectrus'
        ]
      }
    }
  }
}
