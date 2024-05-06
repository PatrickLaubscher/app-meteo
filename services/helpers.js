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
