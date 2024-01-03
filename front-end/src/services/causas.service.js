const BASE_URL = 'http://localhost:3001/causas';

async function saveCausa(titulo, descripcion, fechaInicio, fechaFin) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
    }),
  });
  const data = await response.json();
  return data;
}

async function getCausas() {
  const response = await fetch(`${BASE_URL}`);
  const data = await response.json();
  return data;
}

async function getCausaByName(nombre) {
  const response = await fetch(`${BASE_URL}/name/${nombre}`);
  const data = await response.json();
  return data;
}

export { saveCausa, getCausas, getCausaByName };
