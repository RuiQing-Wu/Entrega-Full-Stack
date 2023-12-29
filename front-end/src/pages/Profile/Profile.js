import './Profile.css';
import { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    nombre: 'John Doe',
    telefono: '123456789',
    ciudad: 'Ciudad Ejemplo',
    pais: 'País Ejemplo',
    esAdministrador: true, // Cambia a false si no es administrador
  });

  return (
    <div className="container">
      <div className="profile-header">
        <h1>Perfil de Usuario</h1>
      </div>
      <div className="profile-info">
        <p>
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p>
          <strong>Teléfono Móvil:</strong> {user.telefono}
        </p>
        <p>
          <strong>Ciudad:</strong> {user.ciudad}
        </p>
        <p>
          <strong>País:</strong> {user.pais}
        </p>
        <p>
          <strong>Administrador de Comunidad:</strong>{' '}
          {user.esAdministrador ? 'Sí' : 'No'}
        </p>
      </div>
    </div>
  );
}
