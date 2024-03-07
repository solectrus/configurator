type TYear = `${number}${number}${number}${number}`
type TMonth = `${number}${number}`
type TDay = `${number}${number}`
type TDateISODate = `${TYear}-${TMonth}-${TDay}`

export interface Answers {
  q_devices?: Array<'battery' | 'wallbox' | 'heatpump'>
  battery_vendor?: 'battery_senec3' | 'battery_senec4' | 'battery_other'
  heatpump_access?: 'heatpump_shelly' | 'heatpump_mqtt'
  wallbox_vendor?: 'wallbox_senec' | 'wallbox_other'
  installation_type?: 'local' | 'cloud' | 'distributed'
  q_distributed_choice?: 'local' | 'cloud'
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
  q_forecast?: boolean
  forecast_latitude?: number
  forecast_longitude?: number
  q_forecast_roofs?: 'one' | 'two' | 'three' | 'four'
  forecast_azimuth?: number
  forecast_declination?: number
  forecast_kwp?: number
  q_updates?: boolean
  q_backup?: boolean
  aws_access_key_id?: string
  aws_secret_access_key?: string
  aws_region?: string
  aws_bucket?: string
  q_installation_date?: TDateISODate
  admin_password?: string
}
