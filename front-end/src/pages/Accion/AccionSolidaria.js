import { Navigate, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Col, Breadcrumb, ProgressBar } from 'react-bootstrap';
import './AccionSolidaria.css';
import ErrorMessage from '../../component/MensajeError';
import { saveAccion } from '../../services/acciones.service';
import { getCausaById } from '../../services/causas.service';
import { getComunidadById } from '../../services/comunidades.service';
import { checkResponseStatusCode, alertErrorMessage } from '../../utils/utils';

export default function Accion() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [progreso, setProgreso] = useState(0);
  const [tituloError, setTituloError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [objetivoError, setObjetivoError] = useState('');
  const [progresoError, setProgresoError] = useState('');
  const [causa, setCausa] = useState([]);
  const [comunidad, setComunidad] = useState([]);
  const param = useParams();

  function onHomeClicked() {
    navigate('/');
  }

  function onCausaClicked() {
    navigate(`/causa/${param.idCausa}`);
  }

  function onComunidadClicked() {
    navigate(`/comunidades/${causa.comunidad}`);
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  function handleTituloInput(event) {
    setTitulo(event.target.value);
    setTituloError('');
  }

  function handleDescripcionInput(event) {
    setDescripcion(event.target.value);
    setDescripcionError('');
  }

  function handleObjetivoInput(event) {
    const { value } = event.target;
    setObjetivo(value);
    setObjetivoError('');

    // Separar los objetivos por coma y eliminar espacios en blanco alrededor de cada objetivo
    const objetivosArray = value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    setObjetivos(objetivosArray);
  }

  function handleProgresoInput(event) {
    setProgreso(event.target.value);
    setProgresoError('');
  }

  const fetchCausa = useCallback(async () => {
    const response = await getCausaById(param.idCausa);
    if (!checkResponseStatusCode(response)) {
      if (response.status === 401) {
        navigate('/login');
      }

      if (response.status === 404) {
        navigate('/error');
      }
      setCausa([]);
      return;
    }
    const data = await response.json();
    setCausa(data);
  }, [param.idCausa]);

  const fetchComunidad = useCallback(async () => {
    if (causa.comunidad === undefined) return;
    const response = await getComunidadById(causa.comunidad);
    if (!checkResponseStatusCode(response)) {
      setComunidad([]);
      if (response.status === 401) {
        navigate('/login');
      }

      if (response.status === 404) {
        navigate('/error');
      }
      return;
    }
    const data = await response.json();
    setComunidad(data);
  }, [causa.comunidad]);

  useEffect(() => {
    if (causa && causa.comunidad) {
      fetchComunidad();
    }
  }, [fetchComunidad, causa]);

  useEffect(() => {
    fetchCausa();
  }, [fetchCausa]);

  async function AccionSolidaria(event) {
    event.preventDefault();

    if (titulo === '' || titulo.trim() === '') {
      setTituloError('El título no puede estar vacío');
      return;
    }

    if (descripcion === '' || descripcion.trim() === '') {
      setDescripcionError('La descripción no puede estar vacía');
      return;
    }

    if (objetivos.length === 0 || objetivos[0] === '') {
      setObjetivoError('Se debe añadir al menos un objetivo');
      return;
    }

    if (progreso === '' || progreso.trim() === '') {
      setProgresoError('El progreso no puede estar vacío');
      return;
    }

    const response = await saveAccion(
      titulo,
      descripcion,
      objetivos,
      progreso,
      param.idCausa,
    );

    if (!checkResponseStatusCode(response)) {
      alertErrorMessage(response);
      return;
    }

    if (response.status === 201) {
      const data = await response.json();
      navigate(`/accion/${data.id}`, { replace: true });
    }
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onComunidadesClicked}>
          Comunidades
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={onComunidadClicked}>
          {comunidad.nombre}
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={onCausaClicked}>
          {causa.titulo}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Crear acción solidaria</Breadcrumb.Item>
      </Breadcrumb>
      <div id="PaginaAccionSolidaria">
        <h1>Crear una nueva acción solidaria</h1>
        <Form
          className="needs-validation"
          noValidate
          onSubmit={AccionSolidaria}
        >
          <Col sd={10} md={10} lg={8} className="mx-auto">
            <Form.Group controlId="titulo" className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título de la acción solidaria"
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

            <Form.Group controlId="objetivos" className="mb-3">
              <Form.Label>Objetivos</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className={`form-control ${objetivoError ? 'is-invalid' : ''} ${
                  objetivo && !objetivoError ? 'is-valid' : ''
                }`}
                placeholder="Objetivo de la acción solidaria"
                onChange={handleObjetivoInput}
                value={objetivo}
                required
              />
              <div className="invalid-feedback">
                <ErrorMessage message={objetivoError} />
              </div>
            </Form.Group>

            <Form.Group controlId="progreso" className="mb-3">
              <Form.Label>Progreso de la acción solidaria</Form.Label>
              <div>
                <ProgressBar
                  now={progreso}
                  label={`${progreso}%`}
                  striped
                  animated
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progreso}
                  onChange={handleProgresoInput}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="invalid-feedback">
                <ErrorMessage message={progresoError} />
              </div>
            </Form.Group>

            <div className="mb-3 text-center">
              <Button type="submit" className="btn btn-primary">
                Crear
              </Button>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}
