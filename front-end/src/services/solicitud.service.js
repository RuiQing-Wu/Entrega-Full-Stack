import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/solicitud';

async function createSolicitud(
  descripcion,
  fechaSolicitud,
  estado,
  idUsuario,
  idComunidad,
) {
  const accessToken = getToken();
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      descripcion,
      fechaSolicitud,
      estado,
      idUsuario,
      idComunidad,
    }),
  });

  if (response.status !== 201) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

async function getSolicitudById(id) {
  /* const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // eslint-disable-next-line no-console
    console.log('No existe la solicitud');
    return undefined;
  }

  const data = await response.json();
  return data; */
}

export { createSolicitud, getSolicitudById };
