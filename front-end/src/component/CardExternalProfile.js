import React from 'react';
import './Style/CardExternalProfile.css';

export default function CardExternalProfile({
  imageUrl,
  username,
  telefono,
  correo,
  onSeguirUsuarioClicked,
  role,
}) {
  return (
    <div className="card mt-2">
      <img
        className="card-img-top img-fluid img-thumbnail w-25 m-auto"
        src={imageUrl}
        alt="Perfil"
      />
      <div className="card-body">
        <h5 className="card-title">Perfil del usuario {username}</h5>
        <p className="card-text">Role: {role}</p>
        <p className="card-text">Teléfono: {telefono}</p>
        <p className="card-text">Correo electrónico: {correo}</p>
        <button className="btn btn-primary" onClick={onSeguirUsuarioClicked}>
          <i className="bi bi-heart"></i> Seguir al usuario
        </button>
      </div>
    </div>
  );
}
