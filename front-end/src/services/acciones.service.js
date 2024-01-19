import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/acciones';

// REGISTRAR ACCIÓN
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

// RECUPERAR ACCIONES ---------- SIN USO
async function getAcciones() {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('No se encontraron acciones.');
  }

  const data = await response.json();
  return data;
}

// RECUPERAR ACCIÓN POR ID DE ACCIÓN
async function getAccionById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con el id especificado.',
    );
  }

  const data = await response.json();
  return data;
}

// RECUPERAR ACCIÓN POR NOMBRE DE ACCIÓN
async function getAccionByName(nombre) {

  const response = await fetch(`${BASE_URL}/name/${nombre}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con el nombre especificado.',
    );
  }

  const data = await response.json();
  return data;
}

// RECUPERAR ACCIÓN POR CADENA COINCIDENTE PARCIAL O TOTALMENTE CON NOMBRE DE ACCIÓN
async function getAccionesByNameInsensitive(titulo, idCausa) {

  const response = await fetch(
    `${BASE_URL}/nameInsensitivePartial/${titulo}/${idCausa}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con el nombre especificado.',
    );
  }

  const data = await response.json();
  return data;
}

// RECUPERAR ACCIONES POR ID DE CAUSA
async function getAccionesByCausaId(idCausa) {

  const response = await fetch(`${BASE_URL}/causa/${idCausa}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // alert('No se encontraron acciones pertenecientes a la causa especificada.');
  }

  const data = await response.json();
  return data;
}

export {
  saveAccion,
  getAcciones,
  getAccionById,
  getAccionByName,
  getAccionesByNameInsensitive,
  getAccionesByCausaId,
};
