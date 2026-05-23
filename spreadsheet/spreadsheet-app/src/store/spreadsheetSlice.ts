import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CellData {
  value: string | number | boolean | null;
  formula: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
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
      bold: boolean;
      italic: boolean;
      underline: boolean;
    }>) => {
      const { row, col, value, formula, bold, italic, underline } = action.payload;
      const key = row + ',' + col;
      if (value === null && formula === '') {
        delete state.cells[key];
      } else {
        state.cells[key] = { value, formula, bold, italic, underline };
      }
    },
    toggleBold: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const key = action.payload.row + ',' + action.payload.col;
      if (state.cells[key]) {
        state.cells[key].bold = !state.cells[key].bold;
      }
    },
    toggleItalic: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const key = action.payload.row + ',' + action.payload.col;
      if (state.cells[key]) {
        state.cells[key].italic = !state.cells[key].italic;
      }
    },
    toggleUnderline: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const key = action.payload.row + ',' + action.payload.col;
      if (state.cells[key]) {
        state.cells[key].underline = !state.cells[key].underline;
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

export const { updateCell, toggleBold, toggleItalic, toggleUnderline, addRow, deleteRow, addColumn, deleteColumn, loadCells } = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;