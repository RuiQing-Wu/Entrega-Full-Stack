import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/apoyo-registro';

async function createApoyoRegistro(idCausa, nombre, correo) {
  const accessToken = getToken();
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify({
      idCausa,
      nombre,
      correo,
    }),
  });

  if (response.status !== 201) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

async function getApoyoRegistroById(id) {
  // TODO: no se neceista nunca no?
}

export { createApoyoRegistro, getApoyoRegistroById };
