import type { Answers } from '@/types/answers'
import YAML from 'yaml'
import { MqttMapper } from './mqttMapper'

import dashboardServiceFile from '@/templates/services/dashboard.yml?raw'
import influxdbServiceFile from '@/templates/services/influxdb.yml?raw'
import postgresqlServiceFile from '@/templates/services/postgresql.yml?raw'
import redisServiceFile from '@/templates/services/redis.yml?raw'
import senecCollectorServiceFile from '@/templates/services/senec-collector.yml?raw'
import mqttCollectorServiceFile from '@/templates/services/mqtt-collector.yml?raw'
import forecastCollectorServiceFile from '@/templates/services/forecast-collector.yml?raw'
import shellyCollectorServiceFile from '@/templates/services/shelly-collector.yml?raw'
import powerSplitterServiceFile from '@/templates/services/power-splitter.yml?raw'
import watchtowerServiceFile from '@/templates/services/watchtower.yml?raw'
import postgresqlBackupServiceFile from '@/templates/services/postgresql-backup.yml?raw'
import influxdbBackupServiceFile from '@/templates/services/influxdb-backup.yml?raw'
import traefikServiceFile from '@/templates/services/traefik.yml?raw'

const dashboardService = YAML.parse(dashboardServiceFile) as DockerService
const influxdbService = YAML.parse(influxdbServiceFile) as DockerService
const postgresqlService = YAML.parse(postgresqlServiceFile) as DockerService
const redisService = YAML.parse(redisServiceFile) as DockerService
const senecCollectorService = YAML.parse(senecCollectorServiceFile) as DockerService
const mqttCollectorService = YAML.parse(mqttCollectorServiceFile) as DockerService
const forecastCollectorService = YAML.parse(forecastCollectorServiceFile) as DockerService
const shellyCollectorService = YAML.parse(shellyCollectorServiceFile) as DockerService
const powerSplitterService = YAML.parse(powerSplitterServiceFile) as DockerService
const watchtowerService = YAML.parse(watchtowerServiceFile) as DockerService
const postgresqlBackupService = YAML.parse(postgresqlBackupServiceFile) as DockerService
const influxdbBackupService = YAML.parse(influxdbBackupServiceFile) as DockerService
const traefikService = YAML.parse(traefikServiceFile) as DockerService

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
  private readonly compose: DockerCompose

  constructor(private readonly answers: Answers) {
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
      ? YAML.stringify(this.compose, {
          singleQuote: true,
          lineWidth: 0,
        })
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
      this.compose.services.dashboard.ports = [`${this.answers.app_port ?? 3000}:3000`]

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

    if (
      this.answers.forecast == 'forecast_forecast_solar' ||
      this.answers.forecast == 'forecast_solcast'
    ) {
      this.addService('forecast-collector', forecastCollectorService)
    }

    if (
      this.answers.devices?.length &&
      this.answers.devices.includes('inverter') &&
      (this.answers.devices.includes('wallbox') || this.answers.devices.includes('heatpump'))
    )
      if (
        this.answers.installation_type === 'local' ||
        this.answers.installation_type === 'cloud' ||
        this.answers.distributed_choice === 'cloud'
      )
        this.addService('power-splitter', powerSplitterService)
  }

  private mqttRequired() {
    if (this.answers.distributed_choice === 'cloud') return false

    return (
      this.answers.battery_vendor === 'other' ||
      (this.answers.devices?.includes('wallbox') && this.answers.wallbox_vendor !== 'senec') ||
      this.answers.heatpump_access === 'mqtt' ||
      this.answers.devices?.includes('car') ||
      (this.answers.devices?.length === 1 && this.answers.devices.includes('inverter'))
    )
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
