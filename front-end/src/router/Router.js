import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Login,
  Registro,
  Comunidad,
  Causa,
  Accion,
<<<<<<< HEAD
  Profile,
  Error,
=======
  VerCausaSolidaria,
  Profile,
>>>>>>> 284f58698d7ab82705d0a0ef3d4cea59ae0d88c8
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
      { name: 'Profile', path: '/profile', element: <Profile /> },
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
      {
        name: 'Profile',
        path: '/profile',
        element: (
          <AuthRoute>
            <Profile />
          </AuthRoute>
        ),
      },
    ],
  },
  {
    name: 'Error',
    path: '*',
    element: <Error />,
  },
]);

export default router;
