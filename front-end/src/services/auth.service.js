import { setUserInfo } from '../store/module/user';
import { getToken } from '../utils/utils';

const API_URL = 'http://localhost:3001/auth';

async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 401) {
    // eslint-disable-next-line no-console
    // console.log('Usuario o contraseña incorrectos');
    return { access_token: undefined };
  }

  const data = await response.json();
  return data;
}

async function registerUser(username, password) {
  // eslint-disable-next-line prettier/prettier, no-console
  // console.log('Llmando a la API');

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

async function getProfile() {
  const accessToken = getToken();
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    return { username: undefined };
  }

  const data = await response.json();
  return data;
}

function getProfileThunk() {
  return async function fetchTodoByIdThunk(dispatch, getState) {
    const response = await getProfile();
    // eslint-disable-next-line no-console
    // console.log('RESPONSE ', response);

    if (response.username === undefined) {
      return;
    }

    dispatch(setUserInfo(response));
  };
}

export { login, registerUser, getProfileThunk };
