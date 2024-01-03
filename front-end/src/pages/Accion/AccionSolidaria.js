import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import './AccionSolidaria.css';
import ErrorMessage from '../../component/MensajeError';

export default function Accion() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [objetivos, setObjetivos] = useState([]);
  const [progreso, setProgreso] = useState(0);

  const [tituloError, setTituloError] = useState('');
  const [objetivoError, setObjetivoError] = useState('');
  const [progresoError, setProgresoError] = useState('');

  function handleTituloInput(event) {
    setTitulo(event.target.value);
    setTituloError('');
  }

  function handleObjetivoInput(event) {
    const { value } = event.target;
    setObjetivo(value);
    setObjetivoError('');

    // Separar los objetivos por coma si hay comas, de lo contrario, usar el valor como un solo objetivo
    const objetivosArray = value
      .split(',')
      .map((item) => objetivo.trim())
      .filter((item) => objetivo !== '');

    setObjetivos(objetivosArray);
  }

  function handleProgresoInput(event) {
    setProgreso(event.target.value);
    setProgresoError('');
  }

  async function AccionSolidaria(event) {
    event.preventDefault();

    if (titulo === '') {
      setTituloError('El título no puede estar vacío');
      return;
    }

    if (objetivos.length === 0 || objetivos[0] === '') {
      setObjetivoError('Se debe añadir al menos un objetivo');
    }

    if (progreso === '') {
      setProgresoError('El progreso no puede estar vacío');
    }

    navigate('/verAcciones', {
      state: {
        titulo,
        objetivos,
        progreso,
      },
    });
  }

  function onHomeClicked() {
    navigate('/');
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Crear-accion-solidaria</Breadcrumb.Item>
      </Breadcrumb>
      <div id="PaginaAccionSolidaria" className="container mt-4">
        <h1>Acción solidaria</h1>
        <form
          className="needs-validation"
          noValidate
          onSubmit={AccionSolidaria}
        >
          <div className="form-group mb-3">
            <label htmlFor="titulo" className="form-label">
              Título de la acción solidaria
            </label>
            <input
              type="text"
              id="titulo"
              className={`form-control ${tituloError ? 'is-invalid' : ''} ${
                titulo && !tituloError ? 'is-valid' : ''
              }`}
              placeholder="Titulo de la acción solidaria"
              onChange={handleTituloInput}
              value={titulo}
              required
            />
            <div className="invalid-feedback">
              {<ErrorMessage message={tituloError} />}
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="objetivo" className="form-label">
              Objetivos de la acción solidaria
            </label>
            <input
              type="text"
              id="objetivo"
              className={`form-control ${objetivoError ? 'is-invalid' : ''} ${
                objetivo && !objetivoError ? 'is-valid' : ''
              }`}
              placeholder="Objetivo de la acción solidaria"
              onChange={handleObjetivoInput}
              value={objetivo}
              required
            />
            <div className="invalid-feedback">
              {<ErrorMessage message={objetivoError} />}
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="progreso" className="form-label">
              Progreso de la acción solidaria
            </label>
            <input
              type="range"
              id="progreso"
              className={`form-range ${progresoError ? 'is-invalid' : ''}`}
              min="0"
              max="100"
              step="1"
              onChange={handleProgresoInput}
              value={progreso}
              required
            />
            <output htmlFor="progreso">{progreso}%</output>
            <style>{`
        input[type='range'] {
          --value: ${((progreso - 0) * 100) / (100 - 0)}%;
          --track-color: #ddd;
          --thumb-color: #3498db;
          --range-background: linear-gradient(to right, var(--thumb-color) 0%, var(--thumb-color) var(--value), var(--track-color) var(--value), var(--track-color) 100%);
        }
        input[type='range']::-webkit-slider-runnable-track {
          background: var(--range-background);
        }
        input[type='range']::-moz-range-track {
          background: var(--range-background);
        }
        input[type='range']::-ms-track {
          background: var(--range-background);
        }
      `}</style>
            <div className="invalid-feedback">
              {<ErrorMessage message={progresoError} />}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
