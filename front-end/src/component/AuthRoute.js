import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/utils';

// Componente para comprueba si tiene permisos para acceder a la ruta
// Si no tiene permisos, redirige a la página de login
export default function AuthRoute({ children }) {
  const token = getToken();

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to={'/login'} replace />;
}
