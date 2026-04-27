import { useState, useEffect } from 'react';
import { getCoordinates, getWeather, getAirPollution } from '../services/api';
import Search from '../components/Search';
import Now from '../components/Now';
import Forecast from '../components/Forecast';
import AirPollution from '../components/AirPollution';
import Footer from '../components/Footer';

function getWeatherClass(weather) {
  if (!weather) return '';
  const code = weather.list[0].weather[0].id;
  
  if (code >= 200 && code < 300) return 'weather-thunderstorm';
  if (code >= 300 && code < 400) return 'weather-drizzle';
  if (code >= 500 && code < 600) return 'weather-rain';
  if (code >= 600 && code < 700) return 'weather-snow';
  if (code >= 700 && code < 800) return 'weather-mist';
  if (code === 800) return 'weather-clear';
  if (code > 800) return 'weather-clouds';
  return '';
}

function App() {
  const [city, setCity] = useState('Moscow');
  const [weather, setWeather] = useState(null);
  const [pollution, setPollution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(cityName) {
    try {
      setLoading(true);
      setError(null);
      
      const coords = await getCoordinates(cityName);
      if (!coords) {
        setError('City not found');
        setLoading(false);
        return;
      }

      const [weatherData, pollutionData] = await Promise.all([
        getWeather(coords.lat, coords.lon),
        getAirPollution(coords.lat, coords.lon)
      ]);
      
      setWeather(weatherData);
      setPollution(pollutionData);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(city);
    
    const interval = setInterval(() => {
      fetchData(city);
    }, 3 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!weather || !pollution) return <p>No data</p>;

  const weatherClass = getWeatherClass(weather);

  return (
    <>
      <Search onCityChange={setCity} />
      <main className={`main ${weatherClass}`}>
        <Now weather={weather} />
        <AirPollution pollution={pollution} />
        <Forecast weather={weather} />
      </main>
      <Footer weatherClass={weatherClass} />
    </>
  );
}

export default App;