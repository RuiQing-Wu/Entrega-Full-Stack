import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Stack, Button } from 'react-bootstrap';
import {
  getComunidades,
  getComunidadByName,
} from '../../services/comunidades.service';
import Busqueda from '../../component/Buscar';
import { getToken } from '../../utils/utils';
import { CardListaComunidad } from '../../component/CardComunidad';

export default function BuscarComunidades() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [comunidadesFiltradas, setComunidadesFiltradas] = useState([]);
  const [error, setError] = useState('');

  function handleRedireccionarACrearComunidad() {
    return () => {
      navigate('/crear-comunidad');
    };
  }

  async function fetchData() {
    const response = await getComunidades();
    const todasLasComunidades = response;
    setComunidadesFiltradas(todasLasComunidades);
  }

  async function fetchDataByName() {
    try {
      const response = await getComunidadByName(busqueda);
      const comunidad = response ? [response] : [];
      setComunidadesFiltradas(comunidad);
    } catch (errorGet) {
      setError('No se encontraron comunidades que coincidan con la búsqueda.');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleBusquedaInput(event) {
    setBusqueda(event.target.value);
  }

  function handleBuscarComunidades(event) {
    event.preventDefault();

    if (busqueda.trim() === '') {
      fetchData();
      // filtrarComunidades()
    } else if (busqueda.trim() !== '') {
      fetchDataByName();
      setError('');
    }
  }

  function handleRedireccionarComunidad(nombre) {
    const comunidadSeleccionada = comunidadesFiltradas.find((comunidad) =>
      comunidad.nombre.toLowerCase().includes(nombre.toLowerCase()),
    );
    if (comunidadSeleccionada) {
      navigate(`/comunidad/${comunidadSeleccionada.id}`, { replace: true });
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
          {getToken() && (
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
            handleRedireccionar={(nombre) =>
              handleRedireccionarComunidad(nombre)
            }
            elementoFiltrado={comunidadesFiltradas}
          />
          {comunidadesFiltradas.length > 0 && (
            <Stack gap={1}>
              <h2>Comunidades encontradas:</h2>
              {comunidadesFiltradas?.map((elemento, index) => (
                <CardListaComunidad
                  key={index}
                  imageUrl={'../../../imagenes/comunidad.jpeg'}
                  nombre={elemento.nombre}
                  descripcion={elemento.descripcion}
                  handleRedireccionar={(nombre) =>
                    handleRedireccionarComunidad(elemento.nombre)
                  }
                />
              ))}
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
}
