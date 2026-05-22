//тип документа
export interface Document {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  rowCount: number;
  colCount: number;
}

//ключ для localStorage
const DOCS_KEY = 'spreadsheet-docs';

//прочитать все документы
function readAll(): Document[] {
  const raw = localStorage.getItem(DOCS_KEY);
  if (!raw) return [];
  return JSON.parse(raw);
}

//сохранить все документы
function saveAll(docs: Document[]): void {
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

//сгенерировать id
function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

//загрузить все документы
export function loadDocuments(): Document[] {
  return readAll();
}