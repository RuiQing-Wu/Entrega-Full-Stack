export const TOKEN = 'token';

function getToken() {
  return localStorage.getItem(TOKEN);
}

function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

function removeToken() {
  localStorage.removeItem(TOKEN);
}

export { getToken, setToken, removeToken };
