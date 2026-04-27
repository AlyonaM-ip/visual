import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

vi.mock('../services/api', () => ({
  getCoordinates: vi.fn(),
  getWeather: vi.fn(),
  getAirPollution: vi.fn(),
  getIconUrl: vi.fn((code) => `https://openweathermap.org/img/wn/${code}@2x.png`),
}));

import { getCoordinates, getWeather, getAirPollution } from '../services/api';

const mockCoordinates = { lat: 55.75, lon: 37.61, name: 'Moscow' };
const mockWeather = {
  city: { name: 'Moscow' },
  list: [
    {
      dt_txt: '2026-04-27 15:00:00',
      main: { temp: 27, humidity: 80, pressure: 756 },
      wind: { speed: 5 },
      weather: [{ icon: '10d', description: 'light rain' }],
    },
    {
      dt_txt: '2026-04-28 12:00:00',
      main: { temp: 24, humidity: 70, pressure: 750 },
      wind: { speed: 3 },
      weather: [{ icon: '02d', description: 'few clouds' }],
    },
  ],
};
const mockPollution = {
  list: [
    {
      main: { aqi: 1 },
      components: {
        co: 200, no: 0, no2: 0.4, o3: 75, so2: 0.6,
        pm2_5: 23, pm10: 92, nh3: 0.1,
      },
    },
  ],
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getCoordinates.mockResolvedValue(mockCoordinates);
    getWeather.mockResolvedValue(mockWeather);
    getAirPollution.mockResolvedValue(mockPollution);
  });

  it(' displays loading first rendering ', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it(' rendering all components after data loading ', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Moscow')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Air Quality')).toBeInTheDocument();
    expect(screen.getByText('Forecast')).toBeInTheDocument();
  });

  it(' displays error if city was not founded ', async () => {
    getCoordinates.mockResolvedValue(null);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('City not found')).toBeInTheDocument();
    });
  });

  it(' displays error if API do not answer ', async () => {
    getCoordinates.mockRejectedValue(new Error('Network Error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });
  });
});