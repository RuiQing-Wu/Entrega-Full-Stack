const BASE_URL = 'http://localhost:3001/seguidor';

async function seguirUsuario(
  idUsuarioOrigen,
  usernameOrigen,
  idUsuarioDestino,
  usernameDestino,
) {
  const resultArray = [
    { idUsuario: idUsuarioOrigen, username: usernameOrigen },
    { idUsuario: idUsuarioDestino, username: usernameDestino },
  ];

  const response = await fetch(`${BASE_URL}/seguir`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resultArray),
  });
}

async function getSeguidosByUser(idUsuario) {
  const response = await fetch(`${BASE_URL}/seguidos/${idUsuario}`);
  const data = await response.json();
  return data;
}

async function getSeguidoresByUser(idUsuario) {
  const response = await fetch(`${BASE_URL}/seguidores/${idUsuario}`);
  const data = await response.json();
  return data;
}

export { seguirUsuario, getSeguidosByUser, getSeguidoresByUser };
