import './Apoyo.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { createApoyoRegistro } from '../../services/apoyo_registro.service';
import { apoyarCausa } from '../../services/apoyo_causa.service';

export default function Apoyo(props) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  // eslint-disable-next-line no-console
  console.log('modalShow: ', props.show);
  function handleNombreInput(event) {
    setNombre(event.target.value);
  }

  function handleCorreoInput(event) {
    setCorreo(event.target.value);
  }

  function apoyar() {
    // eslint-disable-next-line no-console
    console.log('Apoyar: ', props.idCausa, nombre, correo);

    // TODO ENVIAR SOLICITUD
    const response = createApoyoRegistro(props.idCausa, nombre, correo);
    if (response === undefined) {
      // eslint-disable-next-line no-console
      console.log('No se pudo enviar el apoyo');
    } else {
      // eslint-disable-next-line no-console
      apoyarCausa(props.idComunidad, props.idCausa);
    }

    props.onHide();
  }

  function close() {
    // eslint-disable-next-line no-console
    console.log('No enviar Correo');
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
          Apoyar "{props.nombreCausa}"
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
            />
          </Form.Group>
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
