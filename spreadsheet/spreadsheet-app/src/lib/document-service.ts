import type { CellValue } from './spreadsheet-main';

//тип документа
export interface Document {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  rowCount: number;
  colCount: number;
}

//тип сохраняемой ячейки
type CellSaveData = { value: CellValue; formula: string; bold: boolean; italic: boolean; underline: boolean };

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

//создать документ
export function createDocument(name: string, rowCount: number, colCount: number): Document {
  const docs = readAll();
  const doc: Document = {
    id: newId(),
    name: name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rowCount: rowCount,
    colCount: colCount,
  };
  docs.push(doc);
  saveAll(docs);
  return doc;
}

//переименовать
export function renameDocument(id: string, name: string): void {
  const docs = readAll();
  const doc = docs.find((d) => d.id === id);
  if (doc) {
    doc.name = name;
    doc.updatedAt = new Date().toISOString();
    saveAll(docs);
  }
}

//удалить
export function deleteDocument(id: string): void {
  const docs = readAll();
  const filtered = docs.filter((d) => d.id !== id);
  saveAll(filtered);
}

//дублировать
export function duplicateDocument(id: string): Document | null {
  const docs = readAll();
  const original = docs.find((d) => d.id === id);
  if (!original) return null;
  const copy: Document = {
    id: newId(),
    name: original.name + ' (копия)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rowCount: original.rowCount,
    colCount: original.colCount,
  };
  docs.push(copy);
  saveAll(docs);
  return copy;
}

//ключ для ячеек
function cellsKey(id: string): string {
  return 'spreadsheet-cells-' + id;
}

//сохранить ячейки документа
export function saveCells(id: string, cells: Record<string, CellSaveData>): void {
  localStorage.setItem(cellsKey(id), JSON.stringify(cells));
}

//загрузить ячейки документа
export function loadCells(id: string): Record<string, CellSaveData> {
  const raw = localStorage.getItem(cellsKey(id));
  if (!raw) return {};
  return JSON.parse(raw);
}