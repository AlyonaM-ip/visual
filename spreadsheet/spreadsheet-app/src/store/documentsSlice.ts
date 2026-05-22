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

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Document[]>) => {
      state.list = action.payload;
    },
    setActive: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload;
    },
    addDoc: (state, action: PayloadAction<Document>) => {
      state.list.push(action.payload);
    },
    removeDoc: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((d) => d.id !== action.payload);
    },
    renameDoc: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const doc = state.list.find((d) => d.id === action.payload.id);
      if (doc) {
        doc.name = action.payload.name;
        doc.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { setList, setActive, addDoc, removeDoc, renameDoc } = documentsSlice.actions;
export default documentsSlice.reducer;