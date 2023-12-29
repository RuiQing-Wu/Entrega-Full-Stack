import React from 'react';
import './Style/CardExternalProfile.css';

export default function CardExternalProfile({
  imageUrl,
  username,
  telefono,
  correo,
  onSeguirUsuarioClicked,
}) {
  return (
    <div id="cardComunidad" className="card">
      <img className="card-img-top" src={imageUrl} alt="Imagen de ejemplo" />
      <div className="card-body">
        <h5 className="card-title">Perfil del usuario {username}</h5>
        <p className="card-text">Teléfono: {telefono}</p>
        <p className="card-text">Correo electrónico: {correo}</p>
        <button className="btn btn-primary" onClick={onSeguirUsuarioClicked}>
          <i className="bi bi-heart"></i> Seguir al usuario
        </button>
      </div>
    </div>
  );
}
