import { createPinia, setActivePinia } from 'pinia'
import { useSurveyStore } from '@/stores/survey'
import { Model } from 'survey-core'

describe('useSurveyStore', () => {
  let survey: Model

  beforeEach(() => {
    setActivePinia(createPinia())

    const store = useSurveyStore()
    store.initSurvey()
    survey = store.survey
  })

  it('offers MQTT questions (1)', () => {
    survey.setValue('devices', ['inverter'])
    survey.setValue('installation_type', 'local')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_inverter_power').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_battery_power').isVisible).toBe(false)
    expect(survey.getQuestionByName('mqtt_wallbox_power').isVisible).toBe(false)
    expect(survey.getQuestionByName('mqtt_heatpump_power').isVisible).toBe(false)
  })

  it('offers MQTT questions (2)', () => {
    survey.setValue('devices', ['inverter', 'battery', 'wallbox', 'heatpump'])
    survey.setValue('installation_type', 'local')
    survey.setValue('battery_vendor', 'other')
    survey.setValue('wallbox_vendor', 'other')
    survey.setValue('heatpump_access', 'mqtt')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_inverter_power').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_battery_power').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_wallbox_power').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_heatpump_power').isVisible).toBe(true)
  })

  it('offers MQTT questions (3)', () => {
    survey.setValue('devices', ['inverter'])
    survey.setValue('installation_type', 'distributed')
    survey.setValue('distributed_choice', 'local')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_inverter_power').isVisible).toBe(true)
  })

  it('offers MQTT questions (SENEC + wallbox via MQTT)', () => {
    survey.setValue('devices', ['inverter', 'battery', 'wallbox'])
    survey.setValue('installation_type', 'local')
    survey.setValue('battery_vendor', 'senec3')
    survey.setValue('wallbox_vendor', 'other')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_inverter_power').isVisible).toBe(false)
    expect(survey.getQuestionByName('mqtt_battery_power').isVisible).toBe(false)
    expect(survey.getQuestionByName('mqtt_wallbox_power').isVisible).toBe(true)
  })

  it('offers MQTT questions (for car)', () => {
    survey.setValue('devices', ['inverter', 'battery', 'wallbox', 'car'])
    survey.setValue('installation_type', 'local')
    survey.setValue('battery_vendor', 'senec3')
    survey.setValue('wallbox_vendor', 'senec')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_car_battery_soc').isVisible).toBe(true)
  })

  it('does not ask for MQTT (1)', () => {
    survey.setValue('devices', ['inverter', 'battery', 'wallbox', 'heatpump'])
    survey.setValue('installation_type', 'cloud')
    survey.setValue('battery_vendor', 'other')
    survey.setValue('wallbox_vendor', 'other')
    survey.setValue('heatpump_access', 'mqtt')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(false)
  })

  it('does not ask for MQTT (2)', () => {
    survey.setValue('devices', ['inverter', 'battery', 'wallbox', 'heatpump'])
    survey.setValue('installation_type', 'distributed')
    survey.setValue('distributed_choice', 'cloud')
    survey.setValue('battery_vendor', 'other')
    survey.setValue('wallbox_vendor', 'other')
    survey.setValue('heatpump_access', 'mqtt')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(false)
  })

  it('does not ask for MQTT (3)', () => {
    survey.setValue('devices', ['inverter', 'battery'])
    survey.setValue('battery_vendor', 'senec3')
    survey.setValue('installation_type', 'local')
    survey.setValue('linux_machine', 'raspberry')
    survey.setValue('senec_host', 'senec')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(false)
  })

  it('does not ask for mqtt_heatpump_power when Shelly', () => {
    survey.setValue('devices', ['inverter', 'battery', 'wallbox', 'heatpump'])
    survey.setValue('installation_type', 'local')
    survey.setValue('battery_vendor', 'other')
    survey.setValue('wallbox_vendor', 'other')
    survey.setValue('heatpump_access', 'shelly')

    expect(survey.getPageByName('p_mqtt').isVisible).toBe(true)
    expect(survey.getQuestionByName('mqtt_heatpump_power').isVisible).toBe(false)
    expect(survey.getQuestionByName('heatpump_exclude_from_house_power').isVisible).toBe(false)
  })

  it('offers forecast questions (forecast.solar)', () => {
    expect(survey.getPageByName('p_forecast').isVisible).toBe(true)
    expect(survey.getPageByName('p_forecast_forecast_solar').isVisible).toBe(false)
    expect(survey.getPageByName('p_forecast_solcast').isVisible).toBe(false)

    survey.setValue('forecast', 'forecast_forecast_solar')

    expect(survey.getQuestionByName('forecast_roofs').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_latitude').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_longitude').isVisible).toBe(true)

    expect(survey.getQuestionByName('forecast_azimuth1').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_declination1').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_kwp1').isVisible).toBe(false)

    survey.setValue('forecast_roofs', '1')
    expect(survey.getPageByName('p_forecast_forecast_solar').isVisible).toBe(true)
    expect(survey.getPageByName('p_forecast_solcast').isVisible).toBe(false)

    expect(survey.getQuestionByName('forecast_azimuth1').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_declination1').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_kwp1').isVisible).toBe(true)

    expect(survey.getQuestionByName('forecast_azimuth2').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_declination2').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_kwp2').isVisible).toBe(false)

    expect(survey.getQuestionByName('forecast_azimuth3').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_declination3').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_kwp3').isVisible).toBe(false)

    expect(survey.getQuestionByName('forecast_azimuth4').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_declination4').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_kwp4').isVisible).toBe(false)
  })

  it('offers forecast questions (solcast)', () => {
    expect(survey.getPageByName('p_forecast').isVisible).toBe(true)
    expect(survey.getPageByName('p_forecast_forecast_solar').isVisible).toBe(false)
    expect(survey.getPageByName('p_forecast_solcast').isVisible).toBe(false)

    survey.setValue('forecast', 'forecast_solcast')
    expect(survey.getPageByName('p_forecast_forecast_solar').isVisible).toBe(false)
    expect(survey.getPageByName('p_forecast_solcast').isVisible).toBe(true)

    expect(survey.getQuestionByName('forecast_roofs').isVisible).toBe(true)

    survey.setValue('forecast_roofs', '1')

    expect(survey.getQuestionByName('forecast_solcast_api_key').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_solcast_id1').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_solcast_id2').isVisible).toBe(false)

    survey.setValue('forecast_roofs', '2')

    expect(survey.getQuestionByName('forecast_solcast_api_key').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_solcast_id1').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_solcast_id2').isVisible).toBe(true)
  })

  it('offers installation_type question (senec3)', () => {
    survey.setValue('devices', ['inverter', 'battery'])
    survey.setValue('battery_vendor', 'senec3')

    expect(survey.getPageByName('p_mode').isVisible).toBe(true)

    const question = survey.getQuestionByName('installation_type')
    const choices = question.visibleChoices.map((c: { id: string }) => c.id)
    expect(choices).toEqual(['local', 'cloud', 'distributed'])
  })

  it('offers installation_type question (senec4)', () => {
    survey.setValue('devices', ['inverter', 'battery'])
    survey.setValue('battery_vendor', 'senec4')

    expect(survey.getPageByName('p_mode').isVisible).toBe(true)

    const question = survey.getQuestionByName('installation_type')
    const choices = question.visibleChoices.map((c: { id: string }) => c.id)
    expect(choices).toEqual(['local', 'cloud'])
  })

  it('offers influx_host question when local part of distributed installation', () => {
    survey.setValue('devices', ['inverter', 'battery'])
    survey.setValue('installation_type', 'distributed')
    survey.setValue('distributed_choice', 'local')

    expect(survey.getPageByName('p_influxdb_client').isVisible).toBe(true)

    expect(survey.getQuestionByName('influx_host').isVisible).toBe(true)
    expect(survey.getQuestionByName('influx_schema').isVisible).toBe(true)
  })
})
