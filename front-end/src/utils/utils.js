export const TOKEN = 'token';
export const USER_INFO = 'userInfo';

function getToken() {
  return localStorage.getItem(TOKEN);
}

function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

function removeToken() {
  localStorage.removeItem(TOKEN);
}


function getUserInfo() {
  return localStorage.getItem(USER_INFO);
}

function setUserInfo(userInfo) {
  localStorage.setItem(USER_INFO, userInfo);
}

function removeUserInfo() {
  localStorage.removeItem(USER_INFO);
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

export { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo, dateToString, refactorDate };
