import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";
import hourlyData from "../services/processData";
import cron from 'node-cron';


export const App = () => {
  const [cityInput, setCityInput] = useState("Lyon");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityInput }),
        });
        const data = await res.json();
        setApiData(data);
        setCityInput("");
        console.log(data);

      } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des données"});
      }
    };
    getData();
    
    const taskGetData = cron.schedule('0 */8 * * *', getData);
    return () => {
      taskGetData.stop();
    };
  }, [triggerFetch]);

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
  }, [apiData]);
  


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
          <Search
            placeHolder="Cherchez une ville..."
            value={cityInput}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              e.keyCode === 13 && setTriggerFetch(!triggerFetch);
              e.target.placeholder = "Cherchez une ville...";
            }}
          />
         </Header>
         <MetricsBox weatherData={weatherData} />
       </ContentBox>
      </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="Ville non trouvée, faites une nouvelle recherche !">
      <Search
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && setTriggerFetch(!triggerFetch)}
      />
    </ErrorScreen>
  ) : (
      <LoadingScreen loadingMessage="Chargement des données..." />
  );
};

export default App;
