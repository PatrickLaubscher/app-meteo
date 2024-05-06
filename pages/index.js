import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";


import styles from "../styles/Home.module.css";
import handler from "./api/data";
import hourlyData from "../services/processData";


export const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await handler();
      const dataProcessed = await hourlyData(data);
      setWeatherData(dataProcessed);
    };
    getData();
    const countHourly = setInterval(getData(), 1000*60*60)
    return () => clearInterval(countHourly);
  }, []);

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
