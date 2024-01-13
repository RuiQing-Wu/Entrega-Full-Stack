const BASE_URL = 'http://localhost:3001/users';

async function updateUser(username, nombre, telefono, ciudad, pais, idUser) {
  const response = await fetch(`${BASE_URL}/${idUser}`, {
    method: 'PATCH',
    headers: {
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

async function getUserById(idUser) {
  const response = await fetch(`${BASE_URL}/${idUser}`);
  const data = await response.json();
  return data;
}

async function getUserByName(username) {
  const response = await fetch(`${BASE_URL}/username/${username}`);
  const data = await response.json();
  return data;
}

export { getUserById, updateUser, getUserByName };
