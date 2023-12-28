const API_URL = 'http://localhost:3000/auth';

async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
}

async function registerUser(username, password) {
  return null;
}

export { loginUser, registerUser };
