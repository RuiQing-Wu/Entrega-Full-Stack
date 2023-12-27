import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  // Crear un hook para navegar entre páginas
  const navigate = useNavigate();

  function loginUser() {
    // eslint-disable-next-line no-console
    console.log('Login');
    // TODO Llamar a la API para iniciar sesión

    // Navegar a la página de inicio
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
