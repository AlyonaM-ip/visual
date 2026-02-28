import { describe, it, expect } from 'vitest';
import { createBook } from '../tc/lab1.js';
import type { Book, Genre } from '../tc/lab1';

describe('createBook', () => {
  it('should create a book with all properties', () => {
    const book = {
      title: 'Test Book',
      author: 'Test Author',
      year: 2024,
      genre: 'fiction' as Genre,
      rating: 4.5
    };
    
    const result = createBook(book);
    expect(result).toEqual(book);
  });

  it('should create a book without optional year and rating', () => {
    const book = {
      title: 'Minimal Book',
      author: 'Minimal Author',
      genre: 'science' as Genre
    };
    
    const result = createBook(book);
    expect(result.title).toBe('Minimal Book');
    expect(result.author).toBe('Minimal Author');
    expect(result.genre).toBe('science');
    expect(result.year).toBeUndefined();
    expect(result.rating).toBeUndefined();
  });

  it('should create fantasy genre book', () => {
    const book = {
      title: 'Fantasy Book',
      author: 'Fantasy Author',
      genre: 'fantasy' as Genre,
      rating: 4.9
    };
    
    const result = createBook(book);
    expect(result.genre).toBe('fantasy');
    expect(result.rating).toBe(4.9);
  });

  it('should create non-fiction genre book', () => {
    const book = {
      title: 'Science Book',
      author: 'Science Author',
      genre: 'non-fiction' as Genre,
      year: 2023
    };
    
    const result = createBook(book);
    expect(result.genre).toBe('non-fiction');
    expect(result.year).toBe(2023);
  });

  it('should preserve all properties exactly as provided', () => {
    const book = {
      title: 'Гарри Поттер',
      author: 'Дж.К. Роулинг',
      year: 1997,
      genre: 'fantasy' as Genre,
      rating: 4.8
    };
    
    const result = createBook(book);
    expect(result).toEqual({
      title: 'Гарри Поттер',
      author: 'Дж.К. Роулинг',
      year: 1997,
      genre: 'fantasy',
      rating: 4.8
    });
  });

  it('should handle all genre types', () => {
    const genres: Genre[] = ['fiction', 'non-fiction', 'historical', 'fantasy'];
    
    genres.forEach(genre => {
      const book = {
        title: 'Test Book',
        author: 'Test Author',
        genre: genre
      };
      const result = createBook(book);
      expect(result.genre).toBe(genre);
    });
  });
});