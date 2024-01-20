import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/seguidor';

async function registrarUsuarioSeguimiento(username, idUsuario) {
  // Construye un objeto con las propiedades 'username' e 'idUsuario'
  const requestBody = {
    username,
    idUsuario,
  };

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody), // Usa JSON.stringify con un solo argumento
  });

  if (response.status !== 201) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

async function seguirUsuario(
  idUsuarioOrigen,
  usernameOrigen,
  idUsuarioDestino,
  usernameDestino,
) {
  const accessToken = getToken();
  const resultArray = [
    { idUsuario: idUsuarioOrigen, username: usernameOrigen },
    { idUsuario: idUsuarioDestino, username: usernameDestino },
  ];

  const response = await fetch(`${BASE_URL}/seguir`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resultArray),
  });
}

async function getSeguidosByUser(idUsuario) {
  const accessToken = getToken();
  const response = await fetch(
    `${BASE_URL}/seguidos/${idUsuario}`,

    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  return data;
}

async function getSeguidoresByUser(idUsuario) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/seguidores/${idUsuario}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export {
  registrarUsuarioSeguimiento,
  seguirUsuario,
  getSeguidosByUser,
  getSeguidoresByUser,
};
