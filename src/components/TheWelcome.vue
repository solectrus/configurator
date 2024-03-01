<script setup lang="ts">
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'

const surveyJson = {
  title: 'SOLECTRUS Konfigurator',
  description: 'Erstelle Schritt für Schritt deine Installation von SOLECTRUS',
  logoPosition: 'right',
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'checkbox',
          name: 'devices',
          title: 'Welche Geräte hast du in deinem Haus?',
          isRequired: true,
          choices: [
            {
              value: 'panels',
              text: 'PV-Module mit Wechselrichter'
            },
            {
              value: 'battery',
              text: 'Stromspeicher'
            },
            {
              value: 'wallbox',
              text: 'Wallbox'
            },
            {
              value: 'heatpump',
              text: 'Wärmepumpe'
            }
          ]
        }
      ]
    },
    {
      name: 'page2',
      elements: [
        {
          type: 'radiogroup',
          name: 'installation_type',
          title: 'Wie möchtest Du SOLECTRUS betreiben?',
          isRequired: true,
          choices: [
            {
              value: 'standalone',
              text: 'Alles auf einem lokalen Gerät (Raspberry Pi, NAS, sonstiger Linux-Server)'
            },
            {
              value: 'distributed',
              text: 'Verteilte Installation (Messwerte abfragen lokal, Datenbank und Dashboard auf einem Cloud-Server)'
            }
          ]
        }
      ]
    },
    {
      name: 'page3',
      elements: [
        {
          type: 'radiogroup',
          name: 'battery_vendor',
          title: 'Von welchem Hersteller ist dein Stromspeicher?',
          isRequired: true,
          choices: [
            {
              value: 'battery_senec',
              text: 'SENEC'
            },
            {
              value: 'battery_other',
              text: 'anderer Hersteller'
            }
          ]
        }
      ]
    },
    {
      name: 'page4',
      elements: [
        {
          type: 'radiogroup',
          name: 'heatpump_access',
          visibleIf: "{devices} contains 'heatpump'",
          title: 'Wie wird der Stromverbrauch der Wärmepumpe gemessen?',
          isRequired: true,
          choices: [
            {
              value: 'heatpump_shelly',
              text: 'Über einen Shelly'
            },
            {
              value: 'heatpump_mqtt',
              text: 'Über MQTT'
            }
          ]
        }
      ]
    }
  ]
}

import 'survey-core/i18n/german'
const survey = new Model(surveyJson)
survey.locale = 'de'
</script>

<template>
  <SurveyComponent :model="survey" />
</template>
