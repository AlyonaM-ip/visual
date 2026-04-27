import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Now from './Now';

vi.mock('../services/api', () => ({
  getIconUrl: vi.fn((code) => `https://openweathermap.org/img/wn/${code}@2x.png`),
}));

const MOCK_DATE = new Date('2026-04-27T15:00:00');

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(MOCK_DATE);
});

afterAll(() => {
  vi.useRealTimers();
});

const mockWeather = {
  city: { name: 'Moscow' },
  list: [
    {
      dt_txt: '2026-04-27 15:00:00',
      main: { temp: 27.3, humidity: 80, pressure: 756 },
      wind: { speed: 5 },
      weather: [{ icon: '10d', description: 'light rain' }],
    },
  ],
};

describe('Now', () => {
  it(' rendering eithout errors ', () => {
    render(<Now weather={mockWeather} />);
    
    expect(screen.getByText('Moscow')).toBeInTheDocument();
  });

  it(' displays city name ', () => {
    render(<Now weather={mockWeather} />);
    
    expect(screen.getByText('Moscow')).toBeInTheDocument();
  });

  it(' displays rounded temperature ', () => {
    render(<Now weather={mockWeather} />);
    
    expect(screen.getByText('27°')).toBeInTheDocument();
  });

  it(' displays weather discription ', () => {
    render(<Now weather={mockWeather} />);
    
    expect(screen.getByText('light rain')).toBeInTheDocument();
  });

  it(' displays icon with correct url ', () => {
    render(<Now weather={mockWeather} />);
    
    const image = screen.getByRole('img', { name: /light rain/i });
    expect(image).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/10d@2x.png'
    );
  });

  it(' displays wind speed ', () => {
    render(<Now weather={mockWeather} />);
    
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
  });

  it(' displays humodity ', () => {
    render(<Now weather={mockWeather} />);
    
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it(' diplays preassure ', () => {
    render(<Now weather={mockWeather} />);
    
    expect(screen.getByText('756 mm')).toBeInTheDocument();
  });
});