import { createSlice } from '@reduxjs/toolkit';
import { getToken, setToken, removeToken } from '../../utils/utils';

const userStore = createSlice({
  name: 'user',
  initialState: {
    // Datos compartidos entre todos los componentes
    token: getToken() || '',
  },
  reducers: {
    // Funciones que modifican el estado
    setTokenRedux(state, action) {
      state.token = action.payload;

      // Guardar el token en localStorage
      setToken(action.payload);
    },

    removeTokenRedux(state) {
      state.token = '';

      // Eliminar el token de localStorage
      removeToken();
    },
  },
});

// Cada case reducer funtion have his own Action creators
const { setTokenRedux, removeTokenRedux } = userStore.actions;

const userReducer = userStore.reducer;

export { setTokenRedux, removeTokenRedux };

export default userReducer;
