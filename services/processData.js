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
    
    const timeZone = 60 * date.getTimezoneOffset();

    const weatherCode = data.hourly.weather_code[hour];

    const weatherIcon = findIcon(weatherCode, daySwitch);
    const weatherDescription = findDescription(weatherCode);    
    const cityName = config.cityName;
    
    const dataProcessed = {
      city: cityName,
      description: weatherDescription,
      iconName: weatherIcon,
      temp: data.hourly.temperature_2m[hour],
      feels_like: data.hourly.apparent_temperature[hour],
      humidity: data.hourly.relative_humidity_2m[hour],
      visibility: data.hourly.visibility[hour],
      wind_speed: data.hourly.wind_speed_10m[hour],
      wind_deg: data.hourly.wind_direction_10m[hour],
      dt: data.hourly.time[hour],
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
      t_max : data.daily.temperature_2m_max[0],
      t_min : data.daily.temperature_2m_min[0],
      timezone: timeZone
    };
    
    return dataProcessed;

}

