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

  it('offers forecast questions', () => {
    survey.setValue('forecast', true)

    expect(survey.getPageByName('p_forecast').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_roofs').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_latitude').isVisible).toBe(true)
    expect(survey.getQuestionByName('forecast_longitude').isVisible).toBe(true)

    expect(survey.getQuestionByName('forecast_azimuth1').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_declination1').isVisible).toBe(false)
    expect(survey.getQuestionByName('forecast_kwp1').isVisible).toBe(false)

    survey.setValue('forecast_roofs', '1')

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
})
