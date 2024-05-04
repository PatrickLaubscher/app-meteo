import config from '../../config.json';

export default async function handler(req, res) {

  const { cityName } = config.cityName;
  const { postalCode } = config.postalCode;

  const getCoordinates = await fetch (
    `https://geocode.maps.co/search?q=${cityName}+${postalCode}+france&api_key=${process.env.GEOCODING_API_KEY}`
  )
  const coordinates = await getCoordinates.json();
  res.status(200).json(data);

  const { latitude } = parseFloat(coordinates[0].lat);
  const { longitude } = parseFloat(coordinates[0].lon);

  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,visibility,wind_speed_10m,wind_direction_10m`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);

}
