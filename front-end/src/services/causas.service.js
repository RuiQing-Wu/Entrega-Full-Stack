import { createApoyo } from './apoyo_causa.service';
import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/causas';

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

  const data = await response.json();
  const crearApoyo = await createApoyo(data.id);
  if (crearApoyo === undefined) {
    throw new Error('No se pudo crear el apoyo');
  }
  return data;
}

async function getCausas() {
  const accessToken = getToken();
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function getCausaById(id) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function getCausasByName(name) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/name/${name}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function getCausasByComunityId(idComunidad) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/comunidad/${idComunidad}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function getCausasByNameInsensitive(titulo, idComunidad) {
  const accessToken = getToken();
  const response = await fetch(
    `${BASE_URL}/nameInsensitivePartial/${titulo}/${idComunidad}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

export {
  saveCausa,
  getCausas,
  getCausaById,
  getCausasByName,
  getCausasByComunityId,
  getCausasByNameInsensitive,
};
