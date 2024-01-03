import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeUserInfo, setUserInfo } from '../../store/module/user';
import { getProfileThunk } from '../../services/auth.service';
import { removeToken } from '../../utils/utils';

export default function Menu() {
  const user = useSelector((state) => state.user.userInfo);
  const [currentUser, setCurrentUser] = useState(undefined);
  const dispatch = useDispatch();

  function logOut() {
    // eslint-disable-next-line no-console
    console.log('LogOut');
    setCurrentUser(undefined);
    dispatch(removeUserInfo());
    dispatch(removeToken());
  }

  useEffect(() => {
    dispatch(getProfileThunk());
    // eslint-disable-next-line no-console
    console.log('profile useEffect', user.username);
  }, [currentUser]); // Dependencia vacía para que solo se ejecute al montar el componente

  return (
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
          <NavLink to={'/listaComunidades'} className="nav-link">
            Comunidades
          </NavLink>
          <NavLink to={'/listaCausas'} className="nav-link">
            Causas
          </NavLink>
          {user.username && (
            <>
              <NavLink to={'/comunidad'} className="nav-link">
                Crear comunidad
              </NavLink>
              <NavLink to={'/causa'} className="nav-link">
                Crear causa solidaria
              </NavLink>
              <NavLink to={'/accion'} className="nav-link">
                Crear acción solidaria
              </NavLink>
            </>
          )}
        </Nav>
        <Nav className="p-2">
          {user.username ? (
            <NavLink to={'/profile'} className="nav-link">
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
  );
}
