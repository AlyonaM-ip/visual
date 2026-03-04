import { describe, it, expect } from 'vitest';
import { calculateArea } from '../tc/lab1.js';

describe('calculateArea', () => {
  describe('circle', () => {
    it('should calculate circle area correctly', () => {
      expect(calculateArea('circle', 5)).toBeCloseTo(Math.PI * 25);
      expect(calculateArea('circle', 0)).toBe(0);
      expect(calculateArea('circle', 2.5)).toBeCloseTo(Math.PI * 6.25);
    });
  });

  describe('square', () => {
    it('should calculate square area correctly', () => {
      expect(calculateArea('square', 4)).toBe(16);
      expect(calculateArea('square', 0)).toBe(0);
      expect(calculateArea('square', 2.5)).toBe(6.25);
    });
  });

  describe('triangle', () => {
    it('should calculate triangle area correctly', () => {
      expect(calculateArea('triangle', 6, 8)).toBe(24);
      expect(calculateArea('triangle', 0, 5)).toBe(0);
      expect(calculateArea('triangle', 5, 0)).toBe(0);
      expect(calculateArea('triangle', 3, 4)).toBe(6);
    });
  });

  describe('rectangle', () => {
    it('should calculate rectangle area correctly', () => {
      expect(calculateArea('rectangle', 5, 10)).toBe(50);
      expect(calculateArea('rectangle', 0, 10)).toBe(0);
      expect(calculateArea('rectangle', 5, 0)).toBe(0);
      expect(calculateArea('rectangle', 2.5, 4)).toBe(10);
    });
  });

  describe('error handling', () => {
    it('should throw error for unsupported shape', () => {
      expect(() => calculateArea('hexagon' as any, 5)).toThrow('Неподдерживаемая фигура');
    });
  });

  describe('examples from lab1', () => {
    it('should match example calculations', () => {
      expect(calculateArea('triangle', 6, 8)).toBe(24);
      expect(calculateArea('rectangle', 5, 10)).toBe(50);
      expect(calculateArea('circle', 3)).toBeCloseTo(28.27, 2);
      expect(calculateArea('square', 7)).toBe(49);
    });
  });
});