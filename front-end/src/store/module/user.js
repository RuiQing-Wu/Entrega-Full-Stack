import { createSlice } from '@reduxjs/toolkit';
import { getToken, setToken, removeToken } from '../../utils/utils';

const userStore = createSlice({
  name: 'user',
  initialState: {
    // Datos compartidos entre todos los componentes
    token: getToken() || '',
    userInfo: '',
  },
  reducers: {
    // Funciones que modifican el estado
    setTokenRedux(state, action) {
      // eslint-disable-next-line no-console
      console.log(`setToken de Login: ${action.payload}`);
      state.token = action.payload;

      // Guardar el token en localStorage
      setToken(action.payload);
    },

    removeTokenRedux(state) {
      state.token = '';

      // Eliminar el token de localStorage
      removeToken();
    },

    setUserInfo(state, action) {
      // eslint-disable-next-line no-console
      console.log('setUserInfo ', action.payload);
      state.userInfo = action.payload;
    },

    removeUserInfo(state) {
      state.userInfo = '';
    },
  },
});

// Cada case reducer funtion have his own Action creators
const { setTokenRedux, removeTokenRedux, setUserInfo, removeUserInfo } =
  userStore.actions;

const userReducer = userStore.reducer;

export { setTokenRedux, removeTokenRedux, setUserInfo, removeUserInfo };

export default userReducer;
