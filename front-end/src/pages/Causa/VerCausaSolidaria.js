import { useEffect, useCallback, useState } from 'react';
import { Breadcrumb, Tabs, Tab, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccionesByCausaId } from '../../services/acciones.service';
import { getCausaById } from '../../services/causas.service';
import { getComunidadById } from '../../services/comunidades.service';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import StackAccionSolidaria from '../../component/StackAccionSolidaria';
import { refactorDate } from '../../utils/utils';

export default function MostrarCausa() {
  const [acciones, setAcciones] = useState([]);
  const [causa, setCausa] = useState([]);
  const [comunidad, setComunidad] = useState([]);
  const [user, setUser] = useState(useSelector((state) => state.user.userInfo));
  const param = useParams();
  const navigate = useNavigate();

  function onHomeClicked() {
    navigate('/');
  }

  function handleRedireccionarACrearAccion() {
    navigate(`/causa/${param.idCausa}/crear-accion`, { replace: true });
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  const fetchAcciones = useCallback(async () => {
    const response = await getAccionesByCausaId(param.idCausa);
    setAcciones(response);
  }, [param.idCausa]);

  const fetchCausas = useCallback(async () => {
    const response = await getCausaById(param.idCausa);
    setCausa(response);
  }, [param.idCausa]);

  const fetchComunidad = useCallback(async () => {
    if (causa.comunidad === undefined) return;
    const response = await getComunidadById(causa.comunidad);
    setComunidad(response);
  }, [causa.comunidad]);

  useEffect(() => {
    fetchComunidad();
  }, [fetchComunidad]);

  useEffect(() => {
    fetchAcciones();
  }, [fetchAcciones]);

  useEffect(() => {
    fetchCausas();
  }, [fetchCausas]);

  if (!causa) {
    return <div>No hay datos de la causa</div>;
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onComunidadesClicked}>
          Comunidades
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/comunidad/${causa.comunidad}`}>
          {comunidad.nombre}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{causa.titulo}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex flex-column m-auto w-75">
        {user && (
          <div className="ms-auto p-2">
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleRedireccionarACrearAccion}
            >
              Crear acción solidaria
            </Button>
          </div>
        )}
        <div>
          <CardCausaSolidaria
            imageUrl={'../../../imagenes/causa.png'}
            idCausa={causa.id}
            titulo={causa.titulo}
            descripcion={causa.descripcion}
            fechaInicio={refactorDate(causa.fechaInicio)}
            fechaFin={refactorDate(causa.fechaFin)}
            objetivos={causa.objetivos}
          />
        </div>
      </div>

      <Col className="mx-auto mt-2">
        <Tabs
          defaultActiveKey="acciones"
          id="uncontrolled-tab-causas-acciones"
          className="mb-3"
        >
          {acciones.length > 0 && (
            <Tab eventKey="acciones" title="Acciones solidarias">
              {acciones.isEmpty ? (
                <p>No hay acciones en la causa</p>
              ) : (
                acciones.map((acc, index) => (
                  <StackAccionSolidaria
                    key={index}
                    idAccion={acc.id}
                    titulo={acc.titulo}
                    descripcion={acc.descripcion}
                    fechaInicio={acc.fechaInicio}
                    fechaFin={acc.fechaFin}
                    objetivos={acc.listaObjetivos}
                    progreso={acc.progreso}
                  />
                ))
              )}
            </Tab>
          )}
        </Tabs>
      </Col>
    </div>
  );
}
