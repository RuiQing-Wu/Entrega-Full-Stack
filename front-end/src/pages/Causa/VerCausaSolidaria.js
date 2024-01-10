import { useEffect, useCallback, useState } from 'react';
import { Breadcrumb, Tabs, Tab, Col, Button, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAccionesByCausaId,
  getAccionesByNameInsensitive,
} from '../../services/acciones.service';
import { getCausaById } from '../../services/causas.service';
import { getComunidadById } from '../../services/comunidades.service';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import Busqueda from '../../component/Buscar';
import { refactorDate } from '../../utils/utils';
import CardAccionSolidaria from '../../component/CardAccionSolidaria';

export default function MostrarCausa() {
  const [causa, setCausa] = useState([]);
  const [comunidad, setComunidad] = useState([]);
  const [user, setUser] = useState(useSelector((state) => state.user.userInfo));
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [accionesFiltradas, setAccionesFiltradas] = useState([]);
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

  function onComunidadClicked() {
    navigate(`/comunidad/${causa.comunidad}`, { replace: true });
  }

  const fetchAcciones = useCallback(async () => {
    const response = await getAccionesByCausaId(param.idCausa);
    setAccionesFiltradas(response);
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

  async function getAccionesFiltradas() {
    setAccionesFiltradas([]);
    const response = await getAccionesByNameInsensitive(
      busqueda,
      param.idCausa,
    );
    setAccionesFiltradas(response);

    if (response.length === 0)
      setError('No se encontraron causas que coincidan con la búsqueda.');
  }

  function handleBuscarAcciones(event) {
    event.preventDefault();

    if (busqueda.trim() === '') {
      fetchAcciones();
    } else if (busqueda.trim() !== '') {
      getAccionesFiltradas();
      setError('');
    }
  }

  function handleBusquedaInput(event) {
    setBusqueda(event.target.value);
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
            idComunidad={causa.comunidad}
            titulo={causa.titulo}
            descripcion={causa.descripcion}
            fechaInicio={refactorDate(causa.fechaInicio)}
            fechaFin={refactorDate(causa.fechaFin)}
            objetivos={causa.objetivos}
            detalles={false}
            apoyar={true}
          />
        </div>
      </div>

      <Col className="mx-auto mt-2">
        <Tabs
          defaultActiveKey="acciones"
          id="uncontrolled-tab-causas-acciones"
          className="mb-3"
        >
          <Tab eventKey="acciones" title="Acciones solidarias">
            <Busqueda
              titulo={'acciones'}
              handleBuscar={handleBuscarAcciones}
              handleBusquedaInput={handleBusquedaInput}
              error={error}
              elementoFiltrado={accionesFiltradas}
            />
            {accionesFiltradas.length > 0 && (
              <div>
                <h2 className="mb-5">Acciones encontradas: </h2>
                <Row xs={1} md={2} lg={2} className="g-4">
                  {accionesFiltradas.map((acc, index) => (
                    <Col key={index}>
                      <CardAccionSolidaria
                        key={index}
                        idAccion={acc.id}
                        imageUrl={'../../../imagenes/accion.png'}
                        titulo={acc.titulo}
                        detalles={true}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Tab>
        </Tabs>
      </Col>
    </div>
  );
}
