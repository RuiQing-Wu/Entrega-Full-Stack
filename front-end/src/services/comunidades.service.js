import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/comunidades';

// REGISTRAR COMUNIDAD
async function saveComunidad(
  nombre,
  descripcion,
  fechaInicio,
  idAdministrador,
  categorias,
) {
  const requestBody = {
    nombre,
    descripcion,
    fechaInicio,
    idAdministrador,
    usuarios: [],
    categorias,
  };

  const accessToken = getToken();
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  return response;
}

// RECUPERAR COMUNIDADES
async function getComunidades() {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

// RECUPERAR COMUNIDAD POR ID DE COMUNIDAD
async function getComunidadById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

// RECUPERAR COMUNIDAD POR NOMBRE
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

// RECUPERAR COMUNIDAD POR NOMBRE TOTAL O PARCIAL (CASE INSENSITIVE)
async function getComunidadesByNameInsensitive(busqueda, filtro) {
  const response = await fetch(
    `${BASE_URL}/nameInsensitivePartial/${busqueda}?filtro=${filtro}`,
  );

  return response;
}

// RECUPERAR COMUNIDAD POR CATEGORIA TOTAL O PARCIAL (CASE INSENSITIVE)
async function getComunidadesByCategoryInsensitive(busqueda, filtro) {
  const response = await fetch(
    `${BASE_URL}/categoryInsensitivePartial/${busqueda}?filtro=${filtro}`,
  );

  return response;
}

// RECUPERAR COMUNIDAD POR AÑO
async function getComunidadesByYear(year) {
  const response = await fetch(`${BASE_URL}/year/${year}`);
  if (!response.ok) {
    throw new Error(
      'No se encontraron comunidades que coincidan con la búsqueda.',
    );
  }

  return response;
}

// RECUPERAR COMUNIDADES POR ID DE USUARIO
async function getComunidadesByUser(idUsuario) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/user/${idUsuario}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(
      'No se encontraron comunidades que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

// AGREGAR MIEMBRO A COMUNIDAD
async function addMember(idUsuario, idComunidad) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/${idComunidad}/${idUsuario}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idUsuario }),
  });

  if (response.status !== 200) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

// ELIMINAR MIEMBRO DE LA COMUNIDAD
async function removeMember(idUsuario, idComunidad) {
  const accessToken = getToken();
  const response = await fetch(`${BASE_URL}/${idComunidad}/${idUsuario}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

export {
  saveComunidad,
  getComunidades,
  getComunidadById,
  getComunidadByName,
  getComunidadesByNameInsensitive,
  getComunidadesByCategoryInsensitive,
  getComunidadesByYear,
  getComunidadesByUser,
  addMember,
  removeMember,
};
