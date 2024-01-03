import React from 'react';
import './Style/CardCausaSolidaria.css';

const CardCausaSolidaria = ({
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  accionSolidaria,
  idComunidad,
}) => {
  return (
    <div>
      <h3 className="mt-4">Detalles de la Causa Solidaria</h3>
      <div id="cardCausaSolidaria" className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descripcion}</p>
          <p className="card-text">{fechaInicio}</p>
          <p className="card-text">{fechaFin}</p>
          <p className="card-text">{accionSolidaria}</p>
          <p className="card-text">{idComunidad}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCausaSolidaria;
