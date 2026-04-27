import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Forecast from './Forecast';

vi.mock('../services/api', () => ({
  getIconUrl: vi.fn((code) => `https://openweathermap.org/img/wn/${code}@2x.png`),
}));

const mockWeather = {
  list: [
    {
      dt: 1,
      dt_txt: '2026-04-27 12:00:00',
      main: { temp: 27.3 },
      weather: [{ icon: '10d', description: 'light rain' }],
    },
    {
      dt: 2,
      dt_txt: '2026-04-28 12:00:00',
      main: { temp: 24.7 },
      weather: [{ icon: '02d', description: 'few clouds' }],
    },
    {
      dt: 3,
      dt_txt: '2026-04-29 12:00:00',
      main: { temp: 28.1 },
      weather: [{ icon: '01d', description: 'clear sky' }],
    },
    {
      dt: 4,
      dt_txt: '2026-04-27 15:00:00',
      main: { temp: 26.0 },
      weather: [{ icon: '10d', description: 'light rain' }],
    },
  ],
};

describe('Forecast', () => {
  it('rendering without errors', () => {
    render(<Forecast weather={mockWeather} />);
    
    expect(screen.getByText('Forecast')).toBeInTheDocument();
  });

  it(' dispays only logs at 12:00', () => {
    render(<Forecast weather={mockWeather} />);
    
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it(' displays temperature for each day ', () => {
    render(<Forecast weather={mockWeather} />);
    
    expect(screen.getByText('27°')).toBeInTheDocument();
    expect(screen.getByText('25°')).toBeInTheDocument();
    expect(screen.getByText('28°')).toBeInTheDocument();
  });

  it(' displays icons with correct url ', () => {
    render(<Forecast weather={mockWeather} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', 'https://openweathermap.org/img/wn/10d@2x.png');
    expect(images[1]).toHaveAttribute('src', 'https://openweathermap.org/img/wn/02d@2x.png');
    expect(images[2]).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
  });
});