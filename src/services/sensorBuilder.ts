import type { Answers } from '@/types/answers'

type Sensors = {
  [key: string]: string
}

export class SensorBuilder {
  constructor(private readonly answers: Answers) {}

  public build(): Sensors {
    // For home automation systems (Home Assistant, ioBroker), use predefined sensor mappings
    if (this.hasHomeAutomation()) {
      return this.sensorsHomeAutomation()
    }

    let result = this.getInitialSensors()

    result = this.mergeInverterSensors(result)
    result = this.mergeBatterySensors(result)
    result = this.mergeWallboxSensors(result)
    result = this.mergeCarSensors(result)
    result = this.mergeHeatpumpSensors(result)
    result = this.mergeForecastSensors(result)

    return result
  }

  private hasHomeAutomation(): boolean {
    return Boolean(this.answers.home_automation && this.answers.home_automation.length > 0)
  }

  private sensorsHomeAutomation(): Sensors {
    // Sensor mappings matching the Home Assistant integration / ioBroker adapter
    // Format: measurement:field
    return {
      INVERTER_POWER: 'inverter:power',
      INVERTER_POWER_1: 'inverter_1:power',
      INVERTER_POWER_2: 'inverter_2:power',
      INVERTER_POWER_3: 'inverter_3:power',
      INVERTER_POWER_4: 'inverter_4:power',
      INVERTER_POWER_5: 'inverter_5:power',
      INVERTER_POWER_FORECAST: 'inverter_forecast:power',
      INVERTER_POWER_FORECAST_CLEARSKY: 'inverter_forecast_clearsky:power',
      HOUSE_POWER: 'house:power',
      CUSTOM_POWER_01: 'custom_01:power',
      CUSTOM_POWER_02: 'custom_02:power',
      CUSTOM_POWER_03: 'custom_03:power',
      CUSTOM_POWER_04: 'custom_04:power',
      CUSTOM_POWER_05: 'custom_05:power',
      CUSTOM_POWER_06: 'custom_06:power',
      CUSTOM_POWER_07: 'custom_07:power',
      CUSTOM_POWER_08: 'custom_08:power',
      CUSTOM_POWER_09: 'custom_09:power',
      CUSTOM_POWER_10: 'custom_10:power',
      CUSTOM_POWER_11: 'custom_11:power',
      CUSTOM_POWER_12: 'custom_12:power',
      CUSTOM_POWER_13: 'custom_13:power',
      CUSTOM_POWER_14: 'custom_14:power',
      CUSTOM_POWER_15: 'custom_15:power',
      CUSTOM_POWER_16: 'custom_16:power',
      CUSTOM_POWER_17: 'custom_17:power',
      CUSTOM_POWER_18: 'custom_18:power',
      CUSTOM_POWER_19: 'custom_19:power',
      CUSTOM_POWER_20: 'custom_20:power',
      GRID_IMPORT_POWER: 'grid:import_power',
      GRID_EXPORT_POWER: 'grid:export_power',
      GRID_EXPORT_LIMIT: 'grid:export_limit',
      BATTERY_CHARGING_POWER: 'battery:charging_power',
      BATTERY_DISCHARGING_POWER: 'battery:discharging_power',
      BATTERY_SOC: 'battery:soc',
      WALLBOX_POWER: 'wallbox:power',
      WALLBOX_CAR_CONNECTED: 'wallbox:connected',
      CASE_TEMP: 'case:temperature',
      CAR_BATTERY_SOC: 'car:battery_soc',
      OUTDOOR_TEMP: 'outdoor:temperature',
      OUTDOOR_TEMP_FORECAST: 'outdoor_forecast:temperature',
      SYSTEM_STATUS: 'system:status',
      SYSTEM_STATUS_OK: 'system:status_ok',
      HEATPUMP_POWER: 'heatpump:power',
      HEATPUMP_HEATING_POWER: 'heatpump:heating_power',
      HEATPUMP_TANK_TEMP: 'heatpump:tank_temp',
      HEATPUMP_STATUS: 'heatpump:status',
    }
  }

  private getInitialSensors(): Sensors {
    return {
      INVERTER_POWER: '',
      INVERTER_POWER_1: '',
      INVERTER_POWER_2: '',
      INVERTER_POWER_3: '',
      INVERTER_POWER_4: '',
      INVERTER_POWER_5: '',
      HOUSE_POWER: '',
      GRID_IMPORT_POWER: '',
      GRID_EXPORT_POWER: '',
      BATTERY_CHARGING_POWER: '',
      BATTERY_DISCHARGING_POWER: '',
      BATTERY_SOC: '',
      WALLBOX_POWER: '',
      WALLBOX_CAR_CONNECTED: '',
      CASE_TEMP: '',
      SYSTEM_STATUS: '',
      SYSTEM_STATUS_OK: '',
      GRID_EXPORT_LIMIT: '',
      INVERTER_POWER_FORECAST: '',
      HEATPUMP_POWER: '',
      CAR_BATTERY_SOC: '',
    }
  }

  private mergeInverterSensors(result: Sensors): Sensors {
    if (this.answers.devices?.includes('inverter')) {
      if (this.answers.battery_vendor === 'senec4' || this.answers.battery_vendor === 'senec3') {
        return { ...result, ...this.sensorsInverterSenec() }
      } else {
        return { ...result, ...this.sensorsInverterOther() }
      }
    } else {
      return { ...result, ...this.sensorsWithoutInverter() }
    }
  }

