import type { Answers } from '@/types/answers'
import type { DockerCompose } from '@/services/ComposeGeneratorService'

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
        ...this.sensors(),
      })
    }
  }

  private sensors() {
    let result = {
      INFLUX_SENSOR_INVERTER_POWER: '',
      INFLUX_SENSOR_HOUSE_POWER: '',
      INFLUX_SENSOR_GRID_POWER_IMPORT: '',
      INFLUX_SENSOR_GRID_POWER_EXPORT: '',
      INFLUX_SENSOR_BATTERY_CHARGING_POWER: '',
      INFLUX_SENSOR_BATTERY_DISCHARGING_POWER: '',
      INFLUX_SENSOR_BATTERY_SOC: '',
      INFLUX_SENSOR_WALLBOX_POWER: '',
      INFLUX_SENSOR_CASE_TEMP: '',
      INFLUX_SENSOR_SYSTEM_STATUS: '',
      INFLUX_SENSOR_SYSTEM_STATUS_OK: '',
      INFLUX_SENSOR_GRID_EXPORT_LIMIT: '',
      INFLUX_SENSOR_INVERTER_POWER_FORECAST: '',
      INFLUX_SENSOR_HEATPUMP_POWER: '',
    }

    if (this.answers.devices?.includes('inverter'))
      if (this.answers.battery_vendor === 'senec4' || this.answers.battery_vendor === 'senec3')
        result = { ...result, ...this.sensorsInverterSenec() }
      else result = { ...result, ...this.sensorsInverterOther() }
    else result = { ...result, ...this.sensorsWithoutInverter() }

    if (this.answers.devices?.includes('battery'))
      if (this.answers.battery_vendor === 'senec4' || this.answers.battery_vendor === 'senec3')
        result = { ...result, ...this.sensorsBatterySenec() }
      else if (this.answers.battery_vendor === 'other')
        result = { ...result, ...this.sensorsBatteryOther() }

    if (this.answers.devices?.includes('wallbox'))
      if (this.answers.wallbox_vendor === 'senec')
        result = { ...result, ...this.sensorsWallboxSenec() }
      else if (this.answers.wallbox_vendor === 'other')
        result = { ...result, ...this.sensorsWallboxOther() }

    if (this.answers.devices?.includes('heatpump'))
      result = { ...result, ...this.sensorsHeatpump() }

    if (this.answers.forecast) result = { ...result, ...this.sensorsForecast() }

    return result
  }

  private sensorsInverterSenec() {
    return {
      INFLUX_SENSOR_INVERTER_POWER: 'SENEC:inverter_power',
      INFLUX_SENSOR_HOUSE_POWER: 'SENEC:house_power',
      INFLUX_SENSOR_GRID_POWER_IMPORT: 'SENEC:grid_power_plus',
      INFLUX_SENSOR_GRID_POWER_EXPORT: 'SENEC:grid_power_minus',
      INFLUX_SENSOR_CASE_TEMP: 'SENEC:case_temp',
      INFLUX_SENSOR_SYSTEM_STATUS: 'SENEC:current_state',
      INFLUX_SENSOR_SYSTEM_STATUS_OK: 'SENEC:current_state_ok',
      INFLUX_SENSOR_GRID_EXPORT_LIMIT: 'SENEC:power_ratio',
    }
  }

  private sensorsInverterOther() {
    return {
      INFLUX_SENSOR_INVERTER_POWER: 'PV:inverter_power',
      INFLUX_SENSOR_HOUSE_POWER: 'PV:house_power',
      INFLUX_SENSOR_GRID_POWER_IMPORT: 'PV:grid_power_import',
      INFLUX_SENSOR_GRID_POWER_EXPORT: 'PV:grid_power_export',
      INFLUX_SENSOR_CASE_TEMP: 'PV:case_temp',
      INFLUX_SENSOR_SYSTEM_STATUS: 'PV:system_status',
      INFLUX_SENSOR_SYSTEM_STATUS_OK: 'PV:system_status_ok',
      INFLUX_SENSOR_GRID_EXPORT_LIMIT: 'PV:grid_export_limit',
    }
  }

  private sensorsWithoutInverter() {
    return {
      INFLUX_SENSOR_GRID_POWER_IMPORT: 'HOME:grid_power_import',
      INFLUX_SENSOR_HOUSE_POWER: 'HOME:house_power',
    }
  }

  private sensorsBatterySenec() {
    return {
      INFLUX_SENSOR_BATTERY_CHARGING_POWER: 'SENEC:bat_power_plus',
      INFLUX_SENSOR_BATTERY_DISCHARGING_POWER: 'SENEC:bat_power_minus',
      INFLUX_SENSOR_BATTERY_SOC: 'SENEC:bat_fuel_charge',
    }
  }

  private sensorsBatteryOther() {
    return {
      INFLUX_SENSOR_BATTERY_CHARGING_POWER: 'PV:battery_charging_power',
      INFLUX_SENSOR_BATTERY_DISCHARGING_POWER: 'PV:battery_discharging_power',
      INFLUX_SENSOR_BATTERY_SOC: 'PV:battery_soc',
    }
  }

  private sensorsWallboxSenec() {
    return {
      INFLUX_SENSOR_WALLBOX_POWER: 'SENEC:wallbox_charge_power',
    }
  }

  private sensorsWallboxOther() {
    return {
      INFLUX_SENSOR_WALLBOX_POWER: 'PV:wallbox_power',
    }
  }

  private sensorsForecast() {
    return {
      INFLUX_SENSOR_INVERTER_POWER_FORECAST: 'FORECAST:watt',
    }
  }

  private sensorsHeatpump() {
    return { INFLUX_SENSOR_HEATPUMP_POWER: 'HEATPUMP:power' }
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
      return this.replaceEnvValues(mqttCollectorVariables, {})
    }
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

  // Replace the values of the given environment file content with the given replacements
  // The replacements are expected to be in the format { key: value }
  // Example: replaceEnvValues('FOO=bar\nBAZ=qux', { FOO: 'baz' }) => 'FOO=baz\nBAZ=qux'
  private replaceEnvValues(
    envContent: string,
    replacements: Record<string, string | number | undefined>,
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
