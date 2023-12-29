import './Registro.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Registro() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleUsernameInput(event) {
    setUsername(event.target.value);
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }

  async function registerUser(event) {
    // eslint-disable-next-line no-console
    console.log('Login');
    event.preventDefault();

    // Resetear los errores
    setUsernameError('');
    setPasswordError('');

    // Validar que el usuario y la contraseña no estén vacíos
    if (username === '') {
      setUsernameError('El usuario no puede estar vacío');
      return;
    }

    if (password === '') {
      setPasswordError('La contraseña no puede estar vacía');
      return;
    }

    // TODO Llamar a la API para iniciar sesión
    // const response = await loginUser(username, password);

    // TODO PROCESAR LA RESPUESTA DE LA API

    // Navegar a la página de inicio
    navigate('/login');
  }

  return (
    <div className="container">
      <h1>registrar</h1>
      <form onSubmit={registerUser}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            autoComplete="off"
            onChange={handleUsernameInput}
          />
          <label>{usernameError}</label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={handlePasswordInput}
          />
          <label>{passwordError}</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
