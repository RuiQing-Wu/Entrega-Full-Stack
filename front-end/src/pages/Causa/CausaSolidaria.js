import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './CausaSolidaria.css';

export default function Causa() {
  // Crear un hook para navegar entre páginas
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const [tituloError, setTituloError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');

  function handleTituloInput(event) {
    setTitulo(event.target.value);
  }

  function handleDescripcionInput(event) {
    setDescripcion(event.target.value);
  }

  function handleFechaInicioInput(event) {
    setFechaInicio(event.target.value);
  }

  function handleFechaFinInput(event) {
    setFechaFin(event.target.value);
  }

  async function CausaSolidaria(event) {
    // eslint-disable-next-line no-console
    console.log('Causa');
    event.preventDefault();

    // Resetear los errores
    setTituloError('');
    setDescripcionError('');
    setFechaInicioError('');
    setFechaFinError('');

    // Validar que el usuario y la contraseña no estén vacíos
    if (titulo === '') {
      setTituloError('El titulo no puede estar vacío');
      return;
    }

    if (descripcion === '') {
      setDescripcionError('La descripción no puede estar vacía');
      return;
    }

    if (fechaInicio === '') {
      setFechaInicioError('La fecha de inicio no puede estar vacía');
      return;
    }

    if (fechaFin === '') {
      setFechaFinError('La fecha de fin no puede estar vacía');
      return;
    }

    // TODO Llamar a la API para iniciar sesión
    // const response = await loginUser(username, password);

    // TODO PROCESAR LA RESPUESTA DE LA API

    // Navegar a la página de inicio
    navigate('/verCausa', {
      state: {
        titulo,
        descripcion,
        fechaInicio,
        fechaFin,
      },
    });
  }

  return (
    <div id="PaginaCausaSolidaria" className="container">
      <h1>Causa solidaria</h1>
      <form className="needs-validation" noValidate onSubmit={CausaSolidaria}>
        <div className="form-group mb-3">
          <label htmlFor="titulo" className="form-label">
            Titulo
          </label>
          <input
            type="text"
            id="titulo"
            className={`form-control ${tituloError ? 'is-invalid' : ''} ${
              titulo && !tituloError ? 'is-valid' : ''
            }`}
            placeholder="Titulo de la causa solidaria"
            onChange={handleTituloInput}
            value={titulo}
            required
          />
          <div className="invalid-feedback">{tituloError}</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className={`form-control ${descripcionError ? 'is-invalid' : ''} ${
              descripcion && !descripcionError ? 'is-valid' : ''
            }`}
            id="descripcion"
            rows="3"
            onChange={handleDescripcionInput}
            value={descripcion}
            required
          ></textarea>
          <div className="invalid-feedback">{descripcionError}</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fechaInicio" className="form-label">
            Fecha de inicio
          </label>
          <input
            type="date"
            className={`form-control ${fechaInicioError ? 'is-invalid' : ''} ${
              fechaInicio && !fechaInicioError ? 'is-valid' : ''
            }`}
            id="fechaInicio"
            onChange={handleFechaInicioInput}
          />
          <div className="invalid-feedback">{fechaInicioError}</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fechaFin" className="form-label">
            Fecha de fin
          </label>
          <input
            type="date"
            className={`form-control ${fechaFinError ? 'is-invalid' : ''} ${
              fechaFin && !fechaFinError ? 'is-valid' : ''
            }`}
            id="fechaFin"
            onChange={handleFechaFinInput}
          />
          <div className="invalid-feedback">{fechaFinError}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
