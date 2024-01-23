import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

test('Renderizado del componente App', async () => {

  const { queryByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const navbarElement = screen.queryByText(/SolidarianID/i);
    expect(navbarElement).toBeInTheDocument();

  });

  await waitFor(() => {
    const navbarElement = screen.queryByText(/Home/i);
    expect(navbarElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const navbarElement = screen.queryByText(/Comunidades/i);
    expect(navbarElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const navbarElement = screen.queryByText(/Iniciar sesión/i);
    expect(navbarElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const navbarElement = screen.queryByText(/Registrarse/i);
    expect(navbarElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const footerElement = screen.queryByText(/Desarrollo Full-Stack\. Máster en Ingeniería del Software 2023-2024\./i);
    expect(footerElement).toBeInTheDocument();
  });
});