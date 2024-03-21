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
  forecast?: boolean
  forecast_latitude?: number
  forecast_longitude?: number
  forecast_roofs?: 'one' | 'two' | 'three' | 'four'
  forecast_azimuth?: number
  forecast_declination?: number
  forecast_kwp?: number
  updates?: boolean
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
