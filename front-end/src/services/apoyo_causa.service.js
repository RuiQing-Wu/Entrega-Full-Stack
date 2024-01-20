import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/apoyo-causa';

// REGISTRAR APOYO A CAUSA
async function createApoyo(idCausa) {
  const accessToken = getToken();
  const url = `${BASE_URL}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idCausa,
      numApoyo: 0,
    }),
  });

  return response;
  /* if (response.status !== 201) {
    return undefined;
  }

  const data = await response.json();
  return data; */
}

// OBTENER APOYO A CAUSA POR ID
async function getApoyoCausa(idCausa) {
  const url = `${BASE_URL}/${idCausa}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
  /* const data = await response.json();
  return data; */
}

// APOYAR CAUSA
async function apoyarCausa(idCausa) {
  const url = `${BASE_URL}/apoyar/${idCausa}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    return undefined;
  }

  const responseText = await response.text();

  const data = JSON.parse(responseText);

  return data;
}

export { apoyarCausa, getApoyoCausa, createApoyo };
