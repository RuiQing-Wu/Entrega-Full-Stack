import React from 'react';
import { useLocation } from 'react-router-dom';
import CardComunidad from '../../component/CardComunidad';

export default function MostrarComunidad() {
  const location = useLocation();
  const comunidad = location.state;

  if (!comunidad) {
    return <div>No hay datos de la comunidad</div>;
  }

  return (
    <div>
      <CardComunidad
        nombre={comunidad.nombre}
        descripcion={comunidad.descripcion}
        fechaInicio={comunidad.fechaInicio}
      />
    </div>
  );
}