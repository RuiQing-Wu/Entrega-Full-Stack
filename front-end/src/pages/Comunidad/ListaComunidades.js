import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuscarComunidades() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [comunidadesFiltradas, setComunidadesFiltradas] = useState([]);
  const [error, setError] = useState('');
  const [mostrarError, setMostrarError] = useState(false);

  const todasLasComunidades = [
    {
      id: 1,
      nombre: 'Comunidad1',
      descripcion: 'Descripción de la Comunidad1',
    },
    {
      id: 2,
      nombre: 'Comunidad2',
      descripcion: 'Descripción de la Comunidad2',
    },
  ];

  function handleBusquedaInput(event) {
    setBusqueda(event.target.value);
  }

  function filtrarComunidades() {
    setComunidadesFiltradas(
      todasLasComunidades.filter((comunidad) =>
        comunidad.nombre.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    );
  }

  function handleBuscarComunidades(event) {
    event.preventDefault();

    if (busqueda.trim() === '') {
      setMostrarError(false);
      setError('Por favor, introduce un término de búsqueda.');
      return;
    }

    setMostrarError(true);
    setError('');
    filtrarComunidades();
  }

  function handleRedireccionarComunidad(nombre) {
    const comunidadSeleccionada = todasLasComunidades.find(
      (comunidad) => comunidad.nombre === nombre,
    );

    if (comunidadSeleccionada) {
      navigate(`/comunidad/${nombre}`, {
        state: {
          nombre,
          descripcion: comunidadSeleccionada.descripcion,
        },
      });
    }
  }

  return (
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
        <div className="mt-3">
          <h2>Comunidades encontradas:</h2>
          <ul>
            {comunidadesFiltradas.map((comunidad) => (
              <li key={comunidad.id}>
                {comunidad.nombre}
                <button
                  className="btn btn-secondary btn-sm ms-2"
                  onClick={() => handleRedireccionarComunidad(comunidad.nombre)}
                >
                  Ver Detalles
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {comunidadesFiltradas.length === 0 && mostrarError && (
        <p>No se encontraron comunidades que coincidan con la búsqueda.</p>
      )}
    </div>
  );
}
