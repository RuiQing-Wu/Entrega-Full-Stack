import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Login,
  Registro,
  Comunidad,
  Causa,
  Accion,
} from '../pages/index';
import App from '../App';
import VerCausaSolidaria from '../pages/Causa/VerCausaSolidaria';
import AuthRoute from '../component/AuthRoute';

const router = createBrowserRouter([
  {
    name: 'App',
    path: '/',
    element: <App />,
    children: [
      { index: true, name: 'Home', element: <Home /> },
      { name: 'Login', path: '/login', element: <Login /> },
      { name: 'Registrar', path: '/registrar', element: <Registro /> },
      {
        name: 'Comunidad',
        path: '/comunidad',
        element: (
          <AuthRoute>
            <Comunidad />
          </AuthRoute>
        ),
      },
      {
        name: 'Causa',
        path: '/causa',
        element: (
          <AuthRoute>
            <Causa />
          </AuthRoute>
        ),
      },
      {
        name: 'Accion',
        path: '/accion',
        element: (
          <AuthRoute>
            <Accion />
          </AuthRoute>
        ),
      },
      {
        name: 'VerCausaSolidaria',
        path: '/vercausa',
        element: <VerCausaSolidaria />,
      },
      { name: 'Error', path: '*', element: <Error /> },
    ],
  },
  {
    name: 'Error',
    path: '*',
    element: <Error />,
  },
]);

export default router;
