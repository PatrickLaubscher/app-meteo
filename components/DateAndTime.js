import { getWeekDay, getDate } from "../services/helpers";
import styles from "./DateAndTime.module.css";
import Clock from 'react-live-clock'; 

export const DateAndTime = ({ weatherData }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getDate()}`}
      </h2>
      <h2>
        <Clock 
          format={'HH:mm:ss'}
          style={{padding: '0px 5px'}} 
          ticking={true}
          Timezone={'Europe/Paris'}/> 
      </h2>
    </div>
  );
};
