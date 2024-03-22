import type { Answers } from '@/types/answers'

type Sensors = {
  [key: string]: string
}

export class SensorBuilder {
  constructor(private answers: Answers) {}

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
      CASE_TEMP: '',
      SYSTEM_STATUS: '',
      SYSTEM_STATUS_OK: '',
      GRID_EXPORT_LIMIT: '',
      INVERTER_POWER_FORECAST: '',
      HEATPUMP_POWER: '',
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
      INVERTER_POWER: 'PV:inverter_power',
      HOUSE_POWER: 'PV:house_power',
      GRID_IMPORT_POWER: 'PV:grid_import_power',
      GRID_EXPORT_POWER: 'PV:grid_export_power',
      CASE_TEMP: 'PV:case_temp',
      SYSTEM_STATUS: 'PV:system_status',
      SYSTEM_STATUS_OK: 'PV:system_status_ok',
      GRID_EXPORT_LIMIT: 'PV:grid_export_limit',
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
      BATTERY_CHARGING_POWER: 'PV:battery_charging_power',
      BATTERY_DISCHARGING_POWER: 'PV:battery_discharging_power',
      BATTERY_SOC: 'PV:battery_soc',
    }
  }

  private sensorsWallboxSenec() {
    return {
      WALLBOX_POWER: 'SENEC:wallbox_charge_power',
    }
  }

  private sensorsWallboxOther() {
    return {
      WALLBOX_POWER: 'PV:wallbox_power',
    }
  }

  private sensorsForecast() {
    return {
      INVERTER_POWER_FORECAST: 'FORECAST:watt',
    }
  }

  private sensorsHeatpump() {
    return { HEATPUMP_POWER: 'HEATPUMP:power' }
  }
}
