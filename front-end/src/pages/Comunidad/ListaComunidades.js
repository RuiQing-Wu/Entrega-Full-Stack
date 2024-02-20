import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumb, Button, Row, Col } from 'react-bootstrap';
import {
  getComunidades,
  getComunidadesByNameInsensitive,
  getComunidadesByCategoryInsensitive,
  getComunidadesByYear,
} from '../../services/comunidades.service';
import Busqueda from '../../component/Buscar';
import CardComunidad from '../../component/CardComunidad';
import { checkResponseStatusCode, refactorDate } from '../../utils/utils';

export default function BuscarComunidades() {
  const navigate = useNavigate();
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCategoria, setBusquedaCategoria] = useState('');
  const [busquedaYear, setBusquedaYear] = useState('');
  const [comunidadesFiltradas, setComunidadesFiltradas] = useState([]);
  const [error, setError] = useState('');
  const user = useSelector((state) => {
    return state.user.userInfo;
  });

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

  async function getComunidadesFiltradasByNombre() {
    setComunidadesFiltradas([]);
    const response = await getComunidadesByNameInsensitive(
      busquedaNombre,
      'nombre',
    );

    if (!checkResponseStatusCode(response)) {
      setComunidadesFiltradas([]);
      return;
    }

    const data = await response.json();
    setComunidadesFiltradas(data);

    if (data.length === 0)
      setError('No se encontraron comunidades que coincidan con la búsqueda.');
  }

  async function getComunidadesFiltradasByCategoria() {
    setComunidadesFiltradas([]);
    const response = await getComunidadesByCategoryInsensitive(
      busquedaCategoria,
      'categoria',
    );

    if (!checkResponseStatusCode(response)) {
      setComunidadesFiltradas([]);
      return;
    }

    const data = await response.json();
    setComunidadesFiltradas(data);

    if (data.length === 0)
      setError('No se encontraron comunidades que coincidan con la búsqueda.');
  }

  async function getComunidadesFiltradasByYear() {
    setComunidadesFiltradas([]);
    const response = await getComunidadesByYear(busquedaYear);

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

  function handleBusquedaNombreInput(event) {
    setBusquedaNombre(event);
  }

  function handleBusquedaCategoriaInput(event) {
    setBusquedaCategoria(event);
  }

  function handleBusquedaYearInput(event) {
    setBusquedaYear(event);
  }

  function handleBuscarComunidades(busqueda, filtro) {
    setError('');
    const tipoBusqueda =
      filtro === 'nombre' ? busquedaNombre.trim() : busquedaCategoria.trim();

    if (busqueda === '') {
      getAllComunidades();
    } else if (filtro === 'nombre') {
      getComunidadesFiltradasByNombre();
    } else if (filtro === 'categoria') {
      getComunidadesFiltradasByCategoria();
    } else if (filtro === 'year') {
      getComunidadesFiltradasByYear();
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
            handleNombreInput={handleBusquedaNombreInput}
            handleCategoriaInput={handleBusquedaCategoriaInput}
            handleYearInput={handleBusquedaYearInput}
            error={error}
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
