import config from "../config.json";
import findDescription from "./findDescription";
import findIcon from "./findIcon";


export default function hourlyData (data) {

    const date = new Date();
    const hour = date.getHours();

    let daySwitch;   
    if (data.hourly.is_day[hour] === 1) {
      daySwitch = 'd';
    } else {
      daySwitch = 'n';
    }
    
    const weatherCode = data.hourly.weather_code[hour];

    const weatherIcon = findIcon(weatherCode, daySwitch);
    const weatherDescription = findDescription(weatherCode);    
    const cityName = config.cityName;
    
    const dataProcessed = {
      city: cityName,
      timezone: data.utc_offset_seconds,
      description: weatherDescription,
      iconName: weatherIcon,
      temp: data.hourly.temperature_2m[hour],
      feels_like: data.hourly.apparent_temperature[hour],
      precipitation_probability: data.hourly.precipitation_probability[hour],
      humidity: data.hourly.relative_humidity_2m[hour],
      visibility: data.hourly.visibility[hour],
      wind_speed: data.hourly.wind_speed_10m[hour],
      wind_deg: data.hourly.wind_direction_10m[hour],
      dt: data.hourly.time[hour],
      precipitation_cumul: data.daily.precipitation_sum[0],
      t_max : data.daily.temperature_2m_max[0],
      t_min : data.daily.temperature_2m_min[0],
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
      daylight_duration: data.daily.daylight_duration[0]
    };
    
    return dataProcessed;

}

