import config from '../../config.json';

export default async function handler() {

  const { cityName, postalCode } = config;

  const getCoordinates = await fetch(
     `https://geocode.maps.co/search?q=${cityName}+${postalCode}+france&api_key=6635ed7c02e00632496336ncf34c563`
  )
  const coordinates = await getCoordinates.json();


  const latitude = coordinates[0].lat;
  const longitude = coordinates[0].lon;

  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,weather_code,is_day&daily=sunrise,sunset&timezone=GMT`
  );
  const data = await getWeatherData.json();
  return data;
}
