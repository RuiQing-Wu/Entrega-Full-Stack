import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Login,
  Registro,
  Comunidad,
  MostrarComunidad,
  BuscarComunidades,
  Causa,
  Accion,
  Profile,
  MostrarInformacionPerfil,
  Error,
  MostrarCausa,
  MostrarAcciones,
  BuscarCausas,
} from '../pages/index';
import App from '../App';
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
        name: 'Profile',
        path: '/profile',
        element: (
          <AuthRoute>
            <Profile />
          </AuthRoute>
        ),
      },
      {
        name: 'ExternalProfile',
        path: '/profile/:nombrePerfil',
        element: (
          <AuthRoute>
            <Profile />
          </AuthRoute>
        ),
      },
      {
        name: 'Comunidad',
        path: '/crear-comunidad',
        element: (
          <AuthRoute>
            <Comunidad />
          </AuthRoute>
        ),
      },
      {
        name: 'VerComunidad',
        path: '/comunidad/:idComunidad',
        element: <MostrarComunidad />,
      },
      {
        name: 'ListaComunidades',
        path: '/comunidades',
        element: <BuscarComunidades />,
      },
      {
        name: 'ListaCausas',
        path: '/causas',
        element: <BuscarCausas />,
      },
      {
        name: 'Causa',
        path: '/comunidad/:idComunidad/crear-causa',
        element: (
          <AuthRoute>
            <Causa />
          </AuthRoute>
        ),
      },
      {
        name: 'Accion',
        path: '/causa/:idCausa/crear-accion',
        element: (
          <AuthRoute>
            <Accion />
          </AuthRoute>
        ),
      },
      {
        name: 'VerCausaSolidaria',
        path: '/causa/:idCausa',
        element: <MostrarCausa />,
      },
      {
        name: 'VerAccionSolidaria',
        path: '/accion/:idAccion',
        element: <MostrarAcciones />,
      },
      { name: 'Error', path: '*', element: <Error /> },
    ],
  },
  {
    name: 'ErrorOperacion',
    path: '/error',
    element: <Error />,
  },
  {
    name: 'Error',
    path: '*',
    element: <Error />,
  },
]);

export default router;
