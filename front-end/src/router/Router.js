import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Registro } from '../pages/index';
import App from '../App';

const router = createBrowserRouter([
  {
    name: 'App',
    path: '/',
    element: <App />,
    children: [
      { index: true, name: 'Home', element: <Home /> },
      { name: 'Login', path: '/login', element: <Login /> },
      { name: 'Registrar', path: '/registrar', element: <Registro /> },
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
