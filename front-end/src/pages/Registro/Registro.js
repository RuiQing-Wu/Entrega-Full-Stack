import './Registro.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
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
    <div id="PaginaRegistro">
      <h1>Registrar</h1>
      <Form onSubmit={registerUser}>
        <Col sd={10} md={10} lg={8} className="mx-auto">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">User</Form.Label>
            <Form.Control
              type="text"
              id="username"
              placeholder="Username"
              autoComplete="off"
              value={username}
              onChange={handleUsernameInput}
              isInvalid={!!usernameError}
              isValid={username && !usernameError}
            />
            {usernameError && <ErrorMessage message={usernameError} />}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="telefono">Teléfono</Form.Label>
            <Form.Control
              type="tel"
              id="telefono"
              inputMode="numeric"
              placeholder="Telefono movil"
              autoComplete="off"
              value={telefono}
              onChange={handleTelefonoInput}
              isInvalid={!!telefonoError}
              isValid={telefono && !telefonoError}
            />
            {telefonoError && <ErrorMessage message={telefonoError} />}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ciudad">Ciudad</Form.Label>
            <Form.Control
              type="text"
              id="ciudad"
              placeholder="Ciudad"
              autoComplete="off"
              value={ciudad}
              onChange={handleCiudadInput}
              isInvalid={!!ciudadError}
              isValid={ciudad && !ciudadError}
            />
            {ciudadError && <ErrorMessage message={ciudadError} />}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="pais">Pais</Form.Label>
            <Form.Control
              type="text"
              id="pais"
              placeholder="Pais"
              autoComplete="off"
              value={pais}
              onChange={handlePaisInput}
              isInvalid={!!paisError}
              isValid={pais && !paisError}
            />
            {paisError && <ErrorMessage message={paisError} />}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordInput}
              isInvalid={!!passwordError}
              isValid={password && !passwordError}
            />
            {passwordError && <ErrorMessage message={passwordError} />}
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
}
