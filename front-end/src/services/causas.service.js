import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/causas';

// REGISTRAR CAUSA
async function saveCausa(
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  idComunidad,
  objetivos,
) {
  const accessToken = getToken();
  const comunidad = idComunidad;
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
      accionSolidaria: [],
      comunidad,
      objetivos,
    }),
  });

  return response;
}

// OBTENER CAUSAS
async function getCausas() {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

// OBTENER CAUSA POR ID
async function getCausaById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
  /* const data = await response.json();
  return data; */
}

// OBTENER CAUSA POR NOMBRE
async function getCausasByName(name) {
  const response = await fetch(`${BASE_URL}/name/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

// OBTENER CAUSA POR NOMBRE TOTAL O PARCIAL (CASE INSENSITIVE)
async function getCausasByNameInsensitive(titulo, idComunidad) {
  const response = await fetch(
    `${BASE_URL}/nameInsensitivePartial/${titulo}/${idComunidad}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error('No se encontraron causas que coincidan con la búsqueda.');
  }

  const data = await response.json();
  return data;
}

// OBTENER CAUSAS POR ID DE COMUNIDAD
async function getCausasByComunityId(idComunidad) {
  const response = await fetch(`${BASE_URL}/comunidad/${idComunidad}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export {
  saveCausa,
  getCausas,
  getCausaById,
  getCausasByName,
  getCausasByNameInsensitive,
  getCausasByComunityId,
};
