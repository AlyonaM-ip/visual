import { useState, useEffect } from 'react';
import { getCoordinates, getWeather, getAirPollution } from '../services/api';

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
      
      console.log('Fetching coordinates for:', cityName);
      const coords = await getCoordinates(cityName);
      console.log('Coordinates:', coords);
      
      if (!coords) {
        setError('City not found');
        setLoading(false);
        return;
      }

      const [weatherData, pollutionData] = await Promise.all([
        getWeather(coords.lat, coords.lon),
        getAirPollution(coords.lat, coords.lon)
      ]);

      console.log('Weather:', weatherData);
      console.log('Pollution:', pollutionData);
      
      setWeather(weatherData);
      setPollution(pollutionData);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load data');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(city);
  }, [city]);

  function handleCityChange(newCity) {
    setCity(newCity);
  }

  if (loading) return <p>Loading... Check console (F12)</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (!weather) return null;

  return (
    <div>
      <h1>{weather.city.name}</h1>
      <p>Data loaded! Check console for details</p>
    </div>
  );
}

export default App;