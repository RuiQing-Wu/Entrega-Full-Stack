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
        path: '/Profile/:nombrePerfil',
        element: (
          <AuthRoute>
            <MostrarInformacionPerfil />,
          </AuthRoute>
        ),
      },
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
        name: 'VerComunidad',
        path: '/comunidad/:nombreComunidad',
        element: (
          <AuthRoute>
            <MostrarComunidad />,
          </AuthRoute>
        ),
      },
      {
        name: 'ListaComunidades',
        path: '/listaComunidades',
        element: (
          <AuthRoute>
            <BuscarComunidades />,
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
        path: '/causa/:titulo',
        element: <MostrarCausa />,
      },
      {
        name: 'VerAccionSolidaria',
        path: '/accion/:titulo',
        element: <MostrarAcciones />,
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
