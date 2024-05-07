import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";

import styles from "../styles/Home.module.css";
import hourlyData from "../services/processData";
import cron from 'node-cron';


export const App = () => {
  const [apiData, setApiData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setApiData(data);
      } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des données"});
      }
    };
    getData();
    
    const taskGetData = cron.schedule('0 0 * * *', getData);
    return () => {
      taskGetData.stop();
    };
  }, []);

  useEffect(() => {
    const getHourlyData = () => {
      if (apiData) {
        const dataProcessed = hourlyData(apiData);
        setWeatherData(dataProcessed);
      }
    };
    getHourlyData();
    
    const taskGetHourlyData = cron.schedule('0 * * * *', getHourlyData);
    return () => {
      taskGetHourlyData.stop();
    };
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
