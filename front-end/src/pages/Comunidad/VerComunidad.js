import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import CardComunidad from '../../component/CardComunidad';

export default function MostrarComunidad() {
  const location = useLocation();
  const comunidad = location.state;

  const onApoyarComunidadClicked = () => {
    // TODO: Implementar apoyar comunidad
  };

  if (!comunidad) {
    return <div>No hay datos de la comunidad</div>;
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/listaComunidades">Comunidades</Breadcrumb.Item>
        <Breadcrumb.Item active>{comunidad.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <CardComunidad
        nombre={comunidad.nombre}
        descripcion={comunidad.descripcion}
        fechaInicio={comunidad.fechaInicio}
        onApoyarComunidadClicked={onApoyarComunidadClicked}
      />
    </div>
  );
}
