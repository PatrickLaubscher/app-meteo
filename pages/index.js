import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";


import styles from "../styles/Home.module.css";
import config from "../config.json";
import handler from "./api/data";


export const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await handler();

      const date = new Date();
      const hour = date.getHours();
    
      let daySwitch;

      if (data.hourly.is_day[hour] === 1) {
        daySwitch = 'd';
      } else {
        daySwitch = 'n';
      }
    
      const code = data.hourly.weather_code[hour];
      
      let icon;
      switch(code) {
      case 0:
        icon = '01'
      break;
      case 1:
        icon = '02'
      break;
      case 2:
        icon = '03'
      break;
      case 3:
        icon = '04'
      break;
      case 61: 
      case 63: 
      case 51: 
      case 53: 
      case 55: 
      case 56: 
      case 57: 
      case 80: 
      case 81: 
      case 82:
        icon = '09'
      break;
      case 65:
      case 66: 
      case 67:
        icon = '10'
      break;
      case 95: 
      case 96: 
      case 99:
        icon = '11'
      break;
      case 71:
      case 73: 
      case 75: 
      case 77: 
      case 85: 
      case 86:
        icon = '13'
      break;
      case 45: 
      case 48:
        icon = '50'
      break;
      }

      const weatherIcon = icon + daySwitch;

      const cityName = config.cityName;

      const dataProcessed = {
        city: cityName,
        description: 'Légères pluies',
        iconName: weatherIcon,
        temp: data.hourly.temperature_2m[hour],
        feels_like: data.hourly.apparent_temperature[hour],
        humidity: data.hourly.relative_humidity_2m[hour],
        visibility: data.hourly.visibility[hour],
        wind_speed: data.hourly.wind_speed_10m[hour],
        wind_deg: data.hourly.wind_direction_10m[hour],
        dt: data.hourly.time[0],
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
        timezone: 7200
      };

      console.log(dataProcessed);

      setWeatherData(dataProcessed);
    };
    getData();
  }, []);
  ;
  

  return weatherData && !weatherData.message ? (
      
     <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        description={weatherData.description}
        iconName={weatherData.iconName}
        weatherData={weatherData}
      />
        <ContentBox>
         <Header>
          <DateAndTime weatherData={weatherData} />
         </Header>
         <MetricsBox weatherData={weatherData} />
       </ContentBox>
      </div>
  ) : (
      <LoadingScreen loadingMessage="Chargement des données..." />
  );
};

export default App;
