import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/module/user';

export default function Menu() {
  const info = useSelector((state) => state.user.userInfo);
  const [currentUser, setCurrentUser] = useState(undefined);
  const dispatch = useDispatch();

  function logOut() {
    // eslint-disable-next-line no-console
    console.log('LogOut');
    setCurrentUser(undefined);
    dispatch(setUserInfo({}));
  }

  // eslint-disable-next-line no-console
  console.log(info);
  // El useEffect soluciona el error al lanzar el logOut
  useEffect(() => {
    // Solo ejecutar una vez al montar el componente
    if (info.username !== '' && currentUser === undefined) {
      setCurrentUser(info.username);
      // eslint-disable-next-line no-console
      console.log('Tipo usuario', info.tipoUsuario);
      // eslint-disable-next-line no-console
      console.log(info.username);
      // eslint-disable-next-line no-console
      console.log('Hello', currentUser);
    }
  }, [info.username, currentUser]); // Dependencia vacía para que solo se ejecute al montar el componente

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
          {info.tipoUsuario === undefined && (
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
            <NavLink to="/login" className="nav-link" onClick={logOut}>
              LogOut
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
