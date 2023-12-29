import React from 'react';
import './Style/CardComunidad.css';

const CardComunidad = ({ imageUrl, title, onAddToCartClicked }) => {
  return (
    <div id="cardComunidad" className="card">
      <img className="card-img-top" src={imageUrl} alt="Imagen de ejemplo" />
      <div className="card-body">
        <h5 className="card-title">
          <a href={`/${title}`}>{title}</a>
        </h5>
        <button className="btn btn-primary" onClick={onAddToCartClicked}>
          <i className="bi bi-heart"></i> Like
        </button>
      </div>
    </div>
  );
};

export default CardComunidad;
