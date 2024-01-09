import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/comunidades';

async function saveComunidad(nombre, descripcion, fechaInicio) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, descripcion, fechaInicio }),
  });

  if (response.status !== 201) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

async function getComunidadById(id) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // eslint-disable-next-line no-console
    console.log('No existe la comunidad');
    return undefined;
  }

  const data = await response.json();
  return data;
}

async function getComunidades() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
}

async function getComunidadesByNameInsensitive(nombre) {
  const response = await fetch(`${BASE_URL}/nameInsensitivePartial/${nombre}`);
  if (!response.ok) {
    throw new Error(
      'No se encontraron comunidades que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

async function getComunidadByName(nombre) {
  const response = await fetch(`${BASE_URL}/name/${nombre}`);
  if (!response.ok) {
    throw new Error(
      'No se encontraron comunidades que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

export {
  saveComunidad,
  getComunidadById,
  getComunidades,
  getComunidadByName,
  getComunidadesByNameInsensitive,
};
