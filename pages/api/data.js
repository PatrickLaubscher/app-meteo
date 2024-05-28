
export default async function handler(req, res) {
  const { cityInput } = req.body;
  try {

    const getCoordinates = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1&language=fr&format=json`
    )
    const coordinates = await getCoordinates.json();

    const cityName = coordinates.results[0].name;
    const { latitude } = coordinates.results[0];
    const { longitude } = coordinates.results[0];

    const getWeatherData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,visibility,wind_speed_10m,wind_direction_10m,is_day,precipitation_probability&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_sum,daylight_duration&timeformat=unixtime&timezone=auto&forecast_days=1`
    );
    const data = await getWeatherData.json();
    data.city_name = cityName;

    res.status(200).json(data);
  } 
  catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des données"});
  }
  
}
