import './Registro.css';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Col, Container, Label } from 'react-bootstrap';
import { useState } from 'react';
import ErrorMessage from '../../component/MensajeError';
import { registerUser } from '../../services/auth.service';
import { registrarUsuarioSeguimiento } from '../../services/seguidor.service';
import { getUserByName } from '../../services/users.service';
import { alertErrorMessage, checkResponseStatusCode } from '../../utils/utils';

export default function Registro() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [ciudadError, setCiudadError] = useState('');
  const [paisError, setPaisError] = useState('');

  function handleUsernameInput(event) {
    setUsername(event.target.value);
    setUsernameError('');
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
    setPasswordError('');
  }

  function handleNombreInput(event) {
    setNombre(event.target.value);
    setNombreError('');
  }

  function handleTelefonoInput(event) {
    setTelefono(event.target.value);
    setTelefonoError('');
  }

  function handleCiudadInput(event) {
    setCiudad(event.target.value);
    setCiudadError('');
  }

  function handlePaisInput(event) {
    setPais(event.target.value);
    setPaisError('');
  }

  async function registrarUser(event) {
    event.preventDefault();

    setUsernameError('');
    setTelefonoError('');
    setCiudadError('');
    setPaisError('');
    setPasswordError('');

    if (username === '' || username.trim() === '') {
      setUsernameError('El nombre de usuario no puede estar vacío');
      return;
    }

    if (password === '' || password.trim() === '') {
      setPasswordError('La contraseña no puede estar vacía');
      return;
    }

    if (nombre === '' || nombre.trim() === '') {
      setNombreError('El nombre no puede estar vacío');
      return;
    }

    if (telefono === '' || telefono.trim() === '') {
      setTelefonoError('El teléfono no puede estar vacío');
      return;
    }

    if (ciudad === '' || ciudad.trim() === '') {
      setCiudadError('La ciudad no puede estar vacía');
      return;
    }

    if (pais === '' || pais.trim() === '') {
      setPaisError('El país no puede estar vacío');
      return;
    }

    const response = await registerUser(
      username,
      password,
      nombre,
      telefono,
      ciudad,
      pais,
    );

    if (!checkResponseStatusCode(response)) {
      alertErrorMessage(response);
      return;
    }

    const responseUser = await getUserByName(username);
    if (checkResponseStatusCode(responseUser)) {
      const userRegistrado = await responseUser.json();
      const responseUsuarioSeguimiento = await registrarUsuarioSeguimiento(
        userRegistrado?.username,
        userRegistrado?.id,
      );
    }

    // eslint-disable-next-line no-alert
    alert('Usuario registrado con éxito');

    navigate('/login');
  }

  return (
    <Container id="PaginaRegistro">
      <h1 className="text-center my-4">Registrar</h1>
      <Form onSubmit={registrarUser}>
        <Col sd={10} md={10} lg={8} className="mx-auto">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Nombre de usuario</Form.Label>
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
            <Form.Label htmlFor="password">Contraseña</Form.Label>
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
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Nombre</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Nombre"
              value={nombre}
              onChange={handleNombreInput}
              isInvalid={!!nombreError}
              isValid={nombre && !nombreError}
            />
            {nombreError && <ErrorMessage message={nombreError} />}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="telefono">Teléfono</Form.Label>
            <Form.Control
              type="tel"
              id="telefono"
              inputMode="numeric"
              placeholder="Teléfono móvil"
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
            <Form.Label htmlFor="pais">País</Form.Label>
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

          <div className="d-grid my-4">
            <Button type="submit" variant="primary">
              Registrar
            </Button>
            <Form.Label id="LinkLogin" className="mt-3">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </Form.Label>
          </div>
        </Col>
      </Form>
    </Container>
  );
}
