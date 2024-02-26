import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Col, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { saveComunidad } from '../../services/comunidades.service';
import './Comunidad.css';
import ErrorMessage from '../../component/MensajeError';
import {
  alertErrorMessage,
  checkPageToNavigate,
  checkResponseStatusCode,
  dateToString,
} from '../../utils/utils';

export default function Comunidad() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const idUserActual = useSelector((state) => state.user.userInfo.id);

  function handleNombreInput(event) {
    setNombre(event.target.value);
    setNombreError('');
  }

  function handleCategoriasChange(event) {
    const options = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCategorias(selectedOptions);
  }

  function handleDescripcionInput(event) {
    setDescripcion(event.target.value);
    setDescripcionError('');
  }

  async function crearComunidad(event) {
    event.preventDefault();

    setNombreError('');
    setDescripcionError('');

    if (nombre === '' || nombre.trim() === '') {
      setNombreError('El nombre de la comunidad no puede estar vacío');
      return;
    }

    if (descripcion === '' || descripcion.trim() === '') {
      setDescripcionError(
        'La descripción de la comunidad no puede estar vacía',
      );
      return;
    }

    const formattedDate = dateToString();
    const response = await saveComunidad(
      nombre,
      descripcion,
      formattedDate,
      idUserActual,
      selectedCategorias,
    );

    if (!checkResponseStatusCode(response)) {
      alertErrorMessage(response);
      return;
    }

    if (response.status === 201) {
      const data = await response.json();
      navigate(`/comunidades/${data.id}`);
    }
  }

  function onHomeClicked() {
    navigate('/');
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/comunidades">Comunidades</Breadcrumb.Item>
        <Breadcrumb.Item active>Crear comunidad</Breadcrumb.Item>
      </Breadcrumb>
      <div id="PaginaComunidad">
        <h1>Crear una nueva comunidad</h1>
        <Form onSubmit={crearComunidad} className="needs-validation" noValidate>
          <Col sd={10} md={10} lg={8} className="mx-auto">
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label>Nombre de la comunidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la comunidad"
                className={`form-control ${nombreError ? 'is-invalid' : ''} ${
                  nombre && !nombreError ? 'is-valid' : ''
                }`}
                onChange={handleNombreInput}
                value={nombre}
                required
              />
              <div className="invalid-feedback">
                <ErrorMessage message={nombreError} />
              </div>
            </Form.Group>
            <Form.Group controlId="descripcion" className="mb-3">
              <Form.Label>Descripción de la comunidad</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción de la comunidad"
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
            <Form.Group controlId="categorias" className="mb-3">
              <Form.Label> Categorías de la comunidad </Form.Label>
              <Form.Select
                multiple
                value={selectedCategorias}
                onChange={handleCategoriasChange}
                required
              >
                <option value="medio_ambiente">Medio Ambiente</option>
                <option value="salud">Salud</option>
                <option value="desarrollo_social">Desarrollo Social</option>
                <option value="educacion">Educación</option>
              </Form.Select>
            </Form.Group>
            <div className="mb-3 text-center">
              <Button type="submit" className="btn btn-primary">
                Crear comunidad
              </Button>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}
