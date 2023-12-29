import './Profile.css';
import { useState } from 'react';

export default function Profile() {
  const initialUser = {
    nombre: 'John Doe',
    telefono: '123456789',
    ciudad: 'Ciudad Ejemplo',
    pais: 'País Ejemplo',
    esAdministrador: true,
  };

  const [user, setUser] = useState({ ...initialUser });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Aquí podrías realizar alguna acción para guardar los cambios en la base de datos
  };

  const handleCancelClick = () => {
    setUser({ ...initialUser });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title text-center">Perfil de Usuario</h1>
        </div>
        <div className="card-body">
          <div className="profile-info">
            <p>
              <strong>Nombre:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="nombre"
                  value={user.nombre}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                user.nombre
              )}
            </p>
            <p>
              <strong>Teléfono Móvil:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="telefono"
                  value={user.telefono}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                user.telefono
              )}
            </p>
            <p>
              <strong>Ciudad:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="ciudad"
                  value={user.ciudad}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                user.ciudad
              )}
            </p>
            <p>
              <strong>País:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="pais"
                  value={user.pais}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                user.pais
              )}
            </p>
            <p>
              <strong>Administrador de Comunidad:</strong>{' '}
              {user.esAdministrador ? 'Sí' : 'No'}
            </p>
          </div>
          {isEditing ? (
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSaveClick}>
                Guardar
              </button>
              {'  '}
              <button className="btn btn-secondary" onClick={handleCancelClick}>
                Cancelar
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button className="btn btn-info" onClick={handleEditClick}>
                Editar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
