import './Registro.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../../component/MensajeError';

export default function Registro() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [ciudadError, setCiudadError] = useState('');
  const [paisError, setPaisError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleUsernameInput(event) {
    setUsername(event.target.value);
    setUsernameError('');
  }

  function handleTelefonoInput(event) {
    setTelefono(event.target.value);
    setTelefonoError('');

    if (!/^\d+$/.test(event.target.value)) {
      setTelefonoError('Ingresa solo números en el teléfono');
    }
  }

  function handleCiudadInput(event) {
    setCiudad(event.target.value);
    setCiudadError('');
  }

  function handlePaisInput(event) {
    setPais(event.target.value);
    setPaisError('');
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
    setPasswordError('');
  }

  async function registerUser(event) {
    // eslint-disable-next-line no-console
    console.log('Login');
    event.preventDefault();

    // Resetear los errores
    setUsernameError('');
    setTelefonoError('');
    setCiudadError('');
    setPaisError('');
    setPasswordError('');

    // Validar que el usuario y la contraseña no estén vacíos
    if (username === '') {
      setUsernameError('El usuario no puede estar vacío');
      return;
    }

    if (telefono === '') {
      setTelefonoError('El telefono no puede estar vacío');
      return;
    }

    if (ciudad === '') {
      setCiudadError('La ciudad no puede estar vacía');
      return;
    }

    if (pais === '') {
      setPaisError('El pais no puede estar vacío');
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
    <div id="PaginaRegistro" className="container">
      <h1>Registrar</h1>
      <form onSubmit={registerUser}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User
          </label>
          <input
            type="text"
            className={`form-control ${usernameError ? 'is-invalid' : ''} ${
              username && !usernameError ? 'is-valid' : ''
            }`}
            id="username"
            placeholder="Username"
            autoComplete="off"
            onChange={handleUsernameInput}
          />
          <div className="invalid-feedback">
            {<ErrorMessage message={usernameError} />}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Télefono
          </label>
          <input
            type="tel"
            className={`form-control ${telefonoError ? 'is-invalid' : ''} ${
              telefono && !telefonoError ? 'is-valid' : ''
            }`}
            id="telefono"
            inputMode="numeric"
            placeholder="Telefono movil"
            autoComplete="off"
            onChange={handleTelefonoInput}
          />
          <div className="invalid-feedback">
            {<ErrorMessage message={telefonoError} />}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">
            Ciudad
          </label>
          <input
            type="ciudad"
            className={`form-control ${ciudadError ? 'is-invalid' : ''} ${
              ciudad && !ciudadError ? 'is-valid' : ''
            }`}
            id="ciudad"
            placeholder="Ciudad"
            autoComplete="off"
            onChange={handleCiudadInput}
          />
          <div className="invalid-feedback">
            {<ErrorMessage message={ciudadError} />}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            Pais
          </label>
          <input
            type="pais"
            className={`form-control ${paisError ? 'is-invalid' : ''} ${
              pais && !paisError ? 'is-valid' : ''
            }`}
            id="pais"
            placeholder="Pais"
            autoComplete="off"
            onChange={handlePaisInput}
          />
          <div className="invalid-feedback">
            {<ErrorMessage message={paisError} />}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${passwordError ? 'is-invalid' : ''} ${
              password && !passwordError ? 'is-valid' : ''
            }`}
            id="password"
            placeholder="Password"
            onChange={handlePasswordInput}
          />
          <div className="invalid-feedback">
            {<ErrorMessage message={passwordError} />}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
