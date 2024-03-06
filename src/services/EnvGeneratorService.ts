import type { Answers } from '@/stores/survey'
import type { DockerCompose } from '@/services/ComposeGeneratorService'

import dashboardVariables from '@/templates/variables/dashboard.env?raw'
import forecastCollectorVariables from '@/templates/variables/forecast-collector.env?raw'
import influxdbVariables from '@/templates/variables/influxdb.env?raw'
import senecCollectorVariables from '@/templates/variables/senec-collector.env?raw'
import mqttCollectorVariables from '@/templates/variables/mqtt-collector.env?raw'
import shellyCollectorVariables from '@/templates/variables/shelly-collector.env?raw'
import postgresqlVariables from '@/templates/variables/postgresql.env?raw'
import redisVariables from '@/templates/variables/redis.env?raw'

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
    ]
      .filter(Boolean)
      .join('\n')
  }

  private buildDashboardVariables(): string | undefined {
    if (this.compose.services['dashboard']) {
      return this.replaceEnvValues(dashboardVariables, {
        APP_HOST: 'myapp.local',
        ADMIN_PASSWORD: this.answers.admin_password as string,
        SECRET_KEY_BASE: this.generateSecretKeyBase(this.answers.admin_password as string),
        INSTALLATION_DATE: this.answers.q_installation_date as string,
      })
    }
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
        (this.answers.battery_vendor === 'battery_senec3' &&
          this.answers.installation_type === 'local') ||
        this.answers.q_distributed_choice === 'local'
      )
        return this.replaceEnvValues(senecCollectorVariables, {
          SENEC_ADAPTER: 'local',
          SENEC_HOST: this.answers.senec_host as string,
          SENEC_LANGUAGE: this.answers.senec_language as string,
          SENEC_SCHEMA: this.answers.senec_schema as string,
          SENEC_USERNAME: undefined,
          SENEC_PASSWORD: undefined,
          SENEC_SYSTEM_ID: undefined,
          SENEC_INTERVAL: this.answers.senec_interval as string,
        })
      else if (
        this.answers.battery_vendor === 'battery_senec4' ||
        (this.answers.battery_vendor === 'battery_senec3' &&
          this.answers.installation_type === 'cloud')
      )
        return this.replaceEnvValues(senecCollectorVariables, {
          SENEC_ADAPTER: 'cloud',
          SENEC_HOST: undefined,
          SENEC_LANGUAGE: undefined,
          SENEC_SCHEMA: undefined,
          SENEC_USERNAME: this.answers.senec_username as string,
          SENEC_PASSWORD: this.answers.senec_password as string,
          SENEC_SYSTEM_ID: this.answers.senec_system_id as string,
          SENEC_INTERVAL: this.answers.senec_interval_cloud as string,
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
      return this.replaceEnvValues(mqttCollectorVariables, {})
    }
  }

  private buildPostgresqlVariables(): string | undefined {
    if (this.compose.services['postgresql']) {
      return this.replaceEnvValues(postgresqlVariables, {})
    }
  }

  private buildRedisVariables(): string | undefined {
    if (this.compose.services['postgresql']) {
      return this.replaceEnvValues(redisVariables, {})
    }
  }

  // Replace the values of the given environment file content with the given replacements
  // The replacements are expected to be in the format { key: value }
  // Example: replaceEnvValues('FOO=bar\nBAZ=qux', { FOO: 'baz' }) => 'FOO=baz\nBAZ=qux'
  private replaceEnvValues(
    envContent: string,
    replacements: Record<string, string | undefined>,
  ): string {
    let result = envContent

    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(`^${key}=.*$`, 'gm')
      if (value) {
        // Replace the value
        result = result.replace(regex, `${key}=${value}`)
      } else {
        // Comment out the line if the value is empty
        result = result.replace(regex, `# $&`)
      }
    })

    return result
  }

  private generateSecretKeyBase(seed: string, length = 128) {
    let seedInt = this.stringToSeed(seed)

    return Array.from({ length: length / 2 }, () => {
      seedInt = (seedInt * 9_301 + 49_297) % 233_280
      const value = Math.floor((seedInt / 233_280) * 256)
      return value.toString(16).padStart(2, '0')
    }).join('')
  }

  private stringToSeed(str: string): number {
    return Array.from(str).reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0)
  }
}
