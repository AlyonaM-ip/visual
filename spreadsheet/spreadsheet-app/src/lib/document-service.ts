import type { CellValue } from './spreadsheet-main';

export interface Document {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  rowCount: number;
  colCount: number;
}

type CellSaveData = { value: CellValue; formula: string; bold: boolean; italic: boolean; underline: boolean; align: 'left' | 'center' | 'right'; textColor: string; bgColor: string };

const DOCS_KEY = 'spreadsheet-docs';

function readAll(): Document[] {
  const raw = localStorage.getItem(DOCS_KEY);
  if (!raw) return [];
  return JSON.parse(raw);
}

function saveAll(docs: Document[]): void {
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function loadDocuments(): Document[] {
  return readAll();
}

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

export function renameDocument(id: string, name: string): void {
  const docs = readAll();
  const doc = docs.find((d) => d.id === id);
  if (doc) {
    doc.name = name;
    doc.updatedAt = new Date().toISOString();
    saveAll(docs);
  }
}

export function deleteDocument(id: string): void {
  const docs = readAll();
  const filtered = docs.filter((d) => d.id !== id);
  saveAll(filtered);
}

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

function cellsKey(id: string): string {
  return 'spreadsheet-cells-' + id;
}

export function saveCells(id: string, cells: Record<string, CellSaveData>): void {
  localStorage.setItem(cellsKey(id), JSON.stringify(cells));
}

export function loadCells(id: string): Record<string, CellSaveData> {
  const raw = localStorage.getItem(cellsKey(id));
  if (!raw) return {};
  return JSON.parse(raw);
}