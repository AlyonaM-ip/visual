import { describe, it, expect } from 'vitest';
import { 
  capitalizeFirstLetter, 
  trimAndTransform, 
  reverseString, 
  removeVowels,
  removeVowelsRegex 
} from '../tc/lab1.js';

describe('String Formatters', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter and lowercase the rest', () => {
      expect(capitalizeFirstLetter('hello WORLD')).toBe('Hello world');
      expect(capitalizeFirstLetter('HELLO')).toBe('Hello');
      expect(capitalizeFirstLetter('hELLO')).toBe('Hello');
    });

    it('should handle cyrillic text', () => {
      expect(capitalizeFirstLetter('привет МИР')).toBe('Привет мир');
      expect(capitalizeFirstLetter('ПРИВЕТ')).toBe('Привет');
    });

    it('should uppercase entire string when uppercase flag is true', () => {
      expect(capitalizeFirstLetter('hello', true)).toBe('HELLO');
      expect(capitalizeFirstLetter('привет', true)).toBe('ПРИВЕТ');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
      expect(capitalizeFirstLetter('', true)).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
      expect(capitalizeFirstLetter('я')).toBe('Я');
    });
  });

  describe('trimAndTransform', () => {
    it('should trim whitespace from both ends', () => {
      expect(trimAndTransform('  hello  ')).toBe('hello');
      expect(trimAndTransform('\thello\n')).toBe('hello');
      expect(trimAndTransform('  привет  ')).toBe('привет');
    });

    it('should uppercase when flag is true', () => {
      expect(trimAndTransform('  hello  ', true)).toBe('HELLO');
      expect(trimAndTransform('  привет  ', true)).toBe('ПРИВЕТ');
    });

    it('should handle string with only spaces', () => {
      expect(trimAndTransform('   ')).toBe('');
    });
  });

  describe('reverseString', () => {
    it('should reverse english string', () => {
      expect(reverseString('hello')).toBe('olleh');
      expect(reverseString('world')).toBe('dlrow');
    });

    it('should reverse cyrillic string', () => {
      expect(reverseString('привет')).toBe('тевирп');
      expect(reverseString('мир')).toBe('рим');
    });

    it('should reverse and uppercase when flag is true', () => {
      expect(reverseString('hello', true)).toBe('OLLEH');
      expect(reverseString('привет', true)).toBe('ТЕВИРП');
    });

    it('should handle palindrome', () => {
      expect(reverseString('radar')).toBe('radar');
      expect(reverseString('шалаш')).toBe('шалаш');
    });

    it('should handle empty string', () => {
      expect(reverseString('')).toBe('');
    });
  });

  describe('removeVowels', () => {
    it('should remove english vowels', () => {
      expect(removeVowels('hello world')).toBe('hll wrld');
      expect(removeVowels('aeiou')).toBe('');
      expect(removeVowels('AEIOU')).toBe('');
    });

    it('should remove russian vowels', () => {
      expect(removeVowels('привет мир')).toBe('првт мр');
      expect(removeVowels('аеёиоуыэюя')).toBe('');
      expect(removeVowels('АЕЁИОУЫЭЮЯ')).toBe('');
    });

    it('should handle mixed case', () => {
      expect(removeVowels('HeLLo WoRLd')).toBe('HLL WRLd');
    });

    it('should uppercase when flag is true', () => {
      expect(removeVowels('hello world', true)).toBe('HLL WRLD');
      expect(removeVowels('привет мир', true)).toBe('ПРВТ МР');
    });

    it('should preserve consonants and spaces', () => {
      expect(removeVowels('test string')).toBe('tst strng');
      expect(removeVowels('bcdfg')).toBe('bcdfg');
    });
  });

  describe('removeVowelsRegex', () => {
    it('should remove vowels using regex', () => {
      expect(removeVowelsRegex('hello world')).toBe('hll wrld');
      expect(removeVowelsRegex('привет мир')).toBe('првт мр');
    });

    it('should handle mixed case', () => {
      expect(removeVowelsRegex('HeLLo WoRLd')).toBe('HLL WRLd');
    });

    it('should uppercase when flag is true', () => {
      expect(removeVowelsRegex('hello', true)).toBe('HLL');
      expect(removeVowelsRegex('привет', true)).toBe('ПРВТ');
    });

    it('should match removeVowels function output', () => {
      const testCases = ['hello world', 'привет мир', 'HeLLo WoRLd'];
      testCases.forEach(str => {
        expect(removeVowelsRegex(str)).toBe(removeVowels(str));
      });
    });
  });
});