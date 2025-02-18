import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Tab, Tabs, Button, Row, Col } from 'react-bootstrap';
import {
  getCausasByComunityId,
  getCausasByNameInsensitive,
} from '../../services/causas.service';
import { getApoyoCausaByNumApoyo } from '../../services/apoyo_causa.service';
import { getUserById } from '../../services/users.service';
import CardComunidad from '../../component/CardComunidad';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import Busqueda from '../../component/Buscar';
import { getComunidadById } from '../../services/comunidades.service';
import {
  checkResponseStatusCode,
  checkPageToNavigate,
  refactorDate,
} from '../../utils/utils';
import CardExternalProfile from '../../component/CardExternalProfile';

export default function MostrarComunidad() {
  const [comunidad, setComunidad] = useState();
  const param = useParams();

  const user = useSelector((state) => {
    return state.user.userInfo;
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaNumApoyo, setBusquedaNumApoyo] = useState('');
  const [causasFiltradas, setCausasFiltradas] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const fetchComunidad = useCallback(async () => {
    const response = await getComunidadById(param.idComunidad);
    if (!checkResponseStatusCode(response)) {
      const page = checkPageToNavigate(response);
      navigate(page);
    } else {
      const data = await response.json();
      setComunidad(data);
    }
  }, [param.idComunidad, navigate]);

  const fetchCausas = useCallback(async () => {
    const response = await getCausasByComunityId(param.idComunidad);

    if (!checkResponseStatusCode(response)) {
      const page = checkPageToNavigate(response);
      navigate(page);
    }

    const data = await response.json();
    setCausasFiltradas(data);
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

  async function getCausasFiltradasByNumApoyo() {
    setCausasFiltradas([]);
    const responseNumApoyo = await getApoyoCausaByNumApoyo(busquedaNumApoyo);
    const responseCausasByComunidad = await getCausasByComunityId(
      param.idComunidad,
    );
    if (!checkResponseStatusCode(responseCausasByComunidad)) {
      const page = checkPageToNavigate(responseCausasByComunidad);
      navigate(page);
    }

    const data = await responseCausasByComunidad.json();
    if (responseNumApoyo !== undefined) {
      if (responseNumApoyo.length > 0) {
        const idCausasResponse = responseNumApoyo.map((causa) => causa.idCausa);
        const nuevasCausasFiltradas = data.filter((causa) =>
          idCausasResponse.includes(causa.id),
        );

        setCausasFiltradas(nuevasCausasFiltradas);

        if (nuevasCausasFiltradas.length === 0)
          setError('No se encontraron causas que coincidan con la búsqueda.');
      } else {
        setError('No se encontraron causas que coincidan con la búsqueda.');
      }
    } else {
      setError('No se encontraron causas que coincidan con la búsqueda.');
    }
  }

  async function getCausasFiltradas() {
    setCausasFiltradas([]);

    const response = await getCausasByNameInsensitive(
      busquedaNombre,
      param.idComunidad,
    );
    if (!checkResponseStatusCode(response)) {
      const page = checkPageToNavigate(response);
      navigate(page);
    }

    const data = await response.json();
    setCausasFiltradas(data);

    if (response.length === 0)
      setError('No se encontraron causas que coincidan con la búsqueda.');
  }

  function handleBuscarCausas(busqueda, filtro) {
    setError('');
    const tipoBusqueda = filtro === 'nombre' ? busqueda : busqueda;

    if (busqueda.trim() === '') {
      fetchCausas();
    } else if (filtro === 'nombre') {
      getCausasFiltradas();
    } else if (filtro === 'numApoyo') {
      getCausasFiltradasByNumApoyo();
    }
  }

  function onHomeClicked() {
    navigate('/');
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  function handleRedireccionarACrearCausa() {
    navigate(`/comunidades/${param.idComunidad}/crear-causa`, {
      replace: true,
    });
  }

  function handleBusquedaNombreInput(event) {
    setBusquedaNombre(event);
  }

  function handleBusquedaNumApoyoInput(event) {
    setBusquedaNumApoyo(event);
  }

  function handleRedireccionarPerfil(nombreUser) {
    navigate(`/perfil/${nombreUser}`);
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
        {user && user.id === comunidad.idAdministrador && (
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
            categorias={comunidad.categorias}
            descripcion={comunidad.descripcion}
            fechaInicio={refactorDate(comunidad.fechaInicio)}
            usersData={usersData}
            detalles={false}
            solicitud={true}
            btnSolicitar={true}
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
            handleNombreInput={handleBusquedaNombreInput}
            handleNumApoyoInput={handleBusquedaNumApoyoInput}
            error={error}
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
                      detalles={true}
                      apoyar={false}
                      idComunidad={cau.comunidad}
                      descripcion={cau.descripcion}
                      fechaInicio={refactorDate(cau.fechaInicio)}
                      fechaFin={refactorDate(cau.fechaFin)}
                      objetivos={cau.objetivos}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Tab>

        <Tab eventKey="seguidores" title="Miembros">
          {usersData.length > 0 &&
            usersData.map((userData, index) => (
              <CardExternalProfile
                key={index}
                nombre={userData.username}
                imageUrl={'../../../imagenes/usuario.png'}
                handleRedireccionar={() =>
                  handleRedireccionarPerfil(userData.username)
                }
              />
            ))}
        </Tab>
      </Tabs>
    </div>
  );
}
