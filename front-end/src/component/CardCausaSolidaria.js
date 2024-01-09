import './Style/CardCausaSolidaria.css';
import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Apoyo from '../pages/ApoyarCausa/Apoyo';

const CardCausaSolidaria = ({
  imageUrl,
  idCausa,
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  objetivos,
  accionSolidaria,
  idComunidad,
}) => {
  const [modalShowApoyo, setModalShowApoyo] = useState(false);

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

          <Col xs={12} md={6}>
            <Card.Title>{titulo}</Card.Title>
            <Card.Text>Descripción: {descripcion}</Card.Text>
            <Card.Text>Fecha de inicio: {fechaInicio}</Card.Text>
            <Card.Text>Fecha de fin: {fechaFin}</Card.Text>
            <Card.Text>Objetivos DS: {lista || []}</Card.Text>
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex align-items-center justify-content-md-end"
          ></Col>
        </Row>
      </Card.Body>

      <Card.Footer>
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
          idCausa={idCausa}
        />
      </Card.Footer>
    </Card>
  );
};

export default CardCausaSolidaria;
