import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '../../utils/utils';

const userStore = createSlice({
  name: 'user',
  initialState: {
    // Datos compartidos entre todos los componentes
    token: getToken() || '',
  },
  reducers: {
    // Funciones que modifican el estado
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

const { setToken } = userStore.actions;

const userReducer = userStore.reducer;

export { setToken };

export default userReducer;
