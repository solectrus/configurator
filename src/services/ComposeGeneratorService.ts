import type { Answers } from '@/stores/survey'
import yaml from 'js-yaml'

import appService from '@/templates/services/app.yml'
import influxdbService from '@/templates/services/influxdb.yml'
import dbService from '@/templates/services/db.yml'
import redisService from '@/templates/services/redis.yml'
import senecCollectorService from '@/templates/services/senec-collector.yml'
import mqttCollectorService from '@/templates/services/mqtt-collector.yml'
import forecastCollectorService from '@/templates/services/forecast-collector.yml'
import watchtowerService from '@/templates/services/watchtower.yml'

type DockerService = {}

export class ComposeGeneratorService {
  static generate(answers: Answers): string {
    const dockerComposeObj: {
      version: string
      services: Record<string, DockerService | undefined>
    } = {
      version: '3.7',
      services: {}
    }

    dockerComposeObj.services['app'] = appService
    dockerComposeObj.services['influxdb'] = influxdbService
    dockerComposeObj.services['db'] = dbService
    dockerComposeObj.services['redis'] = redisService

    if (answers.battery_vendor === 'battery_senec')
      dockerComposeObj.services['senec-collector'] = senecCollectorService

    if (answers.battery_vendor === 'battery_other')
      dockerComposeObj.services['mqtt-collector'] = mqttCollectorService

    dockerComposeObj.services['forecast-collector'] = forecastCollectorService
    dockerComposeObj.services['watchtower'] = watchtowerService

    return yaml.dump(dockerComposeObj, { lineWidth: -1 })
  }
}
