import React from 'react';

const CardAccionSolidaria = ({ titulo, objetivos, progreso }) => {
  const listaObjetivos = objetivos.map((objetivo, index) => (
    <li key={index}>{objetivo}</li>
  ));

  return (
    <div className="container">
      <h3 className="mt-4">Detalles de la Acción Solidaria</h3>
      <div id="CardAccionSolidaria" className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <h6>Objetivos:</h6>
          <ul>{listaObjetivos}</ul>
          <h6>Progreso: {progreso}</h6>
        </div>
      </div>
    </div>
  );
};

export default CardAccionSolidaria;
