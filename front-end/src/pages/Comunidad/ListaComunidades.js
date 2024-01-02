import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Stack } from 'react-bootstrap';
import {
  getComunidades,
  getComunidadByName,
} from '../../services/comunidades.service';

export default function BuscarComunidades() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [comunidadesFiltradas, setComunidadesFiltradas] = useState([]);
  const [error, setError] = useState('');

  function filtrarComunidades() {
    setComunidadesFiltradas((comunidades) =>
      comunidades.filter((comunidad) =>
        comunidad.nombre.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    );
  }

  async function fetchData() {
    try {
      const response = await getComunidades();
      const todasLasComunidades = response;
      setComunidadesFiltradas(todasLasComunidades);
    } catch (errorGet) {
      setError(
        'Error al obtener las comunidades. Por favor, inténtalo de nuevo.',
      );
    }
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
      // filtrarComunidades();
    } else if (busqueda.trim() !== '') {
      fetchDataByName();
      setError('');
    }
  }

  function handleRedireccionarComunidad(nombre) {
    const comunidadSeleccionada = comunidadesFiltradas.find(
      (comunidad) => comunidad.nombre === nombre,
    );

    if (comunidadSeleccionada) {
      navigate(`/comunidad/${nombre}`, {
        state: {
          nombre,
          descripcion: comunidadSeleccionada.descripcion,
          fechaInicio: comunidadSeleccionada.fechaInicio,
        },
      });
    }
  }

  return (
    <div id="PaginaBuscarComunidades">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/listaComunidades">
            Comunidades
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container">
        <h1>Buscar Comunidades</h1>
        <form onSubmit={handleBuscarComunidades}>
          <div className="mb-3">
            <label htmlFor="busqueda" className="form-label">
              Nombre de la comunidad
            </label>
            <input
              type="text"
              className="form-control"
              id="busqueda"
              placeholder="Buscar comunidad..."
              value={busqueda}
              onChange={handleBusquedaInput}
            />
            <label>{error}</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Buscar comunidades
          </button>
        </form>

        {comunidadesFiltradas.length > 0 && (
          <Stack gap={1}>
            <h2 className="mt-4">Comunidades encontradas:</h2>
            {comunidadesFiltradas?.map((comunidad, index) => (
              <div className="p-2 comunidad-item" key={index}>
                {comunidad.nombre}
                <button
                  className="btn btn-secondary btn-sm ms-2"
                  onClick={() => handleRedireccionarComunidad(comunidad.nombre)}
                >
                  <i className="fas fa-eye"></i> Ver Detalles
                </button>
              </div>
            ))}
          </Stack>
        )}

        {comunidadesFiltradas.length === 0 && (
          <p>
            {error ||
              'No se encontraron comunidades que coincidan con la búsqueda.'}
          </p>
        )}
      </div>
    </div>
  );
}
