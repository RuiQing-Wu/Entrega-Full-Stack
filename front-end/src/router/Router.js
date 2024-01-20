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
  Error,
  MostrarCausa,
  MostrarAcciones,
} from '../pages/index';
import App from '../App';
import AuthRoute from '../component/AuthRoute';
import ComunidadOutlet from '../pages/Comunidad/Comunidad.outlet';
import CausaOutlet from '../pages/Causa/CausasOutlet';

const router = createBrowserRouter([
  {
    name: 'App',
    path: '/',
    element: <App />,
    children: [
      { index: true, name: 'Home', element: <Home /> },
      { name: 'Login', path: '/login', element: <Login /> },
      { name: 'Registrar', path: '/registrar', element: <Registro /> },
      // TODO PDTE REVISAR
      {
        name: 'Profile',
        path: '/perfil/:nombrePerfil',
        element: (
          <AuthRoute>
            <Profile />
          </AuthRoute>
        ),
      },
      {
        name: 'ListaComunidades',
        path: '/comunidades',
        element: <ComunidadOutlet />,
        children: [
          {
            index: true,
            name: 'ListaComunidades',
            element: <BuscarComunidades />,
          },
          {
            name: 'crearComunidad',
            path: '/comunidades/crear-comunidad',
            element: (
              <AuthRoute>
                <Comunidad />
              </AuthRoute>
            ),
          },
          {
            name: 'VerComunidad',
            path: '/comunidades/:idComunidad',
            element: <MostrarComunidad />,
          },
          {
            name: 'crearCausa',
            path: '/comunidades/:idComunidad/crear-causa',
            element: (
              <AuthRoute>
                <Causa />
              </AuthRoute>
            ),
          },
        ],
      },
      {
        name: 'VerCausaSolidaria',
        path: '/causa/:idCausa',
        element: <CausaOutlet />,
        children: [
          {
            name: 'crearAccion',
            index: true,
            element: <MostrarCausa />,
          },
          {
            name: 'crearAccion',
            path: '/causa/:idCausa/crear-accion',
            element: (
              <AuthRoute>
                <Accion />
              </AuthRoute>
            ),
          },
        ],
      },
      {
        name: 'VerAccionSolidaria',
        path: '/accion/:idAccion',
        element: (
          <AuthRoute>
            <MostrarAcciones />
          </AuthRoute>
        ),
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
