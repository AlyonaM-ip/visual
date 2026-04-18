import { useState, useEffect } from 'react';
import type { Book, BookWithCover } from '../types/book';

const BOOKS_API_URL = 'https://fakeapi.extendsclass.com/books';

// Задержка между запросами (на всякий случай)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Загружаем обложку через OpenLibrary Covers API (нет лимитов!)
async function fetchCoverAsBlob(isbn: string): Promise<Blob | null> {
  try {
    // OpenLibrary Covers API — домен .org, работает без VPN и без лимитов
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    
    const response = await fetch(coverUrl);
    
    // Если обложка не найдена, OpenLibrary возвращает прозрачный 1x1 пиксель
    // Определяем по заголовку content-length (обычно 43 байта для заглушки)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) <= 100) {
      return null; // Заглушка — считаем что обложки нет
    }
    
    return await response.blob();
  } catch (error) {
    console.error(`Failed to fetch cover for ISBN ${isbn}:`, error);
    return null;
  }
}

export function useBooks() {
  const [books, setBooks] = useState<BookWithCover[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Получаем список книг
        const booksResponse = await fetch(BOOKS_API_URL);
        const booksData: Book[] = await booksResponse.json();
        
        // 2. Для каждой книги загружаем обложку (с небольшой задержкой)
        const booksWithCovers: BookWithCover[] = [];
        
        for (const book of booksData) {
          await delay(200); // Задержка 200ms между запросами
          const coverBlob = await fetchCoverAsBlob(book.isbn);
          booksWithCovers.push({ ...book, coverBlob });
        }
        
        setBooks(booksWithCovers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    
    loadBooks();
  }, []);

  return { books, loading, error };
}