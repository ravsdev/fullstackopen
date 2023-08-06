import axios from "axios";
const geoUrl = "https://api.openweathermap.org/geo/1.0/direct";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getLatLon = (capital, cca2) => {
  const request = axios.get(
    `${geoUrl}?q=${capital},${cca2}&limit=5&appid=${api_key}`
  );
  return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
  const request = axios.get(
    `${weatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
  );
  return request.then((response) => response.data);
};

export default { getLatLon, getWeather };
