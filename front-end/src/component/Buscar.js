import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Busqueda({
  titulo,
  handleBuscar,
  handleBusquedaInput,
  error,
  busqueda,
}) {
  return (
    <div className="mb-4">
      <h5>Buscar {titulo}</h5>
      <Form onSubmit={handleBuscar}>
        <Row className="d-flex flex-wrap">
          <Col xs={12} md={8} lg={9} className="p-1">
            <input
              type="text"
              className="form-control"
              id="busqueda"
              placeholder="Filtrar por nombre..."
              value={busqueda}
              onChange={handleBusquedaInput}
            />
          </Col>
          <Col xs={12} md={4} lg={3} className="p-1">
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
