import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/acciones';

async function saveAccion(
  titulo,
  descripcion,
  listaObjetivos,
  progreso,
  idCausa,
) {
  const accessToken = getToken();
  const causa = idCausa;
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo,
      descripcion,
      listaObjetivos,
      progreso,
      causa,
    }),
  });
  const data = await response.json();
  return data;
}

async function getAcciones() {
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

async function getAccionById(id) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

async function getAccionByName(nombre) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/name/${nombre}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

async function getAccionesByCausaId(idCausa) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/causa/${idCausa}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function getAccionesByNameInsensitive(titulo, idCausa) {
  const accessToken = getToken();
  const response = await fetch(
    `${BASE_URL}/nameInsensitivePartial/${titulo}/${idCausa}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

export {
  saveAccion,
  getAcciones,
  getAccionById,
  getAccionByName,
  getAccionesByCausaId,
  getAccionesByNameInsensitive,
};
