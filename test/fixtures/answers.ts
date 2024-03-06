import type { Answers } from '@/stores/survey'

export const testCases: [string, Answers][] = [
  ['blank', {}],
  [
    'local-full',
    {
      installation_type: 'local',
      battery_vendor: 'battery_senec3',
      wallbox_vendor: 'wallbox_senec',
      heatpump_access: 'heatpump_shelly',
      senec_host: '1.2.3.4',
      senec_language: 'it',
      senec_schema: 'http',
      q_forecast: true,
      q_updates: true,
      q_backup: true,
      q_installation_date: '2021-01-01',
    },
  ],
  [
    'local-full-mqtt',
    {
      installation_type: 'local',
      battery_vendor: 'battery_other',
      wallbox_vendor: 'wallbox_other',
      heatpump_access: 'heatpump_mqtt',
      q_forecast: true,
      q_updates: true,
      q_backup: true,
    },
  ],
  [
    'local-minimal',
    {
      installation_type: 'local',
      battery_vendor: 'battery_senec3',
      senec_host: '1.2.3.4',
      senec_language: 'it',
      senec_schema: 'http',
      q_installation_date: '2021-01-02',
    },
  ],
  [
    'distributed-local',
    {
      installation_type: 'distributed',
      q_distributed_choice: 'local',
      battery_vendor: 'battery_senec3',
      wallbox_vendor: 'wallbox_other',
      heatpump_access: 'heatpump_shelly',
      senec_host: '1.2.3.4',
      senec_language: 'it',
      senec_schema: 'http',
      q_installation_date: '2021-01-03',
    },
  ],
  [
    'distributed-cloud',
    {
      installation_type: 'distributed',
      q_distributed_choice: 'cloud',
      battery_vendor: 'battery_senec3',
      q_installation_date: '2021-01-04',
    },
  ],
  [
    'cloud-senec3',
    {
      installation_type: 'cloud',
      battery_vendor: 'battery_senec3',
      senec_username: 'peter@gmx.de',
      senec_password: 'mysecret',
      senec_system_id: '111',
      senec_interval_cloud: '45',
      q_installation_date: '2021-01-05',
    },
  ],
  [
    'cloud-senec4',
    {
      installation_type: 'cloud',
      battery_vendor: 'battery_senec4',
      senec_username: 'peter@gmx.de',
      senec_password: 'mysecret',
      senec_system_id: '111',
      senec_interval_cloud: '45',
      q_installation_date: '2021-01-06',
    },
  ],
]
