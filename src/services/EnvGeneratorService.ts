import type { Answers } from '@/stores/survey'

export class EnvGeneratorService {
  static generate(answers: Answers): string {
    return `##################################################################
# Dashboard application (the main part)
#
# Domain name or IP address of your host
APP_HOST=my-little-raspbery.local
#
# SSL redirect: Use "true" if you want to auto-redirect to https, but ensure that you have a valid SSL certificate
# and a reverse proxy in front of the app!
# In all other cases, the option must be "false"!
FORCE_SSL=false
#
# Secret token to secure cookies, 128 chars long hexadecimal encoded string (don't use this example, make some random changes!)
# Currently there are no cookies in Soletrus, but this may change in the future
SECRET_KEY_BASE=f60debe97dcb73280a2cc83668fd60e8d0e8e48269036a7bce980ee53cfb312e377989a750b8c945a5f69b041289ecb4e2d9e40641b81257c65ac2d43e3c837f
#
# Date of commissioning of your photovoltaic system
INSTALLATION_DATE=2022-01-27
#
# Password for the PostgreSQL database, used by the app to comunicate internally with the database
# Caution: Do not change this after the first run, otherwise the app will no longer be able to connect to the database!
POSTGRES_PASSWORD=my-secret-db-password
#
# Password to login as administrator, required to manage settings like historical prices
ADMIN_PASSWORD=my-secret-login-password
#
# Optional: Allow iframe embedding
# FRAME_ANCESTORS=https://my-other-home-automation-software.com
#
# Start web server Puma in single mode (recommended to reduce memory usage)
WEB_CONCURRENCY=0
#

##################################################################
# Influx database settings
#
# Influx host (to access from SOLECTRUS dashboard and collectors)
INFLUX_HOST=influxdb
INFLUX_SCHEMA=http
INFLUX_PORT=8086
#
# Credentials for the Influx database, don't change after the first run!
INFLUX_ORG=solectrus
INFLUX_USERNAME=admin
INFLUX_PASSWORD=ExAmPl3PA55W0rD
INFLUX_ADMIN_TOKEN=my-super-secret-admin-token
#
# Set these names before first run, they can't be changed later!
INFLUX_BUCKET=solectrus
INFLUX_MEASUREMENT_PV=SENEC
INFLUX_MEASUREMENT_FORECAST=Forecast
#
# To keep things simple, we use ONE token (INFLUX_ADMIN_TOKEN) for both writing and reading.
# For better security, you can use two separate tokens, created via the InfluxDB frontend.
INFLUX_TOKEN_WRITE=my-super-secret-admin-token
INFLUX_TOKEN_READ=my-super-secret-admin-token
#
# Volume path for storing the Influx data
INFLUX_VOLUME_PATH=/home/pi/solectrus/influxdb
#
# Interval in seconds for polling the InfluxDB
INFLUX_POLL_INTERVAL=5

##################################################################
# REDIS settings
#
REDIS_VOLUME_PATH=/home/pi/solectrus/redis

##################################################################
# PostgreSQL database settings
#
DB_VOLUME_PATH=/home/pi/solectrus/postgresql

##################################################################
# SENEC Collector

### When you have a SENEC.Home V2 or V3

SENEC_ADAPTER=local

# Change the SENEC_HOST to the IP address of your SENEC system
SENEC_HOST=192.168.0.0

SENEC_SCHEMA=https
SENEC_INTERVAL=5
SENEC_LANGUAGE=de

### When you have a SENEC.Home 4

SENEC_ADAPTER=cloud

# Credentials for mein-senec.de
SENEC_USERNAME=me@example.com
SENEC_PASSWORD=my-secret-password

# System ID of your SENEC system, not reqired if you have just one system
# SENEC_SYSTEM_ID=123456

# Interval in seconds for polling the SENEC cloud, minimum 30 seconds
SENEC_INTERVAL=60

##################################################################
# Solar forecasting with https://forecast.solar
# API docs: https://doc.forecast.solar/doku.php?id=api:estimate
#
# Latitude of the plant location
FORECAST_LATITUDE=50.12345
#
# Longitude of the plant location
FORECAST_LONGITUDE=6.12345
#
# Plane declination: 0 (horizontal) - 90 (vertical)
FORECAST_DECLINATION=30
#
# Plane azimuth: -180 ... 180 (-180 = north, -90 = east, 0 = south, 90 = west, 180 = north)
FORECAST_AZIMUTH=20
#
# Installed modules power in kilowatt peak (kWp)
FORECAST_KWP=8.4
#
# Optional damping factors (http://doc.forecast.solar/damping)
# FORECAST_DAMPING_MORNING=0.5
# FORECAST_DAMPING_EVENING=0
#
# Optional configuration for multiple planes
#
# Number of planes
# FORECAST_CONFIGURATIONS=2
#
# Starting from 0, add params different from the values defined above
# FORECAST_0_AZIMUTH=90
# FORECAST_0_KWP=5.32
# FORECAST_1_AZIMUTH=-90
# FORECAST_1_KWP=7.84
#
# Available params are:
# - FORECAST_x_LATITUDE
# - FORECAST_x_LONGITUDE
# - FORECAST_x_DECLINATION
# - FORECAST_x_AZIMUTH
# - FORECAST_x_KWP
# - FORECAST_x_DAMPING_MORNING
# - FORECAST_x_DAMPING_EVENING
#
# Update interval in seconds, 900s = 15 minutes, the public (and free) API allows a minimum of 900 seconds
# BEWARE: Each plane counts as one request, so if you have multiple planes, you need to multiply the interval!
FORECAST_INTERVAL=900
#
# Optional API key for registered users of forecast.solar (https://doc.forecast.solar/account_models)
# FORECAST_SOLAR_APIKEY=abc123
    `
  }
}
