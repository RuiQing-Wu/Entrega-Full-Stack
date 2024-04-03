import './Style/CardAccionSolidaria.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Contribucion from '../pages/ApoyarAccion/ApoyoAccion';
import Pasarela from '../pages/ApoyarAccion/PasarelaApoyoAccion';
import { crearContribucionAccion } from '../services/contribucion_accion.service';
import { actualizarProgresoAccion } from '../services/acciones.service';
import {
  HTTP_STATUS_UNAUTHORIZED,
  alertErrorMessage,
  checkResponseStatusCode,
} from '../utils/utils';

const CardAccionSolidaria = ({
  idAccion,
  imageUrl,
  titulo,
  descripcion,
  listaObjetivos,
  tipoContribucion,
  totalObjetivo,
  progreso,
  detalles,
  apoyar,
}) => {
  let objetivos = [];
  const navigate = useNavigate();
  const [modalShowApoyo, setModalShowApoyo] = useState(false);
  const [modalShowPasarela, setModalShowPasarela] = useState(false);
  const [TransactionData, setTransactionData] = useState({});
  const porcentaje = (progreso / totalObjetivo) * 100;

  const getObjetivos = () => {
    if (listaObjetivos !== undefined) {
      objetivos = listaObjetivos.join(', ');
    }
  };

  getObjetivos();

  function handleRedireccionAAccion() {
    if (titulo !== ' ') {
      navigate(`/accion/${idAccion}`, { replace: true });
    }
  }

  function showModalApoyo() {
    setModalShowApoyo(true);
  }

  function showModalPasarela() {
    setModalShowPasarela(true);
  }

  async function makeTransaction(data) {
    const responseActualizacion = await actualizarProgresoAccion(
      idAccion,
      data.contribucion,
    );
    if (!checkResponseStatusCode(responseActualizacion)) {
      alertErrorMessage(responseActualizacion);
      if (responseActualizacion.status === HTTP_STATUS_UNAUTHORIZED) navigate(`/login`);
    } else if (responseActualizacion.status === 200) {
      alert('Progreso actualizado con éxito');
      const response = await crearContribucionAccion(
        data.idUsuario,
        idAccion,
        data.nombre,
        data.correo,
        data.contribucion,
      );
      if(response){
        alert('Apoyo enviado con éxito');
      } else {
        alert('No se pudo enviar el apoyo');
      }
    } else {
      alert('No se pudo actualizar el progreso');
    }
    window.location.reload();
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
            {tipoContribucion && (
              <Card.Text>Tipo de contribución: {tipoContribucion}</Card.Text>
            )}
            {totalObjetivo && (
              <Card.Text>
                Objetivo: {totalObjetivo.toLocaleString()}
                {tipoContribucion === 'monetario' ? '$' : ' voluntarios'}
              </Card.Text>
            )}
            {progreso && (
              <Card.Text>Progreso: {porcentaje.toFixed(2)}%</Card.Text>
            )}
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

      <Card.Footer>
        {detalles && (
          <Row>
            <Col xs={12} md={2} className="m-auto">
              <Button
                className="text-nowrap"
                onClick={() => handleRedireccionAAccion()}
                variant="outline-secondary"
                size="sm"
              >
                Ver más detalles
              </Button>
            </Col>
          </Row>
        )}
        {apoyar && (
          <Row>
            <Col xs={12} md={2} className="m-auto">
              <Button
                type="button"
                variant="outline-primary"
                size="sm"
                onClick={showModalApoyo}
              >
                Contribuir
              </Button>
            </Col>
          </Row>
        )}
        <Contribucion
          show={modalShowApoyo}
          onHide={() => {
            setModalShowApoyo(false);
            setTransactionData({});
          }}
          showPasarela={(data) => {
            setTransactionData(data);
            showModalPasarela();
          }}
          contribuirVoluntariado={(data) => {
            makeTransaction(data);
            setModalShowApoyo(false);
            setTransactionData({});
          }}
          idAccion={idAccion}
          tipo={tipoContribucion}
          maxContribucion={totalObjetivo - progreso}
        />
        <Pasarela
          show={modalShowPasarela}
          onHide={() => {
            setModalShowPasarela(false);
            setModalShowApoyo(false);
            makeTransaction(TransactionData);
            setTransactionData({});
          }}
          cancelar={() => {
            setModalShowPasarela(false);
          }}
        />
      </Card.Footer>
    </Card>
  );
};

export default CardAccionSolidaria;
