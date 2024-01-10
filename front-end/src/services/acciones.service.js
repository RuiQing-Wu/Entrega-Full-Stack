const BASE_URL = 'http://localhost:3001/acciones';

async function saveAccion(
  titulo,
  descripcion,
  listaObjetivos,
  progreso,
  idCausa,
) {
  const causa = idCausa;
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
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
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
}

async function getAccionById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

async function getAccionByName(nombre) {
  const response = await fetch(`${BASE_URL}/name/${nombre}`);
  if (!response.ok) {
    throw new Error(
      'No se encontraron acciones que coincidan con la búsqueda.',
    );
  }

  const data = await response.json();
  return data;
}

async function getAccionesByCausaId(idCausa) {
  const response = await fetch(`${BASE_URL}/causa/${idCausa}`);
  const data = await response.json();
  return data;
}

async function getAccionesByNameInsensitive(titulo) {
  const response = await fetch(`${BASE_URL}/nameInsensitivePartial/${titulo}`);
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
