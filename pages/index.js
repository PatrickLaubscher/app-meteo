import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";


import styles from "../styles/Home.module.css";
import config from "../config.json";
import handler from "./api/data";


export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    const getData = async () => {
      const data = await handler();

      // console.log(data.hourly);

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
      case 61, 63, 51, 53, 55, 56, 57, 80, 81, 82:
        icon = '09'
      break;
      case 65, 66, 67 :
        icon = '10'
      break;
      case 95, 96, 99 :
        icon = '11'
      break;
      case 71, 73, 75, 77, 85, 86 :
      icon = '13'
      break;
      case 45, 48 :
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
      };

      console.log(dataProcessed);

      setWeatherData(dataProcessed);
    };
    getData();
  }, []);
  ;
  
  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
      
     <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        description={weatherData.description}
        iconName={weatherData.iconName}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
        <ContentBox>
         <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
         </Header>
         <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
         <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
       </ContentBox>
      </div>
  ) : weatherData && weatherData.message ? (Z
    ) : (
      <LoadingScreen loadingMessage="Chargement des données..." />
  );
};

export default App;
