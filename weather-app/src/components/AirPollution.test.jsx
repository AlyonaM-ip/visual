import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AirPollution from './AirPollution';

const mockPollution = {
  list: [
    {
      main: { aqi: 1 },
      components: {
        co: 203.6,
        no: 0.0,
        no2: 0.4,
        o3: 75.1,
        so2: 0.6,
        pm2_5: 23.3,
        pm10: 92.2,
        nh3: 0.1,
      },
    },
  ],
};

describe('AirPollution', () => {
  it(' rendering without errors ', () => {
    render(<AirPollution pollution={mockPollution} />);
    
    expect(screen.getByText('Air Quality')).toBeInTheDocument();
  });

  it('displays AQI ad text values', () => {
    render(<AirPollution pollution={mockPollution} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('displays concentrations ', () => {
    render(<AirPollution pollution={mockPollution} />);
    
    expect(screen.getByText('203.6 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('0 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('0.4 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('75.1 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('0.6 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('23.3 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('92.2 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('0.1 μg/m³')).toBeInTheDocument();
  });

  it('displays correct level for AQI 5 (Very Poor)', () => {
    const poorPollution = {
      list: [
        {
          main: { aqi: 5 },
          components: {
            co: 500,
            no: 10,
            no2: 250,
            o3: 200,
            so2: 400,
            pm2_5: 80,
            pm10: 250,
            nh3: 5,
          },
        },
      ],
    };
    
    render(<AirPollution pollution={poorPollution} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Very Poor')).toBeInTheDocument();
  });
});