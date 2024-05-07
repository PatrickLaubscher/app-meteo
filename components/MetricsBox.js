import { degToCompass } from "../services/converters";
import {
  getTime,
  getVisibility,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Risque de précipitations"}
        iconSrc={"/icons/umbrella.svg"}
        metric={weatherData.precipitation_probability}
        unit={"%"}
      />
      <MetricsCard
        title={"Cumul total des précipitations"}
        iconSrc={"/icons/cumul-rain.svg"}
        metric={weatherData.precipitation_cumul}
        unit={"mm"}
      />
      <MetricsCard
        title={"Humidité"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.humidity}
        unit={"%"}
      />
      <MetricsCard
        title={"Vitesse du vent"}
        iconSrc={"/icons/wind.png"}
        metric={weatherData.wind_speed}
        unit={"km/h"}
      />
      <MetricsCard
        title={"Direction du vent"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.wind_deg)}
      />
      <MetricsCard
        title={"Visibilité"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(weatherData.visibility)}
        unit={"km"}
      />
      <MetricsCard
        title={"Lever du soleil"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(
          weatherData.sunrise,
          weatherData.timezone
        )}
      />
      <MetricsCard
        title={"Coucher du soleil"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(
          weatherData.sunset,
          weatherData.timezone
        )}
      />
      <MetricsCard
        title={"Durée du jour"}
        iconSrc={"/icons/duration-day.png"}
        metric={getTime(
          weatherData.daylight_duration,
          weatherData.timezone
        )}
      />
    </div>
  );
};
