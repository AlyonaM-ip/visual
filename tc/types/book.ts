// Тип книги из первого API
export interface Book {
  id: number;
  title: string;
  isbn: string;
  pageCount: number;
  authors: string[];
}

// Тип для книги с добавленным изображением (Blob)
export interface BookWithCover extends Book {
  coverBlob: Blob | null;
}

// Ответ от Google Books API
export interface GoogleBooksResponse {
  items?: Array<{
    volumeInfo: {
      imageLinks?: {
        thumbnail: string;
      };
    };
  }>;
}
