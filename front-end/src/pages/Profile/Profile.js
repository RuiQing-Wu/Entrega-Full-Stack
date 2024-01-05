import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

export default function Profile() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(useSelector((state) => state.user.userInfo));
  const [editedFields, setEditedFields] = useState({
    username: false,
    telefono: false,
    ciudad: false,
    pais: false,
  });

  const handleMenuClick = (eventKey) => {
    setSelectedMenuItem(eventKey);
  };

  const handleEditClick = (field) => {
    setIsEditing(true);
    setEditedFields({ ...editedFields, [field]: true });
  };

  const handleSaveClick = () => {
    const editedData = {};
    Object.keys(editedFields).forEach((field) => {
      if (editedFields[field]) {
        editedData[field] = user[field];
      }
    });

    console.log('Campos editados:', editedData);

    setEditedFields({
      username: false,
      telefono: false,
      ciudad: false,
      pais: false,
    });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedFields({
      username: false,
      telefono: false,
      ciudad: false,
      pais: false,
    });
    setIsEditing(false);
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedFields({ ...editedFields, [field]: true });
    // Update local user state
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const renderProfileContent = () => {
    switch (selectedMenuItem) {
      case 'perfil':
        return (
          <div className="card">
            <div className="card-header">
              <h6 className="card-title text-center">Datos del perfil</h6>
            </div>
            <div className="card-body">
              {isEditing ? (
                <div>
                  <p>
                    <strong>Nombre:</strong>{' '}
                    <input
                      type="text"
                      name="nombre"
                      value={user.username}
                      onChange={(e) => handleInputChange(e, 'username')}
                      className="form-control"
                    />
                  </p>
                  <p>
                    <strong>Teléfono Móvil:</strong>{' '}
                    <input
                      type="text"
                      name="telefono"
                      value={user.telefono}
                      onChange={(e) => handleInputChange(e, 'telefono')}
                      className="form-control"
                    />
                  </p>
                  <p>
                    <strong>Ciudad:</strong>{' '}
                    <input
                      type="text"
                      name="ciudad"
                      value={user.ciudad}
                      onChange={(e) => handleInputChange(e, 'ciudad')}
                      className="form-control"
                    />
                  </p>
                  <p>
                    <strong>País:</strong>{' '}
                    <input
                      type="text"
                      name="pais"
                      value={user.pais}
                      onChange={(e) => handleInputChange(e, 'pais')}
                      className="form-control"
                    />
                  </p>
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={handleSaveClick}
                    >
                      Guardar
                    </button>
                    {'  '}
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelClick}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div>
                    <p>{user.username}</p>
                    <p>{user.telefono}</p>
                    <p>{user.ciudad}</p>
                    <p>{user.pais}</p>
                  </div>
                  <button
                    className="btn btn-info"
                    onClick={() => handleEditClick(user)}
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'link-1':
        return (
          <div>
            <h1>Contenido del Link 1</h1>
          </div>
        );
      case 'link-2':
        return (
          <div>
            <h1>Contenido del Link 2</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      <Nav
        defaultActiveKey="perfil"
        className="flex-column bg-light p-4"
        onSelect={handleMenuClick}
      >
        <Nav.Link eventKey="perfil">Datos del perfil</Nav.Link>
        <Nav.Link eventKey="link-1">Link 1</Nav.Link>
        <Nav.Link eventKey="link-2">Link 2</Nav.Link>
      </Nav>
      <div className="container mt-4">{renderProfileContent()}</div>
    </div>
  );
}
