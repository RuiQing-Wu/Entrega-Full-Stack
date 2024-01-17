import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Registro from './Registro';
import { registerUser } from '../../services/auth.service';

jest.mock('../../services/auth.service');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('Renderizado inicial del componente Registro', () => {
  const { container } = render(
    <BrowserRouter>
      <Registro />
    </BrowserRouter>,
  );

  // Verificar la presencia de elementos clave
  const elementosRegistrar = screen.getByRole('heading', { name: 'Registrar' });
  expect(elementosRegistrar).toBeInTheDocument();
  expect(screen.getByLabelText('User')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  expect(screen.getByLabelText('Teléfono')).toBeInTheDocument();
  expect(screen.getByLabelText('Ciudad')).toBeInTheDocument();
  expect(screen.getByLabelText('Pais')).toBeInTheDocument();
  const botonRegistrar = screen.getByRole('button', { name: 'Registrar' });
  expect(botonRegistrar).toBeInTheDocument();
  expect(screen.getByText('¿Ya tienes cuenta?')).toBeInTheDocument();
});

test('Manejo de entrada de usuario en el componente Registro', () => {
  const { getByLabelText } = render(
    <BrowserRouter>
      <Registro />
    </BrowserRouter>,
  );

  // Simular entrada de usuario
  fireEvent.change(screen.getByLabelText('User'), {
    target: { value: 'usuario123' },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText('Nombre'), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByLabelText('Teléfono'), {
    target: { value: '123456789' },
  });
  fireEvent.change(screen.getByLabelText('Ciudad'), {
    target: { value: 'Ciudad de Ejemplo' },
  });
  fireEvent.change(screen.getByLabelText('Pais'), {
    target: { value: 'Pais de Ejemplo' },
  });

  // Verificar que los estados se actualicen correctamente
  expect(screen.getByLabelText('User').value).toBe('usuario123');
  expect(screen.getByLabelText('Password').value).toBe('password123');
  expect(screen.getByLabelText('Nombre').value).toBe('John Doe');
  expect(screen.getByLabelText('Teléfono').value).toBe('123456789');
  expect(screen.getByLabelText('Ciudad').value).toBe('Ciudad de Ejemplo');
  expect(screen.getByLabelText('Pais').value).toBe('Pais de Ejemplo');
});

describe('Manejo de respuestas en el componente Registro', () => {
  test('Procesar response exitoso de registerUser', async () => {
    // Configurar el mock de navigate
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    // Configurar el mock de registerUser para que devuelva un response exitoso
    const successfulResponse = {
      status: 201,
    };
    registerUser.mockResolvedValue(successfulResponse);

    // Renderizar el componente
    const { container } = render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>,
    );

    const userData = {
      username: 'usuario123',
      password: 'password123',
      nombre: 'John Doe',
      telefono: '123456789',
      ciudad: 'Ciudad de Ejemplo',
      pais: 'Pais de Ejemplo',
    };

    // Simular entradas del usuario
    fireEvent.change(screen.getByLabelText('User'), {
      target: { value: userData.username },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: userData.password },
    });
    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: userData.nombre },
    });
    fireEvent.change(screen.getByLabelText('Teléfono'), {
      target: { value: userData.telefono },
    });
    fireEvent.change(screen.getByLabelText('Ciudad'), {
      target: { value: userData.ciudad },
    });
    fireEvent.change(screen.getByLabelText('Pais'), {
      target: { value: userData.pais },
    });

    // Simular envío de formulario
    fireEvent.submit(screen.getByRole('button', { name: 'Registrar' }));

    // Esperar a que la función de registro se resuelva
    await waitFor(() => {
      // Verificar que registerUser se llamó con los datos correctos
      expect(registerUser).toHaveBeenCalledWith(
        userData.username,
        userData.password,
        userData.nombre,
        userData.telefono,
        userData.ciudad,
        userData.pais,
      );
    });

    await waitFor(() => {
      // Verificar que navigate se llamó con la ruta correcta
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });
  test('Procesar response fallido de registerUser', async () => {
    // Configurar el mock de navigate
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    // Configurar el mock de registerUser para que devuelva un response fallido
    const failedResponse = {
      status: 400,
    };
    registerUser.mockResolvedValue(failedResponse);

    const alertMock = jest.fn();
    window.alert = alertMock;

    // Renderizar el componente
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>,
    );

    const userData = {
      username: 'usuario123',
      password: 'password123',
      nombre: 'John Doe',
      telefono: '123456789',
      ciudad: 'Ciudad de Ejemplo',
      pais: 'Pais de Ejemplo',
    };

    // Simular entradas del usuario
    fireEvent.change(screen.getByLabelText('User'), {
      target: { value: userData.username },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: userData.password },
    });
    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: userData.nombre },
    });
    fireEvent.change(screen.getByLabelText('Teléfono'), {
      target: { value: userData.telefono },
    });
    fireEvent.change(screen.getByLabelText('Ciudad'), {
      target: { value: userData.ciudad },
    });
    fireEvent.change(screen.getByLabelText('Pais'), {
      target: { value: userData.pais },
    });

    // Simular envío de formulario
    fireEvent.submit(screen.getByRole('button', { name: 'Registrar' }));

    // Esperar a que la función de registro se resuelva
    await waitFor(() => {
      // Verificar que registerUser se llamó con los datos correctos
      expect(registerUser).toHaveBeenCalledWith(
        userData.username,
        userData.password,
        userData.nombre,
        userData.telefono,
        userData.ciudad,
        userData.pais,
      );
    });
    await waitFor(() => {
      // Verificar que se llama al alert
      expect(alertMock).toHaveBeenCalledWith(
        'Error al registrar usuario existente',
      );
    });
    await waitFor(() => {
      // Verificar que navigate llama a la ruta registrar
      expect(navigateMock).toHaveBeenCalledWith('/registrar');
    });
  });
});
