import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useState, useCallback, useEffect } from 'react';
import { getComunidadById } from '../../services/comunidades.service';
import { saveCausa } from '../../services/causas.service';
import './CausaSolidaria.css';
import ErrorMessage from '../../component/MensajeError';
import { createApoyo } from '../../services/apoyo_causa.service';
import {
  HTTP_STATUS_UNAUTHORIZED,
  alertErrorMessage,
  checkResponseStatusCode,
} from '../../utils/utils';

export default function Causa() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const [tituloError, setTituloError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');

  const opciones = [
    {
      nombre: 'Fin de la pobreza',
      imagen: `../../../imagenes/S_SDG_Icons-01-01.jpg`,
    },
    {
      nombre: 'Hambre cero',
      imagen: `../../../imagenes/S_SDG_Icons-01-02.jpg`,
    },
    {
      nombre: 'Salud y bienestar',
      imagen: `../../../imagenes/S_SDG_Icons-01-03.jpg`,
    },
    {
      nombre: 'Educación de calidad',
      imagen: `../../../imagenes/S_SDG_Icons-01-04.jpg`,
    },
    {
      nombre: 'Igualdad de género',
      imagen: `../../../imagenes/S_SDG_Icons-01-05.jpg`,
    },
    {
      nombre: 'Agua limpia y saneamiento',
      imagen: `../../../imagenes/S_SDG_Icons-01-06.jpg`,
    },
    {
      nombre: 'Energía asequible y no contaminante',
      imagen: `../../../imagenes/S_SDG_Icons-01-07.jpg`,
    },
    {
      nombre: 'Trabajo decente y crecimiento económico',
      imagen: `../../../imagenes/S_SDG_Icons-01-08.jpg`,
    },
    {
      nombre: 'Industria, innovación e infraestructura',
      imagen: `../../../imagenes/S_SDG_Icons-01-09.jpg`,
    },
    {
      nombre: 'Reducción de las desigualdades',
      imagen: `../../../imagenes/S_SDG_Icons-01-10.jpg`,
    },
    {
      nombre: 'Ciudades y comunidades sostenibles',
      imagen: `../../../imagenes/S_SDG_Icons-01-11.jpg`,
    },
    {
      nombre: 'Producción y consumo responsables',
      imagen: `../../../imagenes/S_SDG_Icons-01-12.jpg`,
    },
    {
      nombre: 'Acción por el clima',
      imagen: `../../../imagenes/S_SDG_Icons-01-13.jpg`,
    },
    {
      nombre: 'Vida submarina',
      imagen: `../../../imagenes/S_SDG_Icons-01-14.jpg`,
    },
    {
      nombre: 'Vida de ecosistemas terrestres',
      imagen: `../../../imagenes/S_SDG_Icons-01-15.jpg`,
    },
    {
      nombre: 'Paz, justicia e instituciones sólidas',
      imagen: `../../../imagenes/S_SDG_Icons-01-16.jpg`,
    },
    {
      nombre: 'Alianzas para lograr los objetivos',
      imagen: `../../../imagenes/S_SDG_Icons-01-17.jpg`,
    },
  ];

  const [objetivos, setObjetivos] = useState([]);

  const handleSelect = (option) => {
    const selectedIndex = objetivos.indexOf(option);
    if (selectedIndex === -1) {
      setObjetivos([...objetivos, option]);
    } else {
      const newSelected = [...objetivos];
      newSelected.splice(selectedIndex, 1);
      setObjetivos(newSelected);
    }
  };

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

    if (titulo === '' || titulo.trim() === '') {
      setTituloError('El titulo no puede estar vacío');
      return;
    }

    if (descripcion === '' || descripcion.trim() === '') {
      setDescripcionError('La descripción no puede estar vacía');
      return;
    }

    if (fechaInicio === '' || fechaInicio.trim() === '') {
      setFechaInicioError('La fecha de inicio no puede estar vacía');
      return;
    }

    if (fechaFin === '' || fechaFin.trim() === '') {
      setFechaFinError('La fecha de fin no puede estar vacía');
      return;
    }

    const response = await saveCausa(
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
      param.idComunidad,
      objetivos,
    );

    if (!checkResponseStatusCode(response)) {
      alertErrorMessage(response);
      if (response.status === HTTP_STATUS_UNAUTHORIZED) navigate(`/login`);
      return;
    }

    if (response.status === 201) {
      const data = await response.json();
      const crearApoyo = await createApoyo(data.id);
      if (crearApoyo === undefined) {
        alert('No se ha podido crear el apoyo');
      } else {
        navigate(`/causa/${data.id}`);
      }
    }
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

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  function onComunidadClicked() {
    navigate(`/comunidades/${param.idComunidad}`, { replace: true });
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
        <Breadcrumb.Item active>Crear causa solidaria</Breadcrumb.Item>
      </Breadcrumb>
      <div id="PaginaCausaSolidaria" className="mb-5">
        <h1>Crear una nueva causa solidaria</h1>
        <Form className="needs-validation" noValidate onSubmit={CausaSolidaria}>
          <Col sd={10} md={10} lg={8} className="mx-auto">
            <Form.Group controlId="titulo" className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título de la causa solidaria"
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

            <Form.Group controlId="objetivos" className="mb-3">
              <Form.Label>
                Objetivos de desarrollo sostenible relacionados
              </Form.Label>
              <Row xs={1} md={3} className="g-4">
                {opciones.map((opcion, index) => (
                  <Col key={index}>
                    <Form.Check
                      type="checkbox"
                      label={
                        <div>
                          <img
                            src={opcion.imagen}
                            alt={opcion.nombre}
                            style={{ width: '100px', height: '100px' }} // Tamaño ajustable
                          />
                        </div>
                      }
                      checked={objetivos.includes(opcion.nombre)}
                      onChange={() => handleSelect(opcion.nombre)}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>

            <div className="mb-3 text-center">
              <Button type="submit" className="btn btn-primary">
                Crear causa solidaria
              </Button>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}
