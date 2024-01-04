import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import './Login.css';
import ErrorMessage from '../../component/MensajeError';
import { setTokenRedux } from '../../store/module/user';
import { login } from '../../services/auth.service';

export default function Login() {
  // Crear un hook para navegar entre páginas
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  function handleUsernameInput(event) {
    setUsername(event.target.value);
    setUsernameError('');
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
    setPasswordError('');
  }

  async function loginUser(event) {
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
    const response = await login(username, password);
    // eslint-disable-next-line no-console
    console.log(response.access_token);

    // Procesar la respuesta de la API
    if (response.access_token === undefined) {
      // Mostrar un mensaje de error
      setUsernameError('Usuario o contraseña incorrectos');
      setPasswordError('Usuario o contraseña incorrectos');
      return;
    }

    dispatch(setTokenRedux(response.access_token));
    // window.location.reload(true);
    navigate('/');
    window.location.reload(true);
  }

  return (
    <div id="PaginaLogin">
      <h1>Login</h1>
      <Form onSubmit={loginUser}>
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
            {/* Reemplaza Form.Control.Feedback con tu componente ErrorMessage */}
            {passwordError && (
              <ErrorMessage
                message={
                  passwordError
                } /* Pasa otras props según sea necesario */
              />
            )}
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
}
