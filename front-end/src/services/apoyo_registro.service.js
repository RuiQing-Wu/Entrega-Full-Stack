const BASE_URL = 'http://localhost:3001/apoyoregistro';

async function createApoyoRegistro(idCausa, nombre, correo) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  // TODO
}

export { createApoyoRegistro, getApoyoRegistroById };
