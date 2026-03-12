import { describe, it, expect } from 'vitest';
import { where, sort, groupBy, having, query } from '../tc/lab5';

describe('lab5 — строгий порядок операций', () => {
  const users: any[] = [
    { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
    { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
    { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
    { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
  ];

  it('where + sort', () => {
    const pipeline = query(where("name", "John"), sort("age"));
    const result = pipeline(users) as any[];
    expect(result.length).toBe(3);
    expect(result[0].age).toBe(33);
  });

  it('where + groupBy + having', () => {
    const pipeline = query(
      where("surname", "Doe"),
      groupBy("city"),
      having(g => g.items.length > 1)
    );
    const result = pipeline(users) as any[];
    expect(result.length).toBe(2);
  });

  it('where + groupBy + having + sort', () => {
    const pipeline = query(
      where("surname", "Doe"),
      groupBy("city"),
      having(g => g.items.length > 1),
      sort("key")
    );
    const result = pipeline(users) as any[];
    expect(result.length).toBe(2);
  });

  it('несколько where + sort', () => {
    const pipeline = query(
      where("name", "John"),
      where("surname", "Doe"),
      sort("age")
    );
    const result = pipeline(users) as any[];
    expect(result).toEqual([
      { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
      { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
      { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
    ]);
  });

  it('пустой query', () => {
    const pipeline = query();
    const result = pipeline(users) as any[];
    expect(result).toEqual(users);
  });

  //нешаблонные порядки
  it('sort перед where', () => {
    // @ts-expect-error
    query(sort("age"), where("name", "John"));
  });

  it('groupBy перед where', () => {
    // @ts-expect-error
    query(groupBy("city"), where("name", "John"));
  });

  it('having перед groupBy', () => {
    // @ts-expect-error
    query(having(g => g.items.length > 1), groupBy("city"));
  });

  it('sort между where и groupBy', () => {
    // @ts-expect-error
    query(where("name", "John"), sort("age"), groupBy("city"));
  });

  it('where после groupBy', () => {
    // @ts-expect-error
    query(groupBy("city"), where("name", "John"));
  });



  it('Пример 1: фильтрация и сортировка', () => {
    const search = query(
      where("name", "John"),
      where("surname", "Doe"),
      sort("age")
    );
    const result = search(users) as any[];
    expect(result).toEqual([
      { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
      { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
      { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
    ]);
  });

  it('Пример 3: комбинированный конвейер', () => {
    const pipeline = query(
      where("surname", "Doe"),
      groupBy("city"),
      having(g => g.items.some((u: any) => u.age > 34))
    );
    const result = pipeline(users) as any[];
    expect(result.length).toBe(1);
    expect(result[0].key).toBe("LA");
  });
});