import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeUserInfoRedux } from '../../store/module/user';
import { getProfileThunk } from '../../services/auth.service';
import { getToken, removeToken } from '../../utils/utils';

export default function Menu() {
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user.userInfo;
  });
  const [token, setToken] = useState(getToken());
  const dispatch = useDispatch();

  function logOut() {
    setToken('');
    dispatch(removeUserInfoRedux());
    removeToken();
    // dispatch(removeToken());
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getProfileThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={'/'} className="p-2">
          SolidarianID
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <NavLink to={'/'} className="nav-link">
              Home
            </NavLink>
            <NavLink to={'/comunidades'} className="nav-link">
              Comunidades
            </NavLink>
          </Nav>
          <Nav className="p-2">
            {user.username ? (
              <NavLink
                to={{ pathname: `/perfil/${user.username}` }}
                className="nav-link"
              >
                {user.username}
              </NavLink>
            ) : (
              <>
                <NavLink to={'/login'} className="nav-link">
                  Iniciar sesión
                </NavLink>
                <NavLink to={'/registrar'} className="nav-link">
                  Registrarse
                </NavLink>
              </>
            )}
            {user.username && (
              <NavLink to="/login" className="nav-link" onClick={logOut}>
                Cerrar sesión
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
