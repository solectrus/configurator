import type { Answers } from '@/types/answers'
import { SensorBuilder } from './sensorBuilder'

type Mapping = {
  topic: string
  measurementPositive?: string
  measurementNegative?: string
  measurement?: string
  fieldPositive?: string
  fieldNegative?: string
  field?: string
  type: 'float' | 'integer' | 'boolean' | 'string'
}

type Mappings = Mapping[]

export class MqttMapper {
  constructor(private readonly answers: Answers) {}

  public variables() {
    const mappings = [
      this.inverterPower(),
      this.housePower(),
      this.gridPower(),
      this.gridExportLimit(),
      this.batteryPower(),
      this.batterySoc(),
      this.wallboxPower(),
      this.wallboxCarConnected(),
      this.heatpumpPower(),
      this.caseTemp(),
      this.systemStatus(),
      this.systemStatusOk(),
      this.carBatterySoc(),
    ].filter(Boolean) as Mappings

    return mappings
      .map((mapping, index) => {
        const obj = {
          [`MAPPING_${index}_TOPIC`]: mapping.topic,
          [`MAPPING_${index}_MEASUREMENT_POSITIVE`]: mapping.measurementPositive,
          [`MAPPING_${index}_MEASUREMENT_NEGATIVE`]: mapping.measurementNegative,
          [`MAPPING_${index}_MEASUREMENT`]: mapping.measurement,
          [`MAPPING_${index}_FIELD_POSITIVE`]: mapping.fieldPositive,
          [`MAPPING_${index}_FIELD_NEGATIVE`]: mapping.fieldNegative,
          [`MAPPING_${index}_FIELD`]: mapping.field,
          [`MAPPING_${index}_TYPE`]: mapping.type,
        }

        // Remove null values
        return Object.fromEntries(Object.entries(obj).filter(([, value]) => value != null))
      })
      .reduce((acc, val) => ({ ...acc, ...val }), {})
  }

  private inverterPower(): Mapping | undefined {
    if (this.answers.mqtt_inverter_power)
      return {
        topic: this.answers.mqtt_inverter_power,
        ...this.sensorBuilder.splittedSensor('INVERTER_POWER'),
        type: 'integer',
      }
  }

  private housePower(): Mapping | undefined {
    if (this.answers.mqtt_house_power)
      return {
        topic: this.answers.mqtt_house_power,
        ...this.sensorBuilder.splittedSensor('HOUSE_POWER'),
        type: 'integer',
      }
  }

  private gridPower(): Mapping | undefined {
    if (this.answers.mqtt_grid_power) {
      const gridImportPower = this.sensorBuilder.splittedSensor('GRID_IMPORT_POWER')
      const gridExportPower = this.sensorBuilder.splittedSensor('GRID_EXPORT_POWER')

      switch (this.answers.mqtt_grid_power_pos_neg) {
        case 'pos_neg':
          return {
            topic: this.answers.mqtt_grid_power,
            measurementNegative: gridExportPower.measurement,
            measurementPositive: gridImportPower.measurement,
            fieldNegative: gridExportPower.field,
            fieldPositive: gridImportPower.field,
            type: 'integer',
          }
        case 'neg_pos':
          return {
            topic: this.answers.mqtt_grid_power,
            measurementNegative: gridImportPower.measurement,
            measurementPositive: gridExportPower.measurement,
            fieldNegative: gridImportPower.field,
            fieldPositive: gridExportPower.field,
            type: 'integer',
          }
      }
    }
  }

  private batteryPower(): Mapping | undefined {
    if (this.answers.mqtt_battery_power) {
      const batteryChargingPower = this.sensorBuilder.splittedSensor('BATTERY_CHARGING_POWER')
      const batteryDischargingPower = this.sensorBuilder.splittedSensor('BATTERY_DISCHARGING_POWER')

      switch (this.answers.mqtt_battery_power_pos_neg) {
        case 'pos_neg':
          return {
            topic: this.answers.mqtt_battery_power,
            measurementNegative: batteryDischargingPower.measurement,
            measurementPositive: batteryChargingPower.measurement,
            fieldNegative: batteryDischargingPower.field,
            fieldPositive: batteryChargingPower.field,
            type: 'integer',
          }
        case 'neg_pos':
          return {
            topic: this.answers.mqtt_battery_power,
            measurementNegative: batteryChargingPower.measurement,
            measurementPositive: batteryDischargingPower.measurement,
            fieldNegative: batteryChargingPower.field,
            fieldPositive: batteryDischargingPower.field,
            type: 'integer',
          }
      }
    }
  }

  private batterySoc(): Mapping | undefined {
    if (this.answers.mqtt_battery_soc)
      return {
        topic: this.answers.mqtt_battery_soc,
        ...this.sensorBuilder.splittedSensor('BATTERY_SOC'),
        type: 'float',
      }
  }

  private carBatterySoc(): Mapping | undefined {
    if (this.answers.mqtt_car_battery_soc)
      return {
        topic: this.answers.mqtt_car_battery_soc,
        ...this.sensorBuilder.splittedSensor('CAR_BATTERY_SOC'),
        type: 'float',
      }
  }

  private caseTemp(): Mapping | undefined {
    if (this.answers.mqtt_case_temp)
      return {
        topic: this.answers.mqtt_case_temp,
        ...this.sensorBuilder.splittedSensor('CASE_TEMP'),
        type: 'float',
      }
  }

  private systemStatus(): Mapping | undefined {
    if (this.answers.mqtt_system_status)
      return {
        topic: this.answers.mqtt_system_status,
        ...this.sensorBuilder.splittedSensor('SYSTEM_STATUS'),
        type: 'string',
      }
  }

  private systemStatusOk(): Mapping | undefined {
    if (this.answers.mqtt_system_status_ok)
      return {
        topic: this.answers.mqtt_system_status_ok,
        ...this.sensorBuilder.splittedSensor('SYSTEM_STATUS_OK'),
        type: 'boolean',
      }
  }

  private wallboxPower(): Mapping | undefined {
    if (this.answers.mqtt_wallbox_power)
      return {
        topic: this.answers.mqtt_wallbox_power,
        ...this.sensorBuilder.splittedSensor('WALLBOX_POWER'),
        type: 'integer',
      }
  }

  private wallboxCarConnected(): Mapping | undefined {
    if (this.answers.mqtt_wallbox_car_connected)
      return {
        topic: this.answers.mqtt_wallbox_car_connected,
        ...this.sensorBuilder.splittedSensor('WALLBOX_CAR_CONNECTED'),
        type: 'string',
      }
  }

  private heatpumpPower(): Mapping | undefined {
    if (this.answers.mqtt_heatpump_power)
      return {
        topic: this.answers.mqtt_heatpump_power,
        ...this.sensorBuilder.splittedSensor('HEATPUMP_POWER'),
        type: 'integer',
      }
  }

  private gridExportLimit(): Mapping | undefined {
    if (this.answers.mqtt_grid_export_limit)
      return {
        topic: this.answers.mqtt_grid_export_limit,
        ...this.sensorBuilder.splittedSensor('GRID_EXPORT_LIMIT'),
        type: 'float',
      }
  }

  private get sensorBuilder() {
    return new SensorBuilder(this.answers)
  }
}
