import { describe, it, expect } from 'vitest';
import { getStatusColor } from '../tc/lab1.js';
import type { Status } from '../tc/lab1';

describe('getStatusColor', () => {
  it('should return green for active status', () => {
    expect(getStatusColor('active')).toBe('green');
  });

  it('should return gray for inactive status', () => {
    expect(getStatusColor('inactive')).toBe('gray');
  });

  it('should return blue for new status', () => {
    expect(getStatusColor('new')).toBe('blue');
  });

  it('should return red for blocked status', () => {
    expect(getStatusColor('blocked')).toBe('red');
  });

  it('should return orange for pending status', () => {
    expect(getStatusColor('pending')).toBe('orange');
  });

  it('should handle all status types', () => {
    const statuses: Status[] = ['active', 'inactive', 'new', 'blocked', 'pending'];
    const expectedColors = ['green', 'gray', 'blue', 'red', 'orange'];
    
    statuses.forEach((status, index) => {
      expect(getStatusColor(status)).toBe(expectedColors[index]);
    });
  });

  it('should return string type', () => {
    const result = getStatusColor('active');
    expect(typeof result).toBe('string');
  });
});