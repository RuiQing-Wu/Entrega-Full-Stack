import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { getAccionById } from '../../services/acciones.service';
import { getCausaById } from '../../services/causas.service';
import { getComunidadById } from '../../services/comunidades.service';
import CardAccionSolidaria from '../../component/CardAccionSolidaria';

export default function MostrarAcciones() {
  const param = useParams();
  const [accion, setAccion] = useState([]);
  const [causa, setCausa] = useState([]);
  const [comunidad, setComunidad] = React.useState([]);
  const navigate = useNavigate();

  function onHomeClicked() {
    navigate('/');
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  const fetchAccion = useCallback(async () => {
    const response = await getAccionById(param.idAccion);
    setAccion(response);
  }, [param.idAccion]);

  const fetchCausa = useCallback(async () => {
    const response = await getCausaById(accion.causa);
    setCausa(response);
  }, [accion.causa]);

  const fetchComunidad = useCallback(async () => {
    const response = await getComunidadById(causa.comunidad);
    setComunidad(response);
  }, [causa.comunidad]);

  useEffect(() => {
    fetchComunidad();
  }, [fetchComunidad]);

  useEffect(() => {
    fetchAccion();
  }, [fetchAccion]);

  useEffect(() => {
    fetchCausa();
  }, [fetchCausa]);

  if (!accion) {
    return <div>No hay datos de la acción</div>;
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onComunidadesClicked}>Comunidades</Breadcrumb.Item>
        <Breadcrumb.Item href={`/comunidad/${causa.comunidad}`}>
          {comunidad.nombre}
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/causa/${causa.id}`}>
          {causa.titulo}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{accion.titulo}</Breadcrumb.Item>
      </Breadcrumb>

      {accion && (
        <CardAccionSolidaria
          imageUrl={'../../../imagenes/accion.png'}
          titulo={accion.titulo}
          descripcion={accion.descripcion}
          listaObjetivos={accion.listaObjetivos || []}
          progreso={accion.progreso}
        />
      )}
    </div>
  );
}
