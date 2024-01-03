const BASE_URL = 'http://localhost:3001/comunidades';

async function saveComunidad(nombre, descripcion, fechaInicio) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, descripcion, fechaInicio }),
  });

  const data = await response.json();
  return data;
}

async function getComunidades() {
  const response = await fetch(`${BASE_URL}`);
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

export { saveComunidad, getComunidades, getComunidadByName };
