import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './Style/CardExternalProfile.css';

export default function CardExternalProfile({
  imageUrl,
  username,
  telefono,
  correo,
  onSeguirUsuarioClicked,
  role,
}) {
  return (
    <div className="m-5">
      <Card className="w-50 m-auto">
        <Card.Body>
          <Row>
            <Col>
              <Card.Img className="w-50 m-auto" src={imageUrl} alt="Perfil" />
            </Col>
            <Col>
              <h5 className="card-title">Perfil del usuario {username}</h5>
              <Card.Text>Role: {role}</Card.Text>
              <Card.Text>Teléfono: {telefono}</Card.Text>
              <Card.Text>Correo electrónico: {correo}</Card.Text>
              <Button variant="primary" size="sm">
                {' '}
                Seguir al usuario{' '}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
