import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/users';

// OBTENER USUARIO POR ID
async function getUserById(idUser) {
  const response = await fetch(`${BASE_URL}/${idUser}`);
  const data = await response.json();
  return data;
}

// OBTENER USUARIO POR NOMBRE
async function getUserByName(username) {
  const response = await fetch(`${BASE_URL}/username/${username}`);
  return response;
  /* const data = await response.json();
  return data; */
}

// ACTUALIZAR USUARIO
async function updateUser(username, nombre, telefono, ciudad, pais, idUser) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/${idUser}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      nombre,
      telefono,
      ciudad,
      pais,
    }),
  });

  const data = await response.json();
  return data;
}

export { getUserById, getUserByName, updateUser };
