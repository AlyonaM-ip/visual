import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CellData {
  value: string | number | boolean | null;
  formula: string;
}

interface SpreadsheetState {
  cells: Record<string, CellData>;
  rowCount: number;
  colCount: number;
}

const initialState: SpreadsheetState = {
  cells: {},
  rowCount: 100,
  colCount: 26,
};