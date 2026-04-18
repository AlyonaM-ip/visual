import React from 'react';
import { useBooks } from './hooks/useBooks';
import { BookCard } from './components/BookCard';
import './index.css';

export const App: React.FC = () => {
  const { books, loading, error } = useBooks();

  if (loading) {
    return <div className="loader">Загрузка книг...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="app">
      <h1 className="app-title">Каталог книг</h1>
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            authors={book.authors}
            coverBlob={book.coverBlob}
          />
        ))}
      </div>
    </div>
  );
};

