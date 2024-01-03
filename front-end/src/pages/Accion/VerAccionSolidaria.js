import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import CardAccionSolidaria from '../../component/CardAccionSolidaria';

export default function MostrarAcciones() {
  const location = useLocation();
  const accion = location.state;
  const navigate = useNavigate();
  const causaDeAccion = accion.causaAccion;
  const tituloDeCausa = causaDeAccion.titulo;

  function onHomeClicked() {
    navigate('/');
  }

  function onCausasClicked() {
    navigate('/listaCausas');
  }

  function onCausaClicked() {
    navigate(`/causa/${tituloDeCausa}`, {
      state: {
        titulo: tituloDeCausa,
        descripcion: causaDeAccion.descripcion,
        fechaInicio: causaDeAccion.fechaInicio,
        fechaFin: causaDeAccion.fechaFin,
        accionSolidaria: causaDeAccion.accionSolidaria,
        idComunidad: causaDeAccion.idComunidad,
      },
    });
  }

  if (!accion) {
    return <div>No hay datos de la acción</div>;
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onCausasClicked}>
          Causas-solidarias
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={onCausaClicked}>
          {tituloDeCausa}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{accion.tituloAccion}</Breadcrumb.Item>
      </Breadcrumb>
      <CardAccionSolidaria
        titulo={accion.tituloAccion}
        objetivos={accion.ObjetivosAccion}
        progreso={accion.progresoAccion}
      />
    </div>
  );
}
