import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  rowCount: number;
  colCount: number;
}

interface DocumentsState {
  list: Document[];
  activeId: string | null;
}

const initialState: DocumentsState = {
  list: [],
  activeId: null,
};