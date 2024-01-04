import React from 'react';
import './Style/CardComunidad.css';

export default function CardComunidad({
  imageUrl,
  nombre,
  descripcion,
  fechaInicio,
}) {
  return (
    <div id="cardComunidad" className="card">
      <img className="card-img-top" src={imageUrl} alt="Imagen de ejemplo" />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">Descripción: {descripcion}</p>
        <p className="card-text">Fecha de creación: {fechaInicio}</p>
      </div>
    </div>
  );
}
