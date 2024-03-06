import type { Answers } from '@/stores/survey'
import type { DockerCompose } from '@/services/ComposeGeneratorService'

import dashboardVariables from '@/templates/variables/dashboard.env?raw'
import forecastCollectorVariables from '@/templates/variables/forecast-collector.env?raw'
import influxdbVariables from '@/templates/variables/influxdb.env?raw'
import senecCollectorVariables from '@/templates/variables/senec-collector.env?raw'
import mqttCollectorVariables from '@/templates/variables/mqtt-collector.env?raw'
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
      this.buildForecastCollectorVariables(),
      this.buildInfluxdbVariables(),
      this.buildSenecCollectorVariables(),
      this.buildMQTTCollectorVariables(),
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
        SECRET_KEY_BASE: this.generateSecretKeyBase(),
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
      switch (this.answers.battery_vendor) {
        case 'battery_senec3':
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
        case 'battery_senec4':
          return this.replaceEnvValues(senecCollectorVariables, {
            SENEC_ADAPTER: 'cloud',
            SENEC_HOST: undefined,
            SENEC_LANGUAGE: undefined,
            SENEC_SCHEMA: undefined,
            SENEC_USERNAME: (this.answers.senec_username || 'me@example.com') as string,
            SENEC_PASSWORD: (this.answers.senec_password || 'secret') as string,
            SENEC_SYSTEM_ID: this.answers.senec_system_id as string,
            SENEC_INTERVAL: this.answers.senec_interval_cloud as string,
          })
      }
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

  private generateSecretKeyBase(length = 128) {
    const array = new Uint8Array(length / 2) // 2 bytes per hex char
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
}
