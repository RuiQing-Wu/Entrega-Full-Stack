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

const router = createBrowserRouter([
  {
    name: 'App',
    path: '/',
    element: <App />,
    children: [
      { index: true, name: 'Home', element: <Home /> },
      { name: 'Login', path: '/login', element: <Login /> },
      { name: 'Registrar', path: '/registrar', element: <Registro /> },
      { name: 'Comunidad', path: '/comunidad', element: <Comunidad /> },
      { name: 'Causa', path: '/causa', element: <Causa /> },
      { name: 'Accion', path: '/accion', element: <Accion /> },
      {
        name: 'VerCausaSolidaria',
        path: '/verCausa',
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