  private mergeBatterySensors(result: Sensors): Sensors {
    if (this.answers.devices?.includes('battery')) {
      if (this.answers.battery_vendor === 'senec4' || this.answers.battery_vendor === 'senec3') {
        return { ...result, ...this.sensorsBatterySenec() }
      } else if (this.answers.battery_vendor === 'other') {
        return { ...result, ...this.sensorsBatteryOther() }
      }
    }
    return result
  }

  private mergeWallboxSensors(result: Sensors): Sensors {
    if (this.answers.devices?.includes('wallbox')) {
      if (this.answers.wallbox_vendor === 'senec') {
        return { ...result, ...this.sensorsWallboxSenec() }
      } else {
        return { ...result, ...this.sensorsWallboxOther() }
      }
    }
    return result
  }

  private mergeCarSensors(result: Sensors): Sensors {
    if (this.answers.devices?.includes('car')) {
      return { ...result, ...this.sensorsCar() }
    }
    return result
  }

  private mergeHeatpumpSensors(result: Sensors): Sensors {
    if (this.answers.devices?.includes('heatpump')) {
      return { ...result, ...this.sensorsHeatpump() }
    }
    return result
  }

  private mergeForecastSensors(result: Sensors): Sensors {
    if (
      this.answers.forecast == 'forecast_forecast_solar' ||
      this.answers.forecast == 'forecast_solcast'
    ) {
      return { ...result, ...this.sensorsForecast() }
    }
    return result
  }

  public splittedSensor(sensor: string) {
    const varName = sensor

    const varValue = this.build()[varName]
    if (!varValue) {
      throw new Error(`Sensor ${sensor} not found`)
    }
    const [measurement, field] = varValue.split(':')
    return { measurement, field }
  }

  private sensorsInverterSenec() {
    const result: Sensors = {
      INVERTER_POWER: 'SENEC:inverter_power',
      HOUSE_POWER: 'SENEC:house_power',
      GRID_IMPORT_POWER: 'SENEC:grid_power_plus',
      GRID_EXPORT_POWER: 'SENEC:grid_power_minus',
      CASE_TEMP: 'SENEC:case_temp',
      SYSTEM_STATUS: 'SENEC:current_state',
      SYSTEM_STATUS_OK: 'SENEC:current_state_ok',
      GRID_EXPORT_LIMIT: 'SENEC:power_ratio',
    }

    if (
      this.answers.battery_vendor === 'senec3' &&
      (this.answers.installation_type === 'local' || this.answers.distributed_choice === 'local')
    ) {
      // For SENEC 3 with local installation there are sensors for three MPP trackers available
      result.INVERTER_POWER_1 = 'SENEC:mpp1_power'
      result.INVERTER_POWER_2 = 'SENEC:mpp2_power'
      result.INVERTER_POWER_3 = 'SENEC:mpp3_power'
    }

    return result
  }

  private sensorsInverterOther() {
    return {
      INVERTER_POWER: 'pv:inverter_power',
      ...(this.answers.mqtt_house_power && { HOUSE_POWER: 'pv:house_power' }),
      ...(this.answers.mqtt_grid_power && {
        GRID_IMPORT_POWER: 'pv:grid_import_power',
        GRID_EXPORT_POWER: 'pv:grid_export_power',
      }),
      ...(this.answers.mqtt_case_temp && { CASE_TEMP: 'pv:case_temp' }),
      ...(this.answers.mqtt_system_status && { SYSTEM_STATUS: 'pv:system_status' }),
      ...(this.answers.mqtt_system_status_ok && { SYSTEM_STATUS_OK: 'pv:system_status_ok' }),
      ...(this.answers.mqtt_grid_export_limit && { GRID_EXPORT_LIMIT: 'pv:grid_export_limit' }),
    }
  }

  private sensorsWithoutInverter() {
    return {
      GRID_IMPORT_POWER: 'HOME:grid_import_power',
      HOUSE_POWER: 'HOME:house_power',
    }
  }

  private sensorsBatterySenec() {
    return {
      BATTERY_CHARGING_POWER: 'SENEC:bat_power_plus',
      BATTERY_DISCHARGING_POWER: 'SENEC:bat_power_minus',
      BATTERY_SOC: 'SENEC:bat_fuel_charge',
    }
  }

  private sensorsBatteryOther() {
    return {
      BATTERY_CHARGING_POWER: 'pv:battery_charging_power',
      BATTERY_DISCHARGING_POWER: 'pv:battery_discharging_power',
      BATTERY_SOC: 'pv:battery_soc',
    }
  }

  private sensorsWallboxSenec() {
    return {
      WALLBOX_POWER: 'SENEC:wallbox_charge_power',
      WALLBOX_CAR_CONNECTED: 'SENEC:ev_connected',
    }
  }

  private sensorsWallboxOther() {
    return {
      WALLBOX_POWER: 'pv:wallbox_power',
      ...(this.answers.mqtt_wallbox_car_connected && { WALLBOX_CAR_CONNECTED: 'pv:car_connected' }),
    }
  }

  private sensorsForecast() {
    return {
      INVERTER_POWER_FORECAST: 'Forecast:watt',
    }
  }

  private sensorsHeatpump() {
    return { HEATPUMP_POWER: 'heatpump:power' }
  }

  private sensorsCar() {
    return {
      ...(this.answers.mqtt_car_battery_soc && { CAR_BATTERY_SOC: 'car:battery_soc' }),
    }
  }
}
