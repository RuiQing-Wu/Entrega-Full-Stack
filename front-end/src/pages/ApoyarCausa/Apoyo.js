import './Apoyo.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function Apoyo(props) {
  const [correo, setCorreo] = useState('');
  // eslint-disable-next-line no-console
  console.log('modalShow: ', props.show);
  function handleCorreoInput(event) {
    setCorreo(event.target.value);
  }

  function apoyar() {
    // eslint-disable-next-line no-console
    console.log('Apoyar: ', props.nombreCausa, correo);

    // TODO ENVIAR SOLICITUD
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
          Apoyar Causa
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="inputCorreo">
            <Form.Label>Email address</Form.Label>
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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
