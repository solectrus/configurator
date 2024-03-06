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
      return this.replaceEnvValues(senecCollectorVariables, {})
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
  private replaceEnvValues(envContent: string, replacements: Record<string, string>): string {
    let result = envContent

    Object.entries(replacements).forEach(
      ([key, value]) => (result = result.replace(new RegExp(`^(${key}=).*`, 'm'), `$1${value}`)),
    )

    return result
  }

  private generateSecretKeyBase(length = 128) {
    const array = new Uint8Array(length / 2) // 2 bytes per hex char
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
}
