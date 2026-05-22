import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { id: '1', name: 'Я', email: 'ya@mail.ru' },
  },
  reducers: {},
});

export default authSlice.reducer;