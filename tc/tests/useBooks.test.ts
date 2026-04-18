import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBooks } from '../hooks/useBooks';

// Мокаем глобальный fetch
global.fetch = vi.fn();

describe('useBooks', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('загружает книги и обложки', async () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', isbn: '1234567890', pageCount: 100, authors: ['Author 1'] }
    ];
    
    // Создаём настоящий Blob для теста
    const mockBlob = new Blob(['test image data'], { type: 'image/jpeg' });

    // Мокаем fetch для книг
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockBooks)
    });

    // Мокаем fetch для обложки (OpenLibrary Covers API)
    (fetch as any).mockResolvedValueOnce({
      headers: {
        get: (header: string) => header === 'content-length' ? '12345' : null
      },
      blob: () => Promise.resolve(mockBlob)
    });

    const { result } = renderHook(() => useBooks());

    expect(result.current.loading).toBe(true);
    expect(result.current.books).toHaveLength(0);

    // Ждём завершения загрузки
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 5000 });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Book 1');
    expect(result.current.books[0].coverBlob).toBeInstanceOf(Blob);
    expect(result.current.books[0].coverBlob).toBe(mockBlob);
  });

  it('обрабатывает ошибку при загрузке книг', async () => {
    // Мокаем ошибку fetch
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 5000 });

    expect(result.current.error).toBe('Network error');
    expect(result.current.books).toHaveLength(0);
  });

  it('устанавливает coverBlob в null если обложка не найдена', async () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', isbn: '1234567890', pageCount: 100, authors: ['Author 1'] }
    ];

    // Мокаем fetch для книг
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockBooks)
    });

    // Мокаем fetch для обложки (заглушка 1x1)
    (fetch as any).mockResolvedValueOnce({
      headers: {
        get: (header: string) => header === 'content-length' ? '43' : null // 43 байта = заглушка
      },
      blob: () => Promise.resolve(new Blob(['placeholder'], { type: 'image/jpeg' }))
    });

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 5000 });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].coverBlob).toBeNull();
  });

  it('загружает несколько книг последовательно', async () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', isbn: '111', pageCount: 100, authors: ['Author 1'] },
      { id: 2, title: 'Book 2', isbn: '222', pageCount: 200, authors: ['Author 2'] }
    ];
    
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' });

    // Мокаем fetch для книг
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockBooks)
    });

    // Мокаем два запроса обложек
    (fetch as any)
      .mockResolvedValueOnce({
        headers: { get: () => '12345' },
        blob: () => Promise.resolve(mockBlob)
      })
      .mockResolvedValueOnce({
        headers: { get: () => '12345' },
        blob: () => Promise.resolve(mockBlob)
      });

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 5000 });

    expect(result.current.books).toHaveLength(2);
    expect(result.current.books[0].coverBlob).toBeInstanceOf(Blob);
    expect(result.current.books[1].coverBlob).toBeInstanceOf(Blob);
  });
});