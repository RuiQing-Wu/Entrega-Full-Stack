import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home({ comunidades = [] }) {
  const navigate = useNavigate();

  function handleRedireccionAComunidades() {
    navigate('/listaComunidades');
  }

  return (
    <div className="d-flex flex-column justify-content-center">
      <Row className="bg-info-subtle">
        <Col className="p-5">
          <h1>SolidarianID</h1>
          <h6>Conectando con los más necesitados</h6>
        </Col>
      </Row>
      <Row className="bg-dark-subtle p-5">
        <Col>
          <h4>Quienes somos</h4>
          <p>
            SolidarianID es una plataforma destinada a fomentar la participación
            de ciudadanos de todos los países en acciones solidarias. Nuestros
            usuarios podrán organizarse en comunidades para fomentar la
            interacción y colaboración entre ellos.
          </p>
        </Col>
      </Row>
      <Row className="bg-light p-5">
        <Col>
          <h5>Navega entre las comunidades de nuestra web</h5>
          <Button
            onClick={() => handleRedireccionAComunidades()}
            variant="outline-info"
            size="sm"
          >
            Ver comunidades
          </Button>
        </Col>
      </Row>
    </div>
  );
}
