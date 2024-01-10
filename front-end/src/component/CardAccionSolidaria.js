import './Style/CardAccionSolidaria.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';

const CardAccionSolidaria = ({
  idAccion,
  imageUrl,
  titulo,
  descripcion,
  listaObjetivos,
  progreso,
  detalles,
}) => {
  let objetivos = [];
  const navigate = useNavigate();

  if (listaObjetivos !== undefined) {
    objetivos = listaObjetivos.join(', ');
  }

  function handleRedireccionAAccion() {
    if (titulo !== ' ') {
      navigate(`/accion/${idAccion}`, { replace: true });
    }
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

          <Col xs={12} md={6} className="m-auto">
            <Card.Title>{titulo}</Card.Title>
            {descripcion && <Card.Text>Descripción: {descripcion}</Card.Text>}
            {progreso && <Card.Text>Progreso: {progreso}%</Card.Text>}
            {listaObjetivos && (
              <Card.Text>Objetivos: {objetivos || []}</Card.Text>
            )}
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex align-items-center justify-content-md-end"
          ></Col>
        </Row>
      </Card.Body>
      {detalles && (
        <Card.Footer>
          <Row>
            <Col xs={12} md={2} className="m-auto">
              <Button
                className="text-wrap"
                onClick={() => handleRedireccionAAccion()}
                variant="outline-secondary"
                size="sm"
              >
                Ver más detalles
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      )}
    </Card>
  );
};

export default CardAccionSolidaria;
