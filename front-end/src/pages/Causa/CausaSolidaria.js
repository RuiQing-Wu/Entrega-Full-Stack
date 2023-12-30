import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './CausaSolidaria.css';
import ErrorMessage from '../../component/MensajeError';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Causa() {
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
    setTituloError('');
  }

  function handleDescripcionInput(event) {
    setDescripcion(event.target.value);
    setDescripcionError('');
  }

  function handleFechaInicioInput(event) {
    setFechaInicio(event.target.value);
    setFechaInicioError('');
  }

  function handleFechaFinInput(event) {
    setFechaFin(event.target.value);
    setFechaFinError('');
  }

  async function CausaSolidaria(event) {
    event.preventDefault();

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

    navigate(`/causa/${titulo}`, {
      state: {
        titulo,
        descripcion,
        fechaInicio,
        fechaFin,
      },
    });
  }

  return (
    <div id="PaginaCausaSolidaria" className="container mt-4">
      <h1>Causa solidaria</h1>
      <Form className="needs-validation" noValidate onSubmit={CausaSolidaria}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="titulo">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titulo de la causa solidaria"
              className={`form-control ${tituloError ? 'is-invalid' : ''} ${
                titulo && !tituloError ? 'is-valid' : ''
              }`}
              onChange={handleTituloInput}
              value={titulo}
              required
            />
            <div className="invalid-feedback">
              <ErrorMessage message={tituloError} />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className={`form-control ${
                descripcionError ? 'is-invalid' : ''
              } ${descripcion && !descripcionError ? 'is-valid' : ''}`}
              onChange={handleDescripcionInput}
              value={descripcion}
              required
            />
            <div className="invalid-feedback">
              <ErrorMessage message={descripcionError} />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="fechaInicio">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              className={`form-control ${
                fechaInicioError ? 'is-invalid' : ''
              } ${fechaInicio && !fechaInicioError ? 'is-valid' : ''}`}
              onChange={handleFechaInicioInput}
            />
            <div className="invalid-feedback">
              <ErrorMessage message={fechaInicioError} />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="fechaFin">
            <Form.Label>Fecha de fin</Form.Label>
            <Form.Control
              type="date"
              className={`form-control ${fechaFinError ? 'is-invalid' : ''} ${
                fechaFin && !fechaFinError ? 'is-valid' : ''
              }`}
              onChange={handleFechaFinInput}
            />
            <div className="invalid-feedback">
              <ErrorMessage message={fechaFinError} />
            </div>
          </Form.Group>
        </Row>

        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}
