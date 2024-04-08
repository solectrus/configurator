import type { Answers } from '@/types/answers'
import type { DockerCompose } from '@/services/ComposeGenerator'
import { MqttMapper } from './mqttMapper'
import { SensorBuilder } from './sensorBuilder'

import dashboardVariables from '@/templates/variables/dashboard.env?raw'
import forecastCollectorVariables from '@/templates/variables/forecast-collector.env?raw'
import influxdbVariables from '@/templates/variables/influxdb.env?raw'
import influxdbClientVariables from '@/templates/variables/influxdb-client.env?raw'
import senecCollectorVariables from '@/templates/variables/senec-collector.env?raw'
import mqttCollectorVariables from '@/templates/variables/mqtt-collector.env?raw'
import shellyCollectorVariables from '@/templates/variables/shelly-collector.env?raw'
import postgresqlVariables from '@/templates/variables/postgresql.env?raw'
import redisVariables from '@/templates/variables/redis.env?raw'
import awsVariables from '@/templates/variables/aws.env?raw'
import traefikVariables from '@/templates/variables/traefik.env?raw'

export class EnvGenerator {
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
        APP_HOST: this.answers.app_host ?? this.answers.app_domain,
        FORCE_SSL: this.answers.traefik ? 'true' : 'false',
        ADMIN_PASSWORD: this.answers.admin_password,
        SECRET_KEY_BASE: this.generateSecretKeyBase(this.answers.admin_password),
        INSTALLATION_DATE: this.answers.installation_date,
        INFLUX_POLL_INTERVAL: this.answers.senec_interval ?? this.answers.senec_interval_cloud ?? 5,
        ...this.sensorVariables(),
        INFLUX_EXCLUDE_FROM_HOUSE_POWER: this.influx_exclude_from_house_power,
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

  private get influx_exclude_from_house_power() {
    const result = []

    if (
      this.answers.devices?.includes('heatpump') &&
      (this.answers.heatpump_access === 'shelly' ||
        this.answers.heatpump_exclude_from_house_power === 'yes')
    ) {
      result.push('HEATPUMP_POWER')
    }

    if (
      this.answers.devices?.includes('wallbox') &&
      this.answers.wallbox_vendor === 'other' &&
      this.answers.wallbox_exclude_from_house_power === 'yes'
    ) {
      result.push('WALLBOX_POWER')
    }

    return result.join(',')
  }

  private forecastRoofCount(): number {
    return +(this.answers.forecast_roofs ?? 0)
  }

  private forecastRoof1() {
    if (this.forecastRoofCount() === 1)
      return {
        FORECAST_DECLINATION: this.answers.forecast_declination1,
        FORECAST_AZIMUTH: this.answers.forecast_azimuth1,
        FORECAST_KWP: this.answers.forecast_kwp1,

        FORECAST_0_DECLINATION: undefined,
        FORECAST_0_AZIMUTH: undefined,
        FORECAST_0_KWP: undefined,
      }

    return {
      FORECAST_DECLINATION: undefined,
      FORECAST_AZIMUTH: undefined,
      FORECAST_KWP: undefined,

      FORECAST_0_DECLINATION: this.answers.forecast_declination1,
      FORECAST_0_AZIMUTH: this.answers.forecast_azimuth1,
      FORECAST_0_KWP: this.answers.forecast_kwp1,
    }
  }

  private forecastRoof2() {
    if (this.forecastRoofCount() < 2)
      return {
        FORECAST_1_DECLINATION: undefined,
        FORECAST_1_AZIMUTH: undefined,
        FORECAST_1_KWP: undefined,
      }

    return {
      FORECAST_1_DECLINATION: this.answers.forecast_declination2,
      FORECAST_1_AZIMUTH: this.answers.forecast_azimuth2,
      FORECAST_1_KWP: this.answers.forecast_kwp2,
    }
  }

  private forecastRoof3() {
    if (this.forecastRoofCount() < 3)
      return {
        FORECAST_2_DECLINATION: undefined,
        FORECAST_2_AZIMUTH: undefined,
        FORECAST_2_KWP: undefined,
      }

    return {
      FORECAST_2_DECLINATION: this.answers.forecast_declination3,
      FORECAST_2_AZIMUTH: this.answers.forecast_azimuth3,
      FORECAST_2_KWP: this.answers.forecast_kwp3,
    }
  }

  private forecastRoof4() {
    if (this.forecastRoofCount() < 4)
      return {
        FORECAST_3_DECLINATION: undefined,
        FORECAST_3_AZIMUTH: undefined,
        FORECAST_3_KWP: undefined,
      }

    return {
      FORECAST_3_DECLINATION: this.answers.forecast_declination4,
      FORECAST_3_AZIMUTH: this.answers.forecast_azimuth4,
      FORECAST_3_KWP: this.answers.forecast_kwp4,
    }
  }

  private buildForecastCollectorVariables(): string | undefined {
    if (this.compose.services['forecast-collector']) {
      return this.replaceEnvValues(forecastCollectorVariables, {
        FORECAST_LATITUDE: this.answers.forecast_latitude,
        FORECAST_LONGITUDE: this.answers.forecast_longitude,
        FORECAST_CONFIGURATIONS:
          this.forecastRoofCount() > 1 ? this.forecastRoofCount() : undefined,
        ...this.forecastRoof1(),
        ...this.forecastRoof2(),
        ...this.forecastRoof3(),
        ...this.forecastRoof4(),
        FORECAST_INTERVAL: 900 * this.forecastRoofCount(),
      })
    }
  }

  private buildInfluxdbVariables(): string | undefined {
    if (this.compose.services['influxdb']) {
      return this.replaceEnvValues(influxdbVariables, {})
    } else if (
      this.answers.installation_type === 'distributed' &&
      this.answers.distributed_choice === 'local'
    )
      return this.replaceEnvValues(influxdbClientVariables, {
        INFLUX_HOST: this.answers.influx_host,
        INFLUX_SCHEMA: this.answers.influx_schema,
      })
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
          SENEC_IGNORE: this.senec_ignore,
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
          SENEC_IGNORE: this.senec_ignore,
        })
    }
  }

  private get senec_ignore() {
    const result = []

    if (this.answers.devices?.includes('wallbox') && this.answers.wallbox_vendor === 'other') {
      result.push('wallbox_charge_power')
    }

    return result.join(',')
  }

  private buildShellyCollectorVariables(): string | undefined {
    if (this.compose.services['shelly-collector']) {
      return this.replaceEnvValues(shellyCollectorVariables, {
        SHELLY_HOST: this.answers.shelly_host,
        SHELLY_INTERVAL: this.answers.shelly_interval,
      })
    }
  }

  private buildMQTTCollectorVariables(): string | undefined {
    if (this.compose.services['mqtt-collector']) {
      return this.replaceEnvValues(mqttCollectorVariables, {
        MQTT_HOST: this.answers.mqtt_host,
        MQTT_PORT: this.answers.mqtt_port,
        MQTT_SSL: this.answers.mqtt_ssl ? 'true' : 'false',
        MQTT_USERNAME: this.answers.mqtt_username,
        MQTT_PASSWORD: this.answers.mqtt_password,
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
        if (RegExp(regex).exec(result)) {
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
    let seedInt = this.stringToSeed(seed ?? '')

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
