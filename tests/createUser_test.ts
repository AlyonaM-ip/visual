import { describe, it, expect } from 'vitest';
import { createUser } from '../tc/lab1.js';
import type { User } from '../tc/lab1';

describe('createUser', () => {
  it('should create user with all parameters', () => {
    const user = createUser(1, 'John Doe', 'john@example.com', true) as User;
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      isActive: true
    });
  });

  it('should set isActive to true by default', () => {
    const user = createUser(2, 'Jane Doe', 'jane@example.com') as User;
    expect(user.isActive).toBe(true);
  });

  it('should allow setting isActive to false', () => {
    const user = createUser(3, 'Bob Wilson', 'bob@example.com', false) as User;
    expect(user.isActive).toBe(false);
  });

  it('should allow undefined email', () => {
    const user = createUser(4, 'Alice Brown', undefined) as User;
    expect(user.email).toBeUndefined();
  });

  it('should work with cyrillic names', () => {
    const user = createUser(5, 'Анна Иванова', 'anna@mail.ru') as User;
    expect(user.name).toBe('Анна Иванова');
    expect(user.email).toBe('anna@mail.ru');
  });

  it('should create user without email', () => {
    const user = createUser(6, 'Peter Pan') as User;
    expect(user.id).toBe(6);
    expect(user.name).toBe('Peter Pan');
    expect(user.email).toBeUndefined();
    expect(user.isActive).toBe(true);
  });

  it('should handle edge cases with empty name', () => {
    const user = createUser(7, '') as User;
    expect(user.name).toBe('');
    expect(user.isActive).toBe(true);
  });
});