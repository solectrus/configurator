import type { Answers } from '@/types/answers'
import type { DockerCompose } from '@/services/ComposeGeneratorService'
import { MqttMapper } from './mqttMapper'
import { SensorBuilder } from './sensorBuilder'

import dashboardVariables from '@/templates/variables/dashboard.env?raw'
import forecastCollectorVariables from '@/templates/variables/forecast-collector.env?raw'
import influxdbVariables from '@/templates/variables/influxdb.env?raw'
import senecCollectorVariables from '@/templates/variables/senec-collector.env?raw'
import mqttCollectorVariables from '@/templates/variables/mqtt-collector.env?raw'
import shellyCollectorVariables from '@/templates/variables/shelly-collector.env?raw'
import postgresqlVariables from '@/templates/variables/postgresql.env?raw'
import redisVariables from '@/templates/variables/redis.env?raw'
import awsVariables from '@/templates/variables/aws.env?raw'
import traefikVariables from '@/templates/variables/traefik.env?raw'

export class EnvGeneratorService {
  constructor(
    private compose: DockerCompose,
    private answers: Answers,
  ) {}

  public build(): string {
    return [
      this.buildDashboardVariables(),
      this.buildSenecCollectorVariables(),
      this.buildShellyCollectorVariables(),
      this.buildMQTTCollectorVariables(),
      this.buildForecastCollectorVariables(),
      this.buildInfluxdbVariables(),
      this.buildPostgresqlVariables(),
      this.buildRedisVariables(),
      this.buildAwsVariables(),
      this.buildTraefikVariables(),
    ]
      .filter(Boolean)
      .join('\n')
  }

  private buildDashboardVariables(): string | undefined {
    if (this.compose.services['dashboard']) {
      return this.replaceEnvValues(dashboardVariables, {
        APP_HOST: 'myapp.local',
        ADMIN_PASSWORD: this.answers.admin_password,
        SECRET_KEY_BASE: this.generateSecretKeyBase(this.answers.admin_password),
        INSTALLATION_DATE: this.answers.installation_date,
        INFLUX_POLL_INTERVAL: this.answers.senec_interval ?? this.answers.senec_interval_cloud ?? 5,
        ...this.sensorVariables(),
      })
    }
  }

  private sensorVariables() {
    return Object.entries(this.sensors()).reduce((result, [key, value]) => {
      return { ...result, [`INFLUX_SENSOR_${key}`]: value }
    }, {})
  }

  private sensors() {
    return this.sensorBuilder.build()
  }

  private get sensorBuilder() {
    return new SensorBuilder(this.answers)
  }

  private buildForecastCollectorVariables(): string | undefined {
    if (this.compose.services['forecast-collector']) {
      return this.replaceEnvValues(forecastCollectorVariables, {})
    }
  }

  private buildInfluxdbVariables(): string | undefined {
    if (this.compose.services['influxdb']) {
      return this.replaceEnvValues(influxdbVariables, {})
    }
  }

  private buildSenecCollectorVariables(): string | undefined {
    if (this.compose.services['senec-collector']) {
      if (
        (this.answers.battery_vendor === 'senec3' && this.answers.installation_type === 'local') ||
        this.answers.distributed_choice === 'local'
      )
        return this.replaceEnvValues(senecCollectorVariables, {
          SENEC_ADAPTER: 'local',
          SENEC_HOST: this.answers.senec_host,
          SENEC_LANGUAGE: this.answers.senec_language,
          SENEC_SCHEMA: this.answers.senec_schema,
          SENEC_USERNAME: undefined,
          SENEC_PASSWORD: undefined,
          SENEC_SYSTEM_ID: undefined,
          SENEC_INTERVAL: this.answers.senec_interval,
        })
      else if (
        this.answers.battery_vendor === 'senec4' ||
        (this.answers.battery_vendor === 'senec3' && this.answers.installation_type === 'cloud')
      )
        return this.replaceEnvValues(senecCollectorVariables, {
          SENEC_ADAPTER: 'cloud',
          SENEC_HOST: undefined,
          SENEC_LANGUAGE: undefined,
          SENEC_SCHEMA: undefined,
          SENEC_USERNAME: this.answers.senec_username,
          SENEC_PASSWORD: this.answers.senec_password,
          SENEC_SYSTEM_ID: this.answers.senec_system_id,
          SENEC_INTERVAL: this.answers.senec_interval_cloud,
        })
    }
  }

  private buildShellyCollectorVariables(): string | undefined {
    if (this.compose.services['shelly-collector']) {
      return this.replaceEnvValues(shellyCollectorVariables, {})
    }
  }

  private buildMQTTCollectorVariables(): string | undefined {
    if (this.compose.services['mqtt-collector']) {
      return this.replaceEnvValues(mqttCollectorVariables, {
        ...this.mqttMappingVariables(),
      })
    }
  }

  private mqttMappingVariables() {
    return this.MqttMapper.variables()
  }

  private get MqttMapper() {
    return new MqttMapper(this.answers)
  }

  private buildPostgresqlVariables(): string | undefined {
    if (this.compose.services['postgresql']) {
      return this.replaceEnvValues(postgresqlVariables, {})
    }
  }

  private buildRedisVariables(): string | undefined {
    if (this.compose.services['redis']) {
      return this.replaceEnvValues(redisVariables, {})
    }
  }

  private buildAwsVariables(): string | undefined {
    if (this.compose.services['postgresql-backup'] || this.compose.services['influxdb-backup']) {
      return this.replaceEnvValues(awsVariables, {
        AWS_ACCESS_KEY_ID: this.answers.aws_access_key_id,
        AWS_SECRET_ACCESS_KEY: this.answers.aws_secret_access_key,
        AWS_REGION: this.answers.aws_region,
        AWS_BUCKET: this.answers.aws_bucket,
      })
    }
  }

  private buildTraefikVariables(): string | undefined {
    if (this.compose.services['traefik']) {
      return this.replaceEnvValues(traefikVariables, {
        APP_DOMAIN: this.answers.app_domain,
        LETSENCRYPT_EMAIL: `webmaster@${this.answers.app_domain}`,
      })
    }
  }

  // Replace the values of the given environment content with the given replacements
  // The replacements are expected to be in the format { key: value }
  // Example: replaceEnvValues('FOO=bar\nBAZ=qux', { FOO: 'baz' }) => 'FOO=baz\nBAZ=qux'
  // If a key is not found, it will be added to the end
  private replaceEnvValues(
    envContent: string,
    replacements: Record<string, string | number | undefined>,
  ): string {
    let result = envContent

    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(`^${key}=.*$`, 'gm')
      if (value) {
        if (result.match(regex)) {
          // Replace existing line
          result = result.replace(regex, `${key}=${value}`)
        } else {
          // Add new line
          result += `${key}=${value}\n`
        }
      } else {
        // Comment out the line
        result = result.replace(regex, `# $&`)
      }
    })

    return result
  }

  private generateSecretKeyBase(seed?: string, length = 128) {
    let seedInt = this.stringToSeed(seed || '')

    return Array.from({ length: length / 2 }, () => {
      seedInt = (seedInt * 9_301 + 49_297) % 233_280
      const value = (Math.floor((seedInt / 233_280) * 256) + 256) % 256
      return value.toString(16).padStart(2, '0')
    }).join('')
  }

  private stringToSeed(str: string): number {
    return Array.from(str).reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0)
  }
}
