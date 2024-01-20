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

  return response;
}

export default createApoyoRegistro;
