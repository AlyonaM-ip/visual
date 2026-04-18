import React, { useState, useEffect } from 'react';

interface BookCardProps {
  title: string;
  authors: string[];
  coverBlob: Blob | null;
}

export const BookCard: React.FC<BookCardProps> = ({ title, authors, coverBlob }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    if (coverBlob) {
      const url = URL.createObjectURL(coverBlob);
      setCoverUrl(url);
      
      // Очистка при размонтировании
      return () => URL.revokeObjectURL(url);
    }
  }, [coverBlob]);

  return (
    <div style={styles.card}>
      <div style={styles.coverContainer}>
        {coverUrl ? (
          <img src={coverUrl} alt={title} style={styles.cover} />
        ) : (
          <div style={styles.placeholder}>Нет обложки</div>
        )}
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.authors}>{authors.join(', ')}</p>
    </div>
  );
};

// Стили прямо в компоненте (можно вынести в отдельный CSS файл)
const styles: Record<string, React.CSSProperties> = {
  card: {
    width: '200px',
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  coverContainer: {
    width: '100%',
    height: '250px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  cover: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  placeholder: {
    color: '#999',
    fontSize: '14px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    textAlign: 'center',
    lineHeight: '1.3',
  },
  authors: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
    textAlign: 'center',
    lineHeight: '1.4',
  },
};
