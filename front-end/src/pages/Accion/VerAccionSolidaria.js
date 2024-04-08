import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { getAccionById } from '../../services/acciones.service';
import { getCausaById } from '../../services/causas.service';
import { getComunidadById } from '../../services/comunidades.service';
import CardAccionSolidaria from '../../component/CardAccionSolidaria';
import {
  checkResponseStatusCode,
  checkPageToNavigate,
} from '../../utils/utils';

export default function MostrarAcciones() {
  const param = useParams();
  const [accion, setAccion] = useState([]);
  const [causa, setCausa] = useState([]);
  const [comunidad, setComunidad] = useState([]);
  const navigate = useNavigate();

  function onHomeClicked() {
    navigate('/');
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  function onComunidadClicked() {
    navigate(`/comunidades/${causa.comunidad}`, { replace: true });
  }

  function onCausaClicked() {
    navigate(`/causa/${causa.id}`, { replace: true });
  }

  const fetchAccion = useCallback(async () => {
    const response = await getAccionById(param.idAccion);
    if (!checkResponseStatusCode(response)) {
      const page = checkPageToNavigate(response);
      navigate(page);
    }

    const data = await response.json();
    setAccion(data);
  }, [param.idAccion]);

  const fetchCausa = useCallback(async () => {
    const response = await getCausaById(accion.causa);
    if (!checkResponseStatusCode(response)) {
      const page = checkPageToNavigate(response);
      navigate(page);
    }

    const data = await response.json();
    setCausa(data);
  }, [accion.causa]);

  const fetchComunidad = useCallback(async () => {
    const response = await getComunidadById(causa.comunidad);
    if (!checkResponseStatusCode(response)) {
      const page = checkPageToNavigate(response);
      navigate(page);
    }

    const data = await response.json();
    setComunidad(data);
  }, [causa.comunidad]);

  useEffect(() => {
    if (causa && causa.comunidad) {
      fetchComunidad();
    }
  }, [causa, fetchComunidad]);

  useEffect(() => {
    fetchAccion();
  }, [fetchAccion]);

  useEffect(() => {
    if (accion && accion.causa) {
      fetchCausa();
    }
  }, [accion, fetchCausa]);

  if (!accion) {
    return <div>No hay datos de la acción</div>;
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onComunidadesClicked}>
          Comunidades
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={onComunidadClicked}>
          {comunidad.nombre}
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={onCausaClicked}>
          {causa.titulo}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{accion.titulo}</Breadcrumb.Item>
      </Breadcrumb>

      {accion && (
        <CardAccionSolidaria
          imageUrl={'../../../imagenes/accion.png'}
          idAccion={accion.id}
          titulo={accion.titulo}
          descripcion={accion.descripcion}
          listaObjetivos={accion.listaObjetivos}
          tipoContribucion={accion.tipo}
          totalObjetivo={accion.totalObjetivo}
          progreso={accion.progreso}
          detalles={false}
          apoyar={true}
        />
      )}
    </div>
  );
}
