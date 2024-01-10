import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './Style/CardExternalProfile.css';

export default function CardExternalProfile({
  index,
  imageUrl,
  nombre,
  onSeguirUsuarioClicked,
}) {
  return (
    <div className="m-5">
      <Card className="w-50 m-auto">
        <Card.Body key={index}>
          <Row xs={1} md={2} lg={2} className="g-4">
            <Col>
              <Card.Img className="w-50 m-auto" src={imageUrl} alt="Perfil" />
            </Col>
            <Col>
              <h5 className="card-title">Perfil del usuario</h5>
              <Card.Text>Nombre: {nombre}</Card.Text>
              <Button variant="primary" size="sm">
                Seguir al usuario
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
