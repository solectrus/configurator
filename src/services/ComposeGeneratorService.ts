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
  depends_on?: string[]
  labels?: string[]
  healthcheck?: {
    test: string
  }
}

export class ComposeGeneratorService {
  static generate(answers: Answers): string {
    const compose: {
      version: string
      services: Record<string, DockerService | undefined>
    } = {
      version: '3.7',
      services: {}
    }

    const WATCHTOWER_LABEL = 'com.centurylinklabs.watchtower.scope=solectrus'

    if (answers.q_distributed_choice != 'local') {
      compose.services.app = appService as DockerService
      compose.services.influxdb = influxdbService as DockerService
      compose.services.db = dbService as DockerService
      compose.services.redis = redisService as DockerService
    }

    if (answers.q_updates === true) {
      compose.services.watchtower = watchtowerService as DockerService

      if (answers.q_distributed_choice != 'local') {
        compose.services.app!.labels = [WATCHTOWER_LABEL]
        compose.services.influxdb!.labels = [WATCHTOWER_LABEL]
        compose.services.db!.labels = [WATCHTOWER_LABEL]
        compose.services.redis!.labels = [WATCHTOWER_LABEL]
      }
    }

    if (answers.battery_vendor == 'battery_senec3' || answers.battery_vendor == 'battery_senec4') {
      compose.services['senec-collector'] = senecCollectorService as DockerService

      if (answers.q_updates === true) {
        compose.services['senec-collector'].labels = [WATCHTOWER_LABEL]
      }
    } else if (answers.battery_vendor === 'battery_other') {
      compose.services['mqtt-collector'] = mqttCollectorService as DockerService
      if (answers.q_updates === true) {
        compose.services['mqtt-collector'].labels = [WATCHTOWER_LABEL]
      }
    }

    if (answers.q_forecast === true) {
      compose.services['forecast-collector'] = forecastCollectorService as DockerService
      if (answers.q_updates === true) {
        compose.services['forecast-collector'].labels = [WATCHTOWER_LABEL]
      }
    }

    if (answers.heatpump_access == 'heatpump_shelly') {
      compose.services['shelly-collector'] = shellyCollectorService as DockerService
      if (answers.q_updates === true) {
        compose.services['shelly-collector'].labels = [WATCHTOWER_LABEL]
      }
    }

    return yaml.dump(compose, { lineWidth: -1 })
  }
}
