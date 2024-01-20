import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Col, Container } from 'react-bootstrap';
import './Login.css';
import ErrorMessage from '../../component/MensajeError';
import { setTokenRedux } from '../../store/module/user';
import { login } from '../../services/auth.service';
import { checkResponseStatusCode } from '../../utils/utils';

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
    event.preventDefault();

    // Resetear los errores
    setUsernameError('');
    setPasswordError('');

    // Validar que el usuario y la contraseña no estén vacíos
    if (username === '' || username.trim() === '') {
      setUsernameError('El usuario no puede estar vacío');
      return;
    }

    if (password === '' || password.trim() === '') {
      setPasswordError('La contraseña no puede estar vacía');
      return;
    }

    const response = await login(username, password);

    // Procesar la respuesta de la API
    if (!checkResponseStatusCode(response)) {
      // Mostrar un mensaje de error
      setUsernameError('Usuario o contraseña incorrectos');
      setPasswordError('Usuario o contraseña incorrectos');
      return;
    }

    const data = await response.json();
    dispatch(setTokenRedux(data.access_token));
    navigate('/');
    window.location.reload(true);
  }

  return (
    <Container id="PaginaLogin">
      <h1 className="text-center my-4">Login</h1>
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
            {passwordError && (
              <ErrorMessage
                message={
                  passwordError
                } 
              />
            )}
          </Form.Group>
          <div className="d-grid my-4">
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Form.Label id="LinkRegistro" className="mt-3">
              ¿No tienes cuenta? <Link to="/registrar">Registrate</Link>
            </Form.Label>
          </div>
        </Col>
      </Form>
    </Container>
  );
}
