import './Style/CardComunidad.css';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Solicitud from '../pages/Solicitud/Solicitud';

export default function CardComunidad({
  imageUrl,
  id,
  nombre,
  descripcion,
  fechaInicio,
  usersData,
  handleRedireccionar,
  detalles,
  btnSolicitar,
  solicitud,
}) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const idActual = useSelector((state) => state.user.userInfo.id);

  function showModal() {
    if (idActual === undefined) {
      navigate('/login');
    } else {
      setModalShow(true);
    }
  }

  async function refreshOnCloseModal() {
    setModalShow(false);
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
        {btnSolicitar && (
          <Button type="button" className="btn btn-primary" onClick={showModal}>
            Solicitar
          </Button>
        )}
        {detalles && (
          <Button variant="primary" size="sm" onClick={handleRedireccionar}>
            Ver detalles
          </Button>
        )}
        {solicitud && (
          <Solicitud
            show={modalShow}
            onHide={() => refreshOnCloseModal()}
            idComunidad={id}
            nombreComunidad={nombre}
            usersData={usersData}
          />
        )}
      </Card.Footer>
    </Card>
  );
}

export function CardListaComunidad({
  imageUrl,
  nombre,
  descripcion,
  handleRedireccionar,
  miembros,
}) {
  return (
    <Card id="cardListaComunidad" className="mb-3">
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
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex align-items-center justify-content-md-end"
          ></Col>
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
