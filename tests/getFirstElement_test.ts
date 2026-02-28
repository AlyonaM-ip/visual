import { describe, it, expect } from 'vitest';
import { getFirstElement } from '../tc/lab1.js';

describe('getFirstElement', () => {
  it('should return first element of number array', () => {
    expect(getFirstElement([1, 2, 3])).toBe(1);
    expect(getFirstElement([5])).toBe(5);
  });

  it('should return first element of string array', () => {
    expect(getFirstElement(['a', 'b', 'c'])).toBe('a');
    expect(getFirstElement(['hello'])).toBe('hello');
  });

  it('should return first element of boolean array', () => {
    expect(getFirstElement([true, false, true])).toBe(true);
    expect(getFirstElement([false])).toBe(false);
  });

  it('should return first element of object array', () => {
    const objArray = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    expect(getFirstElement(objArray)).toEqual({ id: 1, name: 'Alice' });
  });

  it('should return first element of mixed type array', () => {
    const mixed = [1, 'two', true, { value: 4 }];
    expect(getFirstElement(mixed)).toBe(1);
  });

  it('should return undefined for empty array', () => {
    expect(getFirstElement([])).toBeUndefined();
  });

  it('should work with arrays from examples', () => {
    const booleanArray = [true, false, true, false];
    const objectArray = [{ name: "Анна" }, { name: "Петр" }, { name: "Мария" }];
    const mixedArray = [1, "два", true, { value: 4 }];

    expect(getFirstElement(booleanArray)).toBe(true);
    expect(getFirstElement(objectArray)).toEqual({ name: "Анна" });
    expect(getFirstElement(mixedArray)).toBe(1);
  });

  it('should preserve type information', () => {
    const numArray: number[] = [1, 2, 3];
    const first = getFirstElement(numArray);
    expect(typeof first).toBe('number');
    
    const strArray: string[] = ['a', 'b'];
    const firstStr = getFirstElement(strArray);
    expect(typeof firstStr).toBe('string');
  });
});