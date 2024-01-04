import './Solicitud.css';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function Solicitud(props) {
  // const [modalShow, setModalShow] = useState(props.show);
  // eslint-disable-next-line no-console
  console.log('modalShow: ', props.show);
  function enviar() {
    // eslint-disable-next-line no-console
    console.log(
      'enviar Solicutud nombre comunidad: ',
      props.nombreUsuario,
      props.nombreComunidad,
    );

    // TODO ENVIAR SOLICITUD
    props.onHide();
  }

  function close() {
    // eslint-disable-next-line no-console
    console.log('No enviar Solicutud');
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
          Solicitud de ingreso a comunidad
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Nombre Usuario: {props.nombreUsuario}</p>
        <p>Nombre Comunidad: {props.nombreComunidad}</p>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={enviar}>Enviar solicitud</Button>
        <Button onClick={close} variant="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
