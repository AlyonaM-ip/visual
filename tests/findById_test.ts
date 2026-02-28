import { describe, it, expect } from 'vitest';
import { findById } from '../tc/lab1.js';
import type { HasId, Product, Department } from '../tc/lab1';

describe('findById', () => {
  const products: Product[] = [
    { id: 101, name: "Ноутбук", price: 75000, inStock: true },
    { id: 102, name: "Мышь", price: 1500, inStock: true },
    { id: 103, name: "Клавиатура", price: 3500, inStock: false },
    { id: 104, name: "Монитор", price: 25000, inStock: true }
  ];

  const departments: Department[] = [
    { id: 201, name: "ИТ-отдел", floor: 3, employees: 15 },
    { id: 202, name: "Бухгалтерия", floor: 2, employees: 8 },
    { id: 203, name: "Отдел кадров", floor: 1, employees: 5 }
  ];

  it('should find product by existing id', () => {
    const result = findById(products, 102);
    expect(result).toEqual({ id: 102, name: "Мышь", price: 1500, inStock: true });
  });

  it('should find department by existing id', () => {
    const result = findById(departments, 202);
    expect(result).toEqual({ id: 202, name: "Бухгалтерия", floor: 2, employees: 8 });
  });

  it('should return undefined for non-existent id', () => {
    const result = findById(products, 999);
    expect(result).toBeUndefined();
  });

  it('should handle empty array', () => {
    const result = findById([], 1);
    expect(result).toBeUndefined();
  });

  it('should find item at beginning of array', () => {
    const result = findById(products, 101);
    expect(result?.id).toBe(101);
    expect(result?.name).toBe("Ноутбук");
  });

  it('should find item at end of array', () => {
    const result = findById(products, 104);
    expect(result?.id).toBe(104);
    expect(result?.name).toBe("Монитор");
  });

  it('should work with custom objects implementing HasId', () => {
    const customItems = [
      { id: 1, data: 'test1' },
      { id: 2, data: 'test2' }
    ] as any[];
    
    const result = findById(customItems, 2);
    expect(result).toEqual({ id: 2, data: 'test2' });
  });

  it('should match examples from lab1', () => {
    const foundProduct = findById(products, 103);
    const foundDepartment = findById(departments, 202);
    const notFoundItem = findById(products, 999);

    expect(foundProduct).toEqual({ id: 103, name: "Клавиатура", price: 3500, inStock: false });
    expect(foundDepartment).toEqual({ id: 202, name: "Бухгалтерия", floor: 2, employees: 8 });
    expect(notFoundItem).toBeUndefined();
  });
});