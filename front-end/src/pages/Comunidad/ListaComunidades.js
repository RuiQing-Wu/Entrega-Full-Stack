import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumb, Button, Row, Col } from 'react-bootstrap';
import {
  getComunidades,
  getComunidadesByNameInsensitive,
} from '../../services/comunidades.service';
import Busqueda from '../../component/Buscar';
import CardComunidad from '../../component/CardComunidad';
import { checkResponseStatusCode, refactorDate } from '../../utils/utils';

export default function BuscarComunidades() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [comunidadesFiltradas, setComunidadesFiltradas] = useState([]);
  const [error, setError] = useState('');
  // const [user, setUser] = useState(useSelector((state) => state.user.userInfo));
  const user = useSelector((state) => {
    return state.user.userInfo;
  });
  const [filtro, setFiltro] = useState('nombre');

  /* function onFiltroChange(event) {
    setFiltro(event.target.value);
  } */

  function handleRedireccionarACrearComunidad() {
    return () => {
      navigate('/comunidades/crear-comunidad');
    };
  }

  async function getAllComunidades() {
    const response = await getComunidades();
    if (!checkResponseStatusCode(response)) {
      setComunidadesFiltradas([]);
      return;
    }

    const data = await response.json();
    setComunidadesFiltradas(data);
  }

  async function getComunidadesFiltradas() {
    setComunidadesFiltradas([]);
    const response = await getComunidadesByNameInsensitive(busqueda, filtro);
    if (!checkResponseStatusCode(response)) {
      setComunidadesFiltradas([]);
      return;
    }
    const data = await response.json();
    setComunidadesFiltradas(data);

    if (data.length === 0)
      setError('No se encontraron comunidades que coincidan con la búsqueda.');
  }

  useEffect(() => {
    getAllComunidades();
  }, []);

  function handleBusquedaInput(event) {
    setBusqueda(event.target.value);
  }

  function handleBuscarComunidades(event) {
    event.preventDefault();
    setError('');
    setBusqueda(event.target.busqueda.value);
    if (busqueda.trim() === '') {
      getAllComunidades();
    } else if (busqueda.trim() !== '') {
      getComunidadesFiltradas(filtro);
    }
  }

  function handleRedireccionarComunidad(nombre) {
    const comunidadSeleccionada = comunidadesFiltradas.find(
      (comunidad) => comunidad.nombre.toLowerCase() === nombre.toLowerCase(),
    );

    if (comunidadSeleccionada) {
      navigate(`/comunidades/${comunidadSeleccionada.id}`, { replace: true });
    }
  }

  function onHomeClicked() {
    navigate('/');
  }

  return (
    <div id="PaginaListaComunidades">
      <div>
        <Breadcrumb className="p-2">
          <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Comunidades</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="d-flex flex-column m-auto w-75">
        <div className="ms-auto p-2">
          {user && (
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleRedireccionarACrearComunidad()}
            >
              Crear comunidad
            </Button>
          )}
        </div>
        <div className="container">
          <Busqueda
            titulo={'comunidades'}
            handleBuscar={handleBuscarComunidades}
            handleBusquedaInput={handleBusquedaInput}
            error={error}
            /* handleRedireccionar={(nombre) =>
              handleRedireccionarComunidad(nombre)
            } */
            // onFiltroChange={onFiltroChange}
            // filtro={filtro}
            /* elementoFiltrado={comunidadesFiltradas} */
          />
          {comunidadesFiltradas.length > 0 && (
            <div>
              <h2>Comunidades encontradas:</h2>
              <Row xs={1} md={2} lg={2} className="g-4">
                {comunidadesFiltradas.map((elemento, index) => (
                  <Col key={index}>
                    <CardComunidad
                      imageUrl={'../../../imagenes/comunidad.jpeg'}
                      id={elemento.id}
                      nombre={elemento.nombre}
                      descripcion={elemento.descripcion}
                      fechaInicio={refactorDate(elemento.fechaInicio)}
                      handleRedireccionar={(nombre) =>
                        handleRedireccionarComunidad(elemento.nombre)
                      }
                      detalles={true}
                      btnSolicitar={false}
                      solicitud={false}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
