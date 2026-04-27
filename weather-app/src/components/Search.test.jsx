import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search', () => {
  it('redering without errors', () => {
    render(<Search onCityChange={() => {}} />);
    
    const input = screen.getByPlaceholderText(/enter location name/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls onCityChange with entered city on button click ', async () => {
    const mockOnCityChange = vi.fn();
    
    render(<Search onCityChange={mockOnCityChange} />);
    
    const input = screen.getByPlaceholderText(/enter location name/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    await userEvent.type(input, 'London');
    await userEvent.click(button);
    
    expect(mockOnCityChange).toHaveBeenCalledTimes(1);
    expect(mockOnCityChange).toHaveBeenCalledWith('London');
  });

  it('clearing enter field ', async () => {
    render(<Search onCityChange={() => {}} />);
    
    const input = screen.getByPlaceholderText(/enter location name/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    await userEvent.type(input, 'London');
    await userEvent.click(button);
    
    expect(input).toHaveValue('');
  });

  it('no calls onCityChange if enter field is empty', async () => {
    const mockOnCityChange = vi.fn();
    
    render(<Search onCityChange={mockOnCityChange} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);
    
    expect(mockOnCityChange).not.toHaveBeenCalled();
  });
});