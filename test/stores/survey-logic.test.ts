import { createPinia, setActivePinia } from 'pinia'
import { useSurveyStore } from '@/stores/survey'
import surveyJson from '@/assets/survey.json'
import { Model } from 'survey-core'

describe('useSurveyStore', () => {
  let survey: Model

  beforeEach(() => {
    setActivePinia(createPinia())

    const store = useSurveyStore()
    store.setSurvey(surveyJson)

    survey = store.survey as Model
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
})
