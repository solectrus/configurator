import type { Answers } from '@/types/answers'

export const testCases: [string, Answers][] = [
  [
    'local-full',
    {
      devices: ['inverter', 'battery', 'wallbox', 'heatpump'],
      installation_type: 'local',
      battery_vendor: 'senec3',
      wallbox_vendor: 'senec',
      heatpump_access: 'shelly',
      senec_host: '1.2.3.4',
      senec_language: 'it',
      senec_schema: 'http',
      forecast: true,
      backup: true,
      installation_date: '2021-01-01',
      admin_password: 'admin-password',
      aws_access_key_id: 'aws-access-key-id',
      aws_secret_access_key: 'aws-secret',
      aws_region: 'eu-central-1',
      aws_bucket: 'my-bucket',
    },
  ],
  [
    'local-full-mqtt',
    {
      devices: ['inverter', 'battery', 'wallbox', 'heatpump'],
      installation_type: 'local',
      battery_vendor: 'other',
      wallbox_vendor: 'other',
      heatpump_access: 'mqtt',
      forecast: true,
      backup: true,
      admin_password: 'admin-password',
      aws_access_key_id: 'aws-access-key-id',
      aws_secret_access_key: 'aws-secret',
      aws_region: 'eu-central-1',
      aws_bucket: 'my-bucket',
    },
  ],
  [
    'local-minimal',
    {
      devices: ['inverter', 'battery'],
      installation_type: 'local',
      battery_vendor: 'senec3',
      senec_host: '1.2.3.4',
      senec_language: 'it',
      senec_schema: 'http',
      installation_date: '2021-01-02',
      admin_password: 'admin-password',
    },
  ],
  [
    'distributed-local',
    {
      devices: ['inverter', 'battery', 'wallbox'],
      installation_type: 'distributed',
      distributed_choice: 'local',
      battery_vendor: 'senec3',
      wallbox_vendor: 'other',
      heatpump_access: 'shelly',
      senec_host: '1.2.3.4',
      senec_language: 'it',
      senec_schema: 'http',
      installation_date: '2021-01-03',
      admin_password: 'admin-password',
    },
  ],
  [
    'distributed-cloud',
    {
      devices: ['inverter', 'battery'],
      installation_type: 'distributed',
      distributed_choice: 'cloud',
      battery_vendor: 'senec3',
      installation_date: '2021-01-04',
      admin_password: 'admin-password',
    },
  ],
  [
    'cloud-senec3',
    {
      devices: ['inverter', 'battery'],
      installation_type: 'cloud',
      battery_vendor: 'senec3',
      senec_username: 'peter@gmx.de',
      senec_password: 'mysecret',
      senec_system_id: '111',
      senec_interval_cloud: 45,
      installation_date: '2021-01-05',
      admin_password: 'admin-password',
    },
  ],
  [
    'cloud-senec4',
    {
      devices: ['inverter', 'battery'],
      installation_type: 'cloud',
      battery_vendor: 'senec4',
      senec_username: 'peter@gmx.de',
      senec_password: 'mysecret',
      senec_system_id: '111',
      senec_interval_cloud: 45,
      installation_date: '2021-01-06',
      admin_password: 'admin-password',
    },
  ],
  [
    'cloud-senec4-traefik',
    {
      devices: ['inverter', 'battery'],
      installation_type: 'cloud',
      battery_vendor: 'senec4',
      senec_username: 'peter@gmx.de',
      senec_password: 'mysecret',
      senec_system_id: '111',
      senec_interval_cloud: 45,
      installation_date: '2021-01-06',
      admin_password: 'admin-password',
      traefik: true,
      app_domain: 'solectrus.my-website.de',
    },
  ],
  [
    'partial',
    {
      devices: ['inverter', 'battery'],
      installation_type: 'cloud',
      battery_vendor: 'senec4',
    },
  ],
  [
    'no-devices',
    {
      devices: [],
      installation_type: 'local',
    },
  ],
  [
    'balcony–power-plant',
    {
      devices: ['inverter'],
      installation_type: 'local',
    },
  ],
]
