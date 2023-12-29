import React from 'react';
import { useLocation } from 'react-router-dom';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';

const MostrarCausa = () => {
  const location = useLocation();
  const causa = location.state;

  if (!causa) {
    return <div>No hay datos de la causa</div>;
  }

  return (
    <div>
      <CardCausaSolidaria
        titulo={causa.titulo}
        descripcion={causa.descripcion}
        fechaInicio={causa.fechaInicio}
        fechaFin={causa.fechaFin}
      />
    </div>
  );
};

export default MostrarCausa;
