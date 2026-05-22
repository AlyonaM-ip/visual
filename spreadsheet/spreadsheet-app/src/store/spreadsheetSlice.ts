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

const spreadsheetSlice = createSlice({
  name: 'spreadsheet',
  initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<{
      row: number;
      col: number;
      value: string | number | boolean | null;
      formula: string;
    }>) => {
      const { row, col, value, formula } = action.payload;
      const key = row + ',' + col;
      if (value === null && formula === '') {
        delete state.cells[key];
      } else {
        state.cells[key] = { value, formula };
      }
    },
    addRow: (state) => {
      state.rowCount += 1;
    },
    deleteRow: (state) => {
      if (state.rowCount > 1) state.rowCount -= 1;
    },
    addColumn: (state) => {
      state.colCount += 1;
    },
    deleteColumn: (state) => {
      if (state.colCount > 1) state.colCount -= 1;
    },
    loadCells: (state, action: PayloadAction<Record<string, CellData>>) => {
      state.cells = action.payload;
    },
  },
});