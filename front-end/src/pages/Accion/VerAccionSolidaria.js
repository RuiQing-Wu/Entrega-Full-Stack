import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
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
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/accion">Acciones solidarias</Breadcrumb.Item>
        <Breadcrumb.Item active>{accion.titulo}</Breadcrumb.Item>
      </Breadcrumb>

      <CardAccionSolidaria
        titulo={accion.titulo}
        descripcion={accion.descripcion}
        objetivos={accion.objetivos}
        progreso={accion.progreso}
      />
    </div>
  );
}
