import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Apoyo from '../pages/ApoyarCausa/Apoyo';
import './Style/CardCausaSolidaria.css';

const CardCausaSolidaria = ({
  imageUrl,
  idCausa,
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  objetivos,
  detalles,
  apoyar,
}) => {
  const navigate = useNavigate();
  const [modalShowApoyo, setModalShowApoyo] = useState(false);

  function handleRedireccionarACausa() {
    if (titulo !== ' ') {
      navigate(`/causa/${idCausa}`, { replace: true });
    }
  }

  function showModalApoyo() {
    setModalShowApoyo(true);
  }

  let lista = [];

  if (objetivos !== undefined) {
    lista = objetivos.join(', ');
  }

  return (
    <Card id="cardCausa" className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={12} md={4}>
            <Card.Img
              variant="top"
              src={imageUrl}
              alt="causa-solidaria"
              className="img-fluid img-thumbnail"
            />
          </Col>

          <Col xs={12} md={6} className="m-auto">
            <Card.Title>{titulo}</Card.Title>
            {descripcion && <Card.Text>Descripción: {descripcion}</Card.Text>}
            {fechaInicio && (
              <Card.Text>Fecha de inicio: {fechaInicio}</Card.Text>
            )}
            {fechaFin && <Card.Text>Fecha de fin: {fechaFin}</Card.Text>}
            {objetivos && <Card.Text>Objetivos DS: {lista || []}</Card.Text>}
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex align-items-center justify-content-md-end"
          ></Col>
        </Row>
      </Card.Body>

      <Card.Footer>
        <Row>
          {apoyar && (
            <Col xs={12} md={2} className="m-auto">
              <Button
                type="button"
                variant="outline-primary"
                size="sm"
                onClick={showModalApoyo}
              >
                Apoyar
              </Button>
            </Col>
          )}
          {detalles && (
            <Col xs={12} md={2} className="m-auto">
              <Button
                onClick={handleRedireccionarACausa}
                variant="outline-secondary"
                size="sm"
                className="text-nowrap"
              >
                Ver más detalles
              </Button>
            </Col>
          )}
        </Row>
        <Apoyo
          show={modalShowApoyo}
          onHide={() => setModalShowApoyo(false)}
          idCausa={idCausa}
        />
      </Card.Footer>
    </Card>
  );
};

export default CardCausaSolidaria;
