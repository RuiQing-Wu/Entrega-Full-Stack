import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Busqueda({
  titulo,
  handleBuscar,
  handleBusquedaInput,
  error,
  busqueda,
}) {
  const [filtro, setFiltro] = useState('nombre');

  const onSubmit = (event) => {
    event.preventDefault();
    handleBuscar(event);
  };

  const onFiltroChange = (event) => {
    const nuevoFiltro = event.target.value;
    setFiltro(nuevoFiltro);
  };

  return (
    <div className="container mb-4">
      <Form onSubmit={onSubmit}>
        <Row className="d-flex flex-wrap">
          <Col xs={12} md={8} lg={2} className="p-1">
            <Form.Group controlId="filtroSelect">
              <Form.Select value={filtro} onChange={onFiltroChange}>
                <option value="nombre">Filtrar por nombre</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={8} lg={6} className="p-1">
            <input
              type="text"
              className="form-control"
              id="busqueda"
              placeholder={`Buscar ${titulo} por ${filtro}...`}
              value={busqueda}
              onChange={handleBusquedaInput}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="p-1">
            <Button type="submit" className="btn btn-primary">
              Buscar {titulo}
            </Button>
          </Col>
        </Row>
      </Form>
      <label>{error}</label>
    </div>
  );
}
