import { configureStore } from '@reduxjs/toolkit';
import spreadsheetReducer from './spreadsheetSlice';
import documentsReducer from './documentsSlice';
import uiReducer from './uiSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    spreadsheet: spreadsheetReducer,
    documents: documentsReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});