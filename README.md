# Meteo App

Meteo application for transport services in France, based on the current application : `https://github.com/madzadev/weather-app.git`


![Alt img](https://images.ctfassets.net/zlsyc9paq6sa/3uBrJ07WSM40FpolgjInHY/7d886cb4187b52194bf9b63c183a1d3a/1627637330_x.gif)

## Features

1. User's ability to search cities

2. Current local time and date

3. Temperatures and humidity

4. Wind speed and direction

5. Sunrise and sunset times

6. Metric vs Imperial system

7. Error handling and loading info

## Installation

1. `git clone https://github.com/PatrickLaubscher/meteo-app`

2. `cd meteo-app`

3. `npm install`

4. Log-in to [geocode.maps.co](https://geocode.maps.co/)

5. Create an API key

6. `cp .env.example .env.local`

7. Paste API key for `GEOCODING_API_KEY`

8. Change "cityName" and "postalCode" in config.json

8. `npm run dev`


