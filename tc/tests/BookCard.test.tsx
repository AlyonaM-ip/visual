import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookCard } from '../components/BookCard';

// Мок для URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('BookCard', () => {
  it('отображает название и авторов', () => {
    const mockBlob = new Blob(['test'], { type: 'image/png' });
    
    render(
      <BookCard
        title="Тестовая книга"
        authors={['Автор Один', 'Автор Два']}
        coverBlob={mockBlob}
      />
    );
    
    expect(screen.getByText('Тестовая книга')).toBeDefined();
    expect(screen.getByText('Автор Один, Автор Два')).toBeDefined();
  });

  it('показывает заглушку если нет обложки', () => {
    render(
      <BookCard
        title="Книга без обложки"
        authors={['Автор']}
        coverBlob={null}
      />
    );
    
    expect(screen.getByText('Нет обложки')).toBeDefined();
  });

  it('название имеет больший шрифт чем авторы', () => {
    const { container } = render(
      <BookCard
        title="Тест"
        authors={['Автор']}
        coverBlob={null}
      />
    );
    
    const title = container.querySelector('h3');
    const authors = container.querySelector('p');
    
    const titleFontSize = window.getComputedStyle(title!).fontSize;
    const authorsFontSize = window.getComputedStyle(authors!).fontSize;
    
    expect(parseFloat(titleFontSize)).toBeGreaterThan(parseFloat(authorsFontSize));
  });
});