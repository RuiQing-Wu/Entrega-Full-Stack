import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/solicitud';

// REGISTRAR SOLICITUD
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

// OBTENER SOLICITUDES
async function getSolicitud() {

  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export { createSolicitud, getSolicitud };
