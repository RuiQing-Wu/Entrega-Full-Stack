import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useState, useCallback, useEffect } from 'react';
import { getComunidadById } from '../../services/comunidades.service';
import { saveCausa } from '../../services/causas.service';
import './CausaSolidaria.css';
import ErrorMessage from '../../component/MensajeError';

export default function Causa() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tituloError, setTituloError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');
  const [comunidad, setComunidad] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

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

    const response = await saveCausa(
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
      param.idComunidad,
    );

    navigate(`/causa/${response.id}`, { replace: true });
  }

  const fetchComunidad = useCallback(async () => {
    const response = await getComunidadById(param.idComunidad);
    setComunidad(response);
  }, [param.idComunidad]);

  useEffect(() => {
    fetchComunidad();
  }, [fetchComunidad]);

  function onHomeClicked() {
    navigate('/');
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/comunidades">Comunidades</Breadcrumb.Item>
        <Breadcrumb.Item href={`/comunidad/${param.idComunidad}`}>
          {comunidad.nombre}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Crear-causa-solidaria</Breadcrumb.Item>
      </Breadcrumb>
      <div id="PaginaCausaSolidaria">
        <h1>Causa solidaria</h1>
        <Form className="needs-validation" noValidate onSubmit={CausaSolidaria}>
          <Col sd={10} md={10} lg={8} className="mx-auto">
            <Form.Group controlId="titulo" className="mb-3">
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

            <Form.Group controlId="descripcion" className="mb-3">
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

            <Form.Group controlId="fechaInicio" className="mb-3">
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

            <Form.Group controlId="fechaFin" className="mb-3">
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

            <div className="mb-3 text-center">
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}
