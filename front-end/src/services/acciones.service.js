import { getToken } from '../utils/utils';

const BASE_URL = 'http://localhost:3001/acciones';

// REGISTRAR ACCIÓN
async function saveAccion(
  titulo,
  descripcion,
  listaObjetivos,
  tipo,
  totalObjetivo,
  progreso,
  causa,
) {
  const accessToken = getToken();
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
      tipo,
      totalObjetivo,
      progreso,
      causa,
    }),
  });

  return response;
}

// RECUPERAR ACCIONES ---------- SIN USO
async function getAcciones() {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

// RECUPERAR ACCIÓN POR ID DE ACCIÓN
async function getAccionById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

// RECUPERAR ACCIÓN POR NOMBRE DE ACCIÓN
async function getAccionByName(nombre) {
  const response = await fetch(`${BASE_URL}/name/${nombre}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
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

  return response;
}

// RECUPERAR ACCIONES POR ID DE CAUSA
async function getAccionesByCausaId(idCausa) {
  const response = await fetch(`${BASE_URL}/causa/${idCausa}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

async function actualizarProgresoAccion(idAccion, progreso) {
  const accessToken = getToken();
  const accion = await getAccionById(idAccion);

  const accionJson = await accion.json();

  const progresoActual = accionJson.progreso;
  const progresoNuevo = progresoActual + progreso;

  const response = await fetch(`${BASE_URL}/${idAccion}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ progreso: progresoNuevo }),
  });

  return response;
}

export {
  saveAccion,
  getAcciones,
  getAccionById,
  getAccionByName,
  getAccionesByNameInsensitive,
  getAccionesByCausaId,
  actualizarProgresoAccion,
};
