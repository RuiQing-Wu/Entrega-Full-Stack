import React from 'react';
import './Style/CardAccionSolidaria.css';

const CardAccionSolidaria = ({
  titulo,
  descripcion,
  listaObjetivos,
  progreso,
}) => {
  const objetivos = listaObjetivos.join(', ');

  return (
    <div className="container">
      <h3 className="mt-4">Detalles de la Acción Solidaria</h3>
      <div id="CardAccionSolidaria" className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <h6>Descripción:</h6>
          <p className="card-text">{descripcion}</p>
          <h6>Objetivos:</h6>
          <div id="lista-objetivos">{objetivos}</div>
          <h6>Progreso:</h6> <p>{progreso}%</p>
        </div>
      </div>
    </div>
  );
};

export default CardAccionSolidaria;
