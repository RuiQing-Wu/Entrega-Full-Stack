import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/module/user';
import Login from '../Login/Login';

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
      <nav className="navbar navbar-expand bg-body-tertiary">
        <Link to={'/'} className="navbar-brand">
          SolidarianID
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/'} className="nav-link">
              Home
            </Link>
          </li>
        </div>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/comunidad'} className="nav-link">
              Comunidad
            </Link>
          </li>
        </div>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/causa'} className="nav-link">
              Causa Solidaria
            </Link>
          </li>
        </div>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/accion'} className="nav-link">
              Accion Solidaria
            </Link>
          </li>
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/profile" className="nav-link">
                {info.username}
              </a>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={'/registrar'} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </div>
  );
}
