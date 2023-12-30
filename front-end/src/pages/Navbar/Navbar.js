import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/module/user';

export default function Menu() {
  const info = useSelector((state) => state.user.userInfo);
  const [currentUser, setCurrentUser] = useState(undefined);
  const dispatch = useDispatch();

  function logOut() {
    setCurrentUser(undefined);
    dispatch(setUserInfo({}));
  }

  if (info.username !== '' && currentUser === undefined) {
    setCurrentUser(info.username);
  }

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
          {info.tipoUsuario === 'admin' && (
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
          {currentUser ? (
            <NavLink to={'/profile'} className="nav-link">
              {info.username}
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
          {currentUser && (
            <Nav.Link href="/login" onClick={logOut}>
              LogOut
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
