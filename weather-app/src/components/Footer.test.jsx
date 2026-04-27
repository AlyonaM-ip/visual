import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('rendering without errors', () => {
    render(<Footer weatherClass="weather-clear" />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('display given weatherClass', () => {
    render(<Footer weatherClass="weather-rain" />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');
    expect(footer).toHaveClass('weather-rain');
  });

  it('has a link to OpenWeather', () => {
    render(<Footer weatherClass="weather-clear" />);
    
    const link = screen.getByRole('link', { name: /openweather/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://openweathermap.org');
  });
});