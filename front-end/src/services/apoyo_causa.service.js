import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/apoyo';

async function apoyarCausa(idComunidad, idCausa) {
  const accessToken = getToken();
  const url = `${BASE_URL}/${idComunidad}/${idCausa}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

async function getApoyoCausa(idComunidad, idCausa) {
  const accessToken = getToken();
  const url = `${BASE_URL}/${idComunidad}/${idCausa}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

async function deleteApoyoCausa(idComunidad, idCausa) {
  const accessToken = getToken();
  const url = `${BASE_URL}/${idComunidad}/${idCausa}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 201) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

export { apoyarCausa, getApoyoCausa, deleteApoyoCausa };
