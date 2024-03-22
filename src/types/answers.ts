type TYear = `${number}${number}${number}${number}`
type TMonth = `${number}${number}`
type TDay = `${number}${number}`
type TDateISODate = `${TYear}-${TMonth}-${TDay}`

export interface Answers {
  devices?: Array<'inverter' | 'battery' | 'wallbox' | 'heatpump'>
  battery_vendor?: 'senec3' | 'senec4' | 'other'
  heatpump_access?: 'shelly' | 'mqtt'
  wallbox_vendor?: 'senec' | 'other'
  installation_type?: 'local' | 'cloud' | 'distributed'
  distributed_choice?: 'local' | 'cloud'
  senec_host?: string
  senec_interval?: number
  senec_schema?: 'https' | 'http'
  senec_language?: 'de' | 'en' | 'it'
  senec_username?: string
  senec_password?: string
  senec_system_id?: string
  senec_interval_cloud?: number
  shelly_host?: string
  shelly_interval?: number
  mqtt_inverter_power?: string
  mqtt_house_power?: string
  mqtt_grid_power?: string
  mqtt_grid_power_pos_neg?: 'pos_neg' | 'neg_pos'
  mqtt_battery_power?: string
  mqtt_battery_power_pos_neg?: 'pos_neg' | 'neg_pos'
  mqtt_battery_soc?: string
  mqtt_wallbox_power?: string
  mqtt_case_temp?: string
  mqtt_system_status?: string
  mqtt_system_status_ok?: string
  mqtt_grid_export_limit?: string
  mqtt_heatpump?: string
  forecast?: boolean
  forecast_latitude?: number
  forecast_longitude?: number
  forecast_roofs?: 'one' | 'two' | 'three' | 'four'
  forecast_azimuth?: number
  forecast_declination?: number
  forecast_kwp?: number
  backup?: boolean
  aws_access_key_id?: string
  aws_secret_access_key?: string
  aws_region?: string
  aws_bucket?: string
  installation_date?: TDateISODate
  admin_password?: string
  traefik?: boolean
  app_domain?: string
}
