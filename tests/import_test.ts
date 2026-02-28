import { describe, it, expect } from 'vitest';
import * as lab1 from '../tc/lab1.js';

describe('Import test', () => {
  it('should import functions', () => {
    console.log('Imported functions:', Object.keys(lab1));
    expect(lab1.createUser).toBeDefined();
    expect(lab1.createBook).toBeDefined();
    expect(lab1.calculateArea).toBeDefined();
    expect(lab1.getStatusColor).toBeDefined();
    expect(lab1.capitalizeFirstLetter).toBeDefined();
    expect(lab1.reverseString).toBeDefined();
    expect(lab1.removeVowels).toBeDefined();
    expect(lab1.getFirstElement).toBeDefined();
    expect(lab1.findById).toBeDefined();
  });
});