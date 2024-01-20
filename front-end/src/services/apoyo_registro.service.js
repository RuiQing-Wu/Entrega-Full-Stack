import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/apoyo-registro';

async function createApoyoRegistro(idCausa, nombre, correo) {
  const requestBody = {
    idCausa,
    nombre,
    correo,
  };

  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(requestBody),
  });

  if (response.status !== 201) {
    return response;
  }

  const data = await response.json();
  return data;
}

async function getApoyoRegistroById(id) {
  // TODO: no se neceista nunca no?
}

export { createApoyoRegistro, getApoyoRegistroById };
