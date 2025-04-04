import type { Answers } from '@/types/answers'

type Sensors = {
  [key: string]: string
}

export class SensorBuilder {
  constructor(private readonly answers: Answers) {}

  public build(): Sensors {
    let result = {
      INVERTER_POWER: '',
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

    if (this.answers.devices?.includes('inverter'))
      if (this.answers.battery_vendor === 'senec4' || this.answers.battery_vendor === 'senec3') {
        result = { ...result, ...this.sensorsInverterSenec() }
      } else {
        result = { ...result, ...this.sensorsInverterOther() }
      }
    else result = { ...result, ...this.sensorsWithoutInverter() }

    if (this.answers.devices?.includes('battery'))
      if (this.answers.battery_vendor === 'senec4' || this.answers.battery_vendor === 'senec3') {
        result = { ...result, ...this.sensorsBatterySenec() }
      } else if (this.answers.battery_vendor === 'other') {
        result = { ...result, ...this.sensorsBatteryOther() }
      }

    if (this.answers.devices?.includes('wallbox'))
      if (this.answers.wallbox_vendor === 'senec') {
        result = { ...result, ...this.sensorsWallboxSenec() }
      } else {
        result = { ...result, ...this.sensorsWallboxOther() }
      }

    if (this.answers.devices?.includes('car')) {
      result = { ...result, ...this.sensorsCar() }
    }

    if (this.answers.devices?.includes('heatpump')) {
      result = { ...result, ...this.sensorsHeatpump() }
    }

    if (
      this.answers.forecast == 'forecast_forecast_solar' ||
      this.answers.forecast == 'forecast_solcast'
    ) {
      result = { ...result, ...this.sensorsForecast() }
    }

    return result
  }

  public splittedSensor(sensor: string) {
    const varName = sensor

    const varValue = this.build()[varName]
    const [measurement, field] = varValue.split(':')
    return { measurement, field }
  }

  private sensorsInverterSenec() {
    return {
      INVERTER_POWER: 'SENEC:inverter_power',
      HOUSE_POWER: 'SENEC:house_power',
      GRID_IMPORT_POWER: 'SENEC:grid_power_plus',
      GRID_EXPORT_POWER: 'SENEC:grid_power_minus',
      CASE_TEMP: 'SENEC:case_temp',
      SYSTEM_STATUS: 'SENEC:current_state',
      SYSTEM_STATUS_OK: 'SENEC:current_state_ok',
      GRID_EXPORT_LIMIT: 'SENEC:power_ratio',
    }
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
      INVERTER_POWER_FORECAST: 'forecast:watt',
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
