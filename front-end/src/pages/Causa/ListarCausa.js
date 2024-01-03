import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Stack } from 'react-bootstrap';
import { getCausas, getCausasByName } from '../../services/causas.service';
import Busqueda from '../../component/Buscar';

export default function BuscarCausas() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [causasFiltradas, setCausasFiltradas] = useState([]);
  const [error, setError] = useState('');

  /* function filtrarCausas() {
    setCausasFiltradas((causas) =>
      causas.filter((causa) =>
        causa.nombre.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    );
  } */

  function onHomeClicked() {
    navigate('/');
  }

  function onCausasClicked() {
    navigate('/listaCausas');
  }

  async function fetchData() {
    try {
      const response = await getCausas();
      const todasLasCausas = response;
      setCausasFiltradas(todasLasCausas);
    } catch (errorGet) {
      setError('Error al obtener las causas. Por favor, inténtalo de nuevo.');
    }
  }

  async function fetchDataByName() {
    try {
      const response = await getCausasByName(busqueda);
      const causa = response ? [response] : [];
      setCausasFiltradas(causa);
    } catch (errorGet) {
      setError('No se encontraron causas que coincidan con la búsqueda.');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleBusquedaInput(event) {
    setBusqueda(event.target.value);
  }

  function handleBuscarCausas(event) {
    event.preventDefault();

    if (busqueda.trim() === '') {
      fetchData();
    } else if (busqueda.trim() !== '') {
      fetchDataByName();
      setError('');
    }
  }

  function handleRedireccionarCausa(nombre) {
    const causaSeleccionada = causasFiltradas.find(
      (causa) => causa.nombre === nombre,
    );

    if (causaSeleccionada) {
      navigate(`/causa/${causaSeleccionada.titulo}`, {
        state: {
          titulo: causaSeleccionada.titulo,
          descripcion: causaSeleccionada.descripcion,
          fechaInicio: causaSeleccionada.fechaInicio,
          fechaFin: causaSeleccionada.fechaFin,
          accionSolidaria: causaSeleccionada.accionSolidaria,
          idComunidad: causaSeleccionada.idComunidad,
        },
      });
    }
  }

  return (
    <div>
      <div>
        <Breadcrumb className="p-2">
          <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Causas-solidarias</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container">
        <Busqueda
          titulo={'causas'}
          handleBuscar={handleBuscarCausas}
          handleBusquedaInput={handleBusquedaInput}
          error={error}
        />
        {causasFiltradas.length > 0 && (
          <Stack gap={1}>
            <h2>Causas encontradas:</h2>
            {causasFiltradas?.map((elemento, index) => (
              <div className="p-1 elemento-item" key={index}>
                {elemento.titulo}
                <button
                  className="btn btn-secondary btn-sm ms-2"
                  onClick={() => handleRedireccionarCausa(elemento.nombre)}
                >
                  <i className="fas fa-eye"></i> Ver Detalles
                </button>
              </div>
            ))}
          </Stack>
        )}
      </div>
    </div>
  );
}
