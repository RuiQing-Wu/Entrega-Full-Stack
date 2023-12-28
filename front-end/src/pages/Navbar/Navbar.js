import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Login/Login';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
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
              <Link to={'/profile'} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link">
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
