import {
  unixToLocalTime,
} from "./converters";

export const getVisibility = (visibilityInMeters) => 
  (visibilityInMeters / 1000).toFixed(1);

export const getTime = (currentTime, timezone) =>
  unixToLocalTime(currentTime, timezone)

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return weekday[
    new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
  ];
};

export const getDate = () => {

  const date = new Date();

  let day = date.getDate();
  let monthNumber = date.getMonth();
  let year = date.getFullYear();

  const month = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];

  let currentDate = `le ${day} ${month[monthNumber]} ${year}`;

  return currentDate;

}
