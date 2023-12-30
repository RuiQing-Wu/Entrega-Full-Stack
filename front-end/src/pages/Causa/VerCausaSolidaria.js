import React from 'react';
import { useLocation } from 'react-router-dom';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import { Breadcrumb } from 'react-bootstrap';

export default function MostrarCausa() {
  const location = useLocation();
  const causa = location.state;

  if (!causa) {
    return <div>No hay datos de la causa</div>;
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/causa">Causas solidarias</Breadcrumb.Item>
        <Breadcrumb.Item active>{causa.titulo}</Breadcrumb.Item>
      </Breadcrumb>

      <CardCausaSolidaria
        titulo={causa.titulo}
        descripcion={causa.descripcion}
        fechaInicio={causa.fechaInicio}
        fechaFin={causa.fechaFin}
      />
    </div>
  );
}
