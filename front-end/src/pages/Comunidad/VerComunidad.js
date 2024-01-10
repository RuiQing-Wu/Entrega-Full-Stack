import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Tab, Tabs, Button, Row, Col } from 'react-bootstrap';
import {
  getCausasByComunityId,
  getCausasByNameInsensitive,
} from '../../services/causas.service';
import { getUserById } from '../../services/users.service';
import CardComunidad from '../../component/CardComunidad';
import CardExternalProfile from '../../component/CardExternalProfile';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import Popup from '../../component/Popup';
import Busqueda from '../../component/Buscar';
import { getComunidadById } from '../../services/comunidades.service';
import { refactorDate } from '../../utils/utils';

export default function MostrarComunidad() {
  const [comunidad, setComunidad] = useState();
  const param = useParams();
  const [user, setUser] = useState(useSelector((state) => state.user.userInfo));
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState('');
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [causasFiltradas, setCausasFiltradas] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const onApoyarCausaClicked = async () => {
    const response = await getCausasByComunityId(param.idComunidad);
    setCausasFiltradas(response);
    navigate(`/comunidad/${param.idComunidad}`, { replace: true });
    setPopupMessage('¡Causa apoyada exitosamente!');
  };

  const fetchComunidad = useCallback(async () => {
    const response = await getComunidadById(param.idComunidad);
    setComunidad(response);
  }, [param.idComunidad]);

  const fetchCausas = useCallback(async () => {
    const response = await getCausasByComunityId(param.idComunidad);
    setCausasFiltradas(response);
  }, [param.idComunidad]);

  const fetchUser = useCallback(async () => {
    const usersDataResponse = await Promise.all(
      comunidad.usuarios.map(async (userId) => {
        const userData = await getUserById(userId);
        return userData;
      }),
    );

    const filteredUsersData = usersDataResponse.filter((us) => us !== null);
    setUsersData(filteredUsersData);
  }, [comunidad]);

  useEffect(() => {
    fetchComunidad();
  }, [fetchComunidad]);

  useEffect(() => {
    fetchCausas();
  }, [fetchCausas]);

  useEffect(() => {
    if (comunidad) {
      fetchUser();
    }
  }, [fetchUser, comunidad]);

  if (!comunidad) {
    return <div>No hay datos de la comunidad</div>;
  }

  async function getCausasFiltradas() {
    setCausasFiltradas([]);
    const response = await getCausasByNameInsensitive(
      busqueda,
      param.idComunidad,
    );
    setCausasFiltradas(response);

    if (response.length === 0)
      setError('No se encontraron causas que coincidan con la búsqueda.');
  }

  function handleBuscarCausas(event) {
    event.preventDefault();

    if (busqueda.trim() === '') {
      fetchCausas();
    } else if (busqueda.trim() !== '') {
      getCausasFiltradas();
      setError('');
    }
  }

  function onHomeClicked() {
    navigate('/');
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  function handleRedireccionarACrearCausa() {
    navigate(`/comunidad/${param.idComunidad}/crear-causa`, {
      replace: true,
    });
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
        <Breadcrumb.Item active>{comunidad.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex flex-column m-auto w-75">
        {user && (
          <div className="ms-auto p-2">
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleRedireccionarACrearCausa}
            >
              Crear causa solidaria
            </Button>
          </div>
        )}
        <div>
          <CardComunidad
            imageUrl={'../../../imagenes/comunidad.jpeg'}
            id={comunidad.id}
            nombre={comunidad.nombre}
            descripcion={comunidad.descripcion}
            fechaInicio={refactorDate(comunidad.fechaInicio)}
          />
        </div>
      </div>

      <Tabs
        defaultActiveKey="causasSolidarias"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="causasSolidarias" title="Causas solidarias">
          <Busqueda
            titulo={'causas'}
            handleBuscar={handleBuscarCausas}
            handleBusquedaInput={handleBusquedaInput}
            error={error}
            elementoFiltrado={causasFiltradas}
          />
          {causasFiltradas.length > 0 && (
            <div>
              <h2 className="mb-5">Causas encontradas:</h2>
              <Row xs={1} md={2} lg={2} className="g-4">
                {causasFiltradas.map((cau, index) => (
                  <Col key={index}>
                    <CardCausaSolidaria
                      key={index}
                      idCausa={cau.id}
                      titulo={cau.titulo}
                      imageUrl={'../../../imagenes/causa.png'}
                      onApoyarCausaClicked={onApoyarCausaClicked}
                      detalles={true}
                      apoyar={false}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Tab>

        <Tab eventKey="seguidores" title="Seguidores">
          {usersData.length > 0 &&
            usersData.map((userData, index) => (
              <CardExternalProfile
                key={index}
                nombre={userData.nombre}
                imageUrl={'../../../imagenes/usuario.png'}
              />
            ))}
        </Tab>
      </Tabs>
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage('')} />
      )}
    </div>
  );
}
