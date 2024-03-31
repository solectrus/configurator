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
      senec_interval: 9,
      shelly_host: '5.6.7.8',
      shelly_interval: 10,
      forecast: true,
      forecast_roofs: '1',
      forecast_latitude: 11.1,
      forecast_longitude: 22.2,
      forecast_declination1: 33.3,
      forecast_azimuth1: 44.4,
      forecast_kwp1: 5.55,
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
      forecast_roofs: '2',
      forecast_latitude: 11.1,
      forecast_longitude: 22.2,
      forecast_declination1: 33.1,
      forecast_azimuth1: 44.1,
      forecast_kwp1: 5.1,
      forecast_declination2: 33.2,
      forecast_azimuth2: 44.2,
      forecast_kwp2: 5.2,
      backup: true,
      admin_password: 'admin-password',
      aws_access_key_id: 'aws-access-key-id',
      aws_secret_access_key: 'aws-secret',
      aws_region: 'eu-central-1',
      aws_bucket: 'my-bucket',
      mqtt_inverter_power: 'foo/0/inverter',
      mqtt_house_power: 'foo/0/house',
      mqtt_grid_power: 'foo/0/grid',
      mqtt_grid_power_pos_neg: 'neg_pos',
      mqtt_battery_power: 'foo/0/battery',
      mqtt_battery_power_pos_neg: 'neg_pos',
      mqtt_battery_soc: 'foo/0/soc',
      mqtt_wallbox_power: 'foo/0/wallbox',
      mqtt_case_temp: 'foo/0/case_temp',
      mqtt_system_status: 'foo/0/system_status',
      mqtt_system_status_ok: 'foo/0/system_status_ok',
      mqtt_grid_export_limit: 'foo/0/grid_export_limit',
      mqtt_heatpump_power: 'foo/0/heatpump',
    },
  ],
  [
    'forecast-three-roofs',
    {
      forecast: true,
      forecast_roofs: '3',
      forecast_latitude: 11.1,
      forecast_longitude: 22.2,
      forecast_declination1: 33.1,
      forecast_azimuth1: 44.1,
      forecast_kwp1: 5.1,
      forecast_declination2: 33.2,
      forecast_azimuth2: 44.2,
      forecast_kwp2: 5.2,
      forecast_declination3: 33.3,
      forecast_azimuth3: 44.3,
      forecast_kwp3: 5.3,
    },
  ],
  [
    'forecast-four-roofs',
    {
      forecast: true,
      forecast_roofs: '4',
      forecast_latitude: 11.1,
      forecast_longitude: 22.2,
      forecast_declination1: 33.1,
      forecast_azimuth1: 44.1,
      forecast_kwp1: 5.1,
      forecast_declination2: 33.2,
      forecast_azimuth2: 44.2,
      forecast_kwp2: 5.2,
      forecast_declination3: 33.3,
      forecast_azimuth3: 44.3,
      forecast_kwp3: 5.3,
      forecast_declination4: 33.4,
      forecast_azimuth4: 44.4,
      forecast_kwp4: 5.4,
    },
  ],
  [
    'local-full-mqtt-flip',
    {
      devices: ['inverter', 'battery'],
      installation_type: 'local',
      battery_vendor: 'other',
      mqtt_inverter_power: 'foo/0/inverter',
      mqtt_house_power: 'foo/0/house',
      mqtt_grid_power: 'foo/0/grid',
      mqtt_grid_power_pos_neg: 'pos_neg',
      mqtt_battery_power: 'foo/0/battery',
      mqtt_battery_power_pos_neg: 'pos_neg',
      mqtt_battery_soc: 'foo/0/soc',
      mqtt_case_temp: 'foo/0/case_temp',
      mqtt_system_status: 'foo/0/system_status',
      mqtt_system_status_ok: 'foo/0/system_status_ok',
      mqtt_grid_export_limit: 'foo/0/grid_export_limit',
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
      senec_interval: 5,
      shelly_host: '5.6.7.8',
      shelly_interval: 5,
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
