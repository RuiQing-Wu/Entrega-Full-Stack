import './PasarelaApoyoAccion.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import contribuirAccion from '../../services/contribucion_accion.service';
import {
  HTTP_STATUS_UNAUTHORIZED,
  alertErrorMessage,
  checkResponseStatusCode,
} from '../../utils/utils';
import ErrorMessage from '../../component/MensajeError';

export default function Pasarela(props) {
  const navigate = useNavigate();
  const [numTarjeta, setNumTarjeta] = useState('');
  const [cvv, setCvv] = useState('');
  const [caducidadAño, setCaducidadAño] = useState('');
  const [caducidadMes, setCaducidadMes] = useState('');
  const [error, setError] = useState('');

  function handleNumTarjetaInput(event) {
    setNumTarjeta(event.target.value);
  }

  function handleCvvInput(event) {
    setCvv(event.target.value);
  }

  function handlecaducidadAñoInput(event) {
    setCaducidadAño(event.target.value);
  }

  function handlecaducidadMesInput(event) {
    setCaducidadMes(event.target.value);
  }

  async function continuar() {
    if (numTarjeta.length !== 16) {
      setError('Debes ingresar un número de tarjeta válido');
      return;
    }

    if (cvv.length !== 3) {
      setError('Debes ingresar un CVV válido');
      return;
    }

    if (caducidadMes.length !== 2 || caducidadMes > 12 || caducidadMes < 1) {
      setError(
        'Debes ingresar un mes válido. El mes debe ser introducido con dos dígitos.',
      );
      return;
    }

    if (caducidadAño.length !== 2 || caducidadAño < 24) {
      setError(
        'Debes ingresar un año válido. El año debe ser introducido con dos dígitos.',
      );
      return;
    }

    if (caducidadAño === 24 && caducidadMes < 4) {
      setError('La tarjeta ha caducado');
    }

    props.onHide();
  }

  function close() {
    props.cancelar();
  }

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center"
          style={{ textAlign: 'center' }}
        >
          Contribuir a accion solidaria
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="inputNombre">
            <Form.Label>Numero de tarjeta:</Form.Label>
            <Form.Control
              type="number"
              placeholder="1234567890123456"
              autoFocus={false}
              onChange={handleNumTarjetaInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputCorreo">
            <Form.Label>Cvv:</Form.Label>
            <Form.Control
              type="number"
              placeholder="123"
              autoFocus={false}
              onChange={handleCvvInput}
              required
            />
          </Form.Group>
          <Row>
            <Form.Group className="mb-3" controlId="inputCorreo">
              <Form.Label>Fecha de caducidad:</Form.Label>
              <Form.Control
                type="number"
                placeholder="MM"
                autoFocus={false}
                onChange={handlecaducidadMesInput}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputCorreo">
              <Form.Label>/</Form.Label>
              <Form.Control
                type="number"
                placeholder="YY"
                autoFocus={false}
                onChange={handlecaducidadAñoInput}
                required
              />
            </Form.Group>
          </Row>
          {error && <ErrorMessage message={error} gravedad="warning" />}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={continuar}>Continuar</Button>
        <Button onClick={close} variant="danger">
          Cancelar transaccion
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
