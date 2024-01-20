import './Apoyo.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createApoyoRegistro } from '../../services/apoyo_registro.service';
import { apoyarCausa } from '../../services/apoyo_causa.service';
import {
  HTTP_STATUS_UNAUTHORIZED,
  alertErrorMessage,
  checkResponseStatusCode,
} from '../../utils/utils';
import ErrorMessage from '../../component/MensajeError';

export default function Apoyo(props) {
  const navigate = useNavigate();
  const name = useSelector((state) => state.user.userInfo.nombre);
  const [nombre, setNombre] = useState(name || '');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');

  function handleNombreInput(event) {
    setNombre(event.target.value);
  }

  function handleCorreoInput(event) {
    setCorreo(event.target.value);
  }

  async function apoyar() {

    if (correo === '') {
      setError('Debes ingresar un correo electrónico');
      return;
    }

    const response = await createApoyoRegistro(props.idCausa, nombre, correo);
    if (!checkResponseStatusCode(response)) {
      alertErrorMessage(response);
      if (response.status === HTTP_STATUS_UNAUTHORIZED) navigate(`/login`);
    } else if (response.status === 201) {
      apoyarCausa(props.idCausa);
      alert('Apoyo enviado con éxito');
      props.onHide();
    } else {
      alert('No se pudo enviar el apoyo');
    }
  }

  function close() {
    props.onHide();
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
          Apoyar causa solidaria
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="inputNombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              placeholder="nombre"
              autoFocus={false}
              value={nombre}
              onChange={handleNombreInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputCorreo">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus={false}
              onChange={handleCorreoInput}
              required
            />
          </Form.Group>
          {error && <ErrorMessage message={error} gravedad="warning" />}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={apoyar}>Apoyar</Button>
        <Button onClick={close} variant="danger">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
