export const TOKEN = 'token';
export const USER_INFO = 'userInfo';
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_CONFLICT = 409;
export const HTTP_STATUS_SERVER_ERROR = 500;

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

function checkResponseStatusCode(response) {
  if (
    response.status !== HTTP_STATUS_OK &&
    response.status !== HTTP_STATUS_CREATED
  ) {
    return false;
  }

  return true;
}

function checkPageToNavigate(response) {
  if (response.status === HTTP_STATUS_UNAUTHORIZED) {
    return '/login';
  }

  return '/error';
}

async function alertErrorMessage(response) {
  const data = await response.json();
  // eslint-disable-next-line no-alert
  alert(data.message);
}

export {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  dateToString,
  refactorDate,
  checkResponseStatusCode,
  checkPageToNavigate,
  alertErrorMessage,
};
