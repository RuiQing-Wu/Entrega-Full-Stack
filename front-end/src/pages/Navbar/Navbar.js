import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeUserInfo } from '../../store/module/user';
import { getProfileThunk } from '../../services/auth.service';
import { getToken, removeToken } from '../../utils/utils';

export default function Menu() {
  const navigate = useNavigate();
  const user = useSelector((state) => {
    // console.log('state.user.userInfo', state.user.userInfo);
    return state.user.userInfo;
  });
  const [token, setToken] = useState(getToken());
  const dispatch = useDispatch();

  function logOut() {
    // eslint-disable-next-line no-console
    // console.log('LogOut');
    setToken('');
    dispatch(removeUserInfo());
    dispatch(removeToken());
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getProfileThunk());
    // eslint-disable-next-line no-console
    // console.log('profile useEffect', user.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Dependencia vacía para que solo se ejecute al montar el componente

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
            {user.username && (
              <>
                {/*
              <NavLink to={'/causas'} className="nav-link">
                Causas
              </NavLink>
              
              <NavLink to={'/crear-comunidad'} className="nav-link">
                Crear comunidad
              </NavLink>
              <NavLink to={'/causa'} className="nav-link">
                Crear causa solidaria
              </NavLink>
              <NavLink to={'/crear-accion'} className="nav-link">
                Crear acción solidaria
              </NavLink>
          */}
              </>
            )}
          </Nav>
          <Nav className="p-2">
            {user.username ? (
              <NavLink
                to={{ pathname: `/profile/${user.username}` }}
                className="nav-link"
              >
                {user.username}
              </NavLink>
            ) : (
              <>
                <NavLink to={'/login'} className="nav-link">
                  Login
                </NavLink>
                <NavLink to={'/registrar'} className="nav-link">
                  Sign Up
                </NavLink>
              </>
            )}
            {user.username && (
              <NavLink to="/login" className="nav-link" onClick={logOut}>
                LogOut
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
