import React from 'react';
import { useLocation } from 'react-router-dom';
import CardAccionSolidaria from '../../component/CardAccionSolidaria';

export default function MostrarAcciones() {
  const location = useLocation();
  const accion = location.state;

  if (!accion) {
    return <div>No hay datos de la acción</div>;
  }

  return (
    <div>
      <CardAccionSolidaria
        titulo={accion.titulo}
        objetivos={accion.ObjetivosAccion}
        progreso={accion.progreso}
      />
    </div>
  );
}
