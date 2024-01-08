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

function dateToString() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formattedDate;
}

function refactorDate(fecha) {
  const currentDate = new Date(fecha);
  const formattedDate = currentDate.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formattedDate;
}

export { getToken, setToken, removeToken, dateToString, refactorDate };
