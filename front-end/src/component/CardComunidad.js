import './Style/CardComunidad.css';
import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Solicitud from '../pages/Solicitud/Solicitud';
import Apoyo from '../pages/ApoyarCausa/Apoyo';

export default function CardComunidad({
  imageUrl,
  id,
  nombre,
  descripcion,
  fechaInicio,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowApoyo, setModalShowApoyo] = useState(false);

  function showModal() {
    setModalShow(true);
  }

  function showModalApoyo() {
    setModalShowApoyo(true);
  }

  return (
    <Card id="cardComunidad" className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={12} md={4}>
            <Card.Img
              variant="top"
              src={imageUrl}
              alt="comunidad"
              className="img-fluid img-thumbnail"
            />
          </Col>

          <Col xs={12} md={6}>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>Descripción: {descripcion}</Card.Text>
            <Card.Text>Fecha de creación: {fechaInicio}</Card.Text>
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex align-items-center justify-content-md-end"
          ></Col>
        </Row>
      </Card.Body>

      <Card.Footer>
        <Button variant="primary" size="sm" onClick={showModal}>
          Solicitar
        </Button>
        <Solicitud
          show={modalShow}
          onHide={() => setModalShow(false)}
          idComunidad={id}
          nombreComunidad={nombre}
        />
        <Button
          type="button"
          className="btn btn-primary"
          onClick={showModalApoyo}
        >
          Apoyar
        </Button>
        <Apoyo
          show={modalShowApoyo}
          onHide={() => setModalShowApoyo(false)}
          nombreCausa="Cambiar Aqui por el nombre del causa"
        />
      </Card.Footer>
    </Card>
  );
}

export function CardListaComunidad({ imageUrl, nombre, handleRedireccionar }) {
  return (
    <Card id="cardComunidad" className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={6} md={6}>
            <Card.Img
              variant="top"
              src={imageUrl}
              alt="comunidad"
              className="img-fluid img-thumbnail"
            />
          </Col>

          <Col xs={6} md={6}>
            <Card.Title>{nombre}</Card.Title>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer>
        <Button variant="primary" size="sm" onClick={handleRedireccionar}>
          Ver detalles
        </Button>
      </Card.Footer>
    </Card>
  );
}
