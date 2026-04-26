import axios from 'axios';

const API_KEY = '9c6411dfb961ffe2244e30e2a6309edf';
const BASE_URL = 'https://api.openweathermap.org';

export async function getCoordinates(city) {
  const res = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  return res.data[0];
}

export async function getWeather(lat, lon) {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return res.data;
}

export async function getAirPollution(lat, lon) {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return res.data;
}

export function getIconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}