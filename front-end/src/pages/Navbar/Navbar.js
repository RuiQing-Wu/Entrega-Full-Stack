import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/module/user';

export default function Navbar() {
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
  if (info.username !== '' && currentUser === undefined) {
    setCurrentUser(info.username);
    // eslint-disable-next-line no-console
    console.log(info.username);
    // eslint-disable-next-line no-console
    console.log('Hello', currentUser);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <Link to={'/'} className="navbar-brand">
          SolidarianID
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav mr-auto">
            <NavLink to={'/'} className="nav-link">
              Home
            </NavLink>
            <NavLink to={'/comunidad'} className="nav-link">
              Comunidad
            </NavLink>
            <NavLink to={'/causa'} className="nav-link">
              Causa Solidaria
            </NavLink>
            <NavLink to={'/accion'} className="nav-link">
              Accion Solidaria
            </NavLink>
          </div>
          <div className="navbar-nav ml-auto">
            {currentUser ? (
              <>
                <NavLink to={'/profile'} className="nav-link">
                  {info.username}
                </NavLink>
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </>
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
          </div>
        </div>
      </nav>
    </div>
  );
}
