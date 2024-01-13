import { createSlice } from '@reduxjs/toolkit';
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
} from '../../utils/utils';

const userStore = createSlice({
  name: 'user',
  initialState: {
    // Datos compartidos entre todos los componentes
    token: getToken() || '',
    userInfo: getUserInfo() || '',
  },
  reducers: {
    // Funciones que modifican el estado
    setTokenRedux(state, action) {
      // eslint-disable-next-line no-console
      // console.log(`setToken de Login: ${action.payload}`);
      state.token = action.payload;

      // Guardar el token en localStorage
      setToken(action.payload);
    },

    removeTokenRedux(state) {
      state.token = '';

      // Eliminar el token de localStorage
      removeToken();
    },

    setUserInfoRedux(state, action) {
      // eslint-disable-next-line no-console
      // console.log('setUserInfo ', action.payload);
      state.userInfo = action.payload;

      setUserInfo(action.payload);
    },

    removeUserInfoRedux(state) {
      state.userInfo = '';

      removeUserInfo();
    },
  },
});

// Cada case reducer funtion have his own Action creators
const {
  setTokenRedux,
  removeTokenRedux,
  setUserInfoRedux,
  removeUserInfoRedux,
} = userStore.actions;

const userReducer = userStore.reducer;

export {
  setTokenRedux,
  removeTokenRedux,
  setUserInfoRedux,
  removeUserInfoRedux,
};

export default userReducer;
