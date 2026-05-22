import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    saveStatus: 'сохранено',
  },
  reducers: {
    setSaveStatus: (state, action: PayloadAction<string>) => {
      state.saveStatus = action.payload;
    },
  },
});

export const { setSaveStatus } = uiSlice.actions;
export default uiSlice.reducer;