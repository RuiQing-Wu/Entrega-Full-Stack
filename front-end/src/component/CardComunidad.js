import './Style/CardComunidad.css';
import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Solicitud from '../pages/Solicitud/Solicitud';

export default function CardComunidad({
  imageUrl,
  nombre,
  descripcion,
  fechaInicio,
}) {
  const [modalShow, setModalShow] = useState(false);
  function showModal() {
    setModalShow(true);
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
          >
            <Button variant="primary" size="sm" onClick={showModal}>
              Solicitar
            </Button>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer>
        <Solicitud
          show={modalShow}
          onHide={() => setModalShow(false)}
          nombreUsuario="Cambiar Aqui por el nombre del usuario"
          nombreComunidad="Cambiar Aqui por el nombre de la comunidad"
        />
      </Card.Footer>
    </Card>
  );
}
