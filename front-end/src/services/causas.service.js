const BASE_URL = 'http://localhost:3001/causas';

async function saveCausa(
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  idComunidad,
  objetivos,
) {
  const comunidad = idComunidad;
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
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
  return data;
}

async function getCausas() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
}

async function getCausaById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data;
}

async function getCausasByName(name) {
  const response = await fetch(`${BASE_URL}/name/${name}`);
  const data = await response.json();
  return data;
}

async function getCausasByComunityId(idComunidad) {
  const response = await fetch(`${BASE_URL}/comunidad/${idComunidad}`);
  const data = await response.json();
  return data;
}

async function getCausasByNameInsensitive(titulo, idComunidad) {
  const response = await fetch(
    `${BASE_URL}/nameInsensitivePartial/${titulo}/${idComunidad}`,
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
