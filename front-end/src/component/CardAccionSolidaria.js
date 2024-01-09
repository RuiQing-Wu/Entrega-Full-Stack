import './Style/CardAccionSolidaria.css';
import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const CardAccionSolidaria = ({
  imageUrl,
  titulo,
  descripcion,
  listaObjetivos,
  progreso,
}) => {
  let objetivos = [];

  if (listaObjetivos !== undefined) {
    objetivos = listaObjetivos.join(', ');
  }

  return (
    <Card id="cardAccion" className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={12} md={4}>
            <Card.Img
              variant="top"
              src={imageUrl}
              alt="accion-solidaria"
              className="img-fluid img-thumbnail"
            />
          </Col>

          <Col xs={12} md={6}>
            <Card.Title>{titulo}</Card.Title>
            <Card.Text>Descripción: {descripcion}</Card.Text>
            <Card.Text>Progreso: {progreso}%</Card.Text>
            <Card.Text>Objetivos: {objetivos || []}</Card.Text>
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex align-items-center justify-content-md-end"
          ></Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CardAccionSolidaria;
