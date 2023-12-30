const API_URL = 'http://localhost:3001/user';

async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
}

async function registerUser(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
}

async function saveComunidad(nombre, descripcion, fechaInicio) {
  const response = await fetch('http://localhost:3001/comunidades', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, descripcion, fechaInicio }),
  });

  const data = await response.json();
  return data;
}

async function getComunidades() {
  const response = await fetch('http://localhost:3001/comunidades');
  const data = await response.json();
  return data;
}

export { login, registerUser, saveComunidad, getComunidades };
