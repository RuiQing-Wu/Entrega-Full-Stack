import './Solicitud.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { createSolicitud } from '../../services/solicitud.service';
import { dateToString } from '../../utils/utils';

export default function Solicitud(props) {
  const user = useSelector((state) => {
    // console.log('state.user.userInfo', state.user.userInfo);
    return state.user.userInfo;
  });

  const [descripcion, setDescripcion] = useState('');

  function handleDescripcion(event) {
    setDescripcion(event.target.value);
  }

  function enviar() {
    // eslint-disable-next-line no-console
    console.log(
      'enviar Solicutud nombre comunidad: ',
      user.username,
      props.nombreComunidad,
    );

    const fechaSolicitud = dateToString();

    const response = createSolicitud(
      descripcion,
      fechaSolicitud,
      false,
      user.id,
      props.idComunidad,
    );

    if (response === undefined) {
      // eslint-disable-next-line no-console
      console.log('No se pudo enviar la solicitud');
    } else {
      // eslint-disable-next-line no-console
      console.log('Solicitud enviada');
    }

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
        <p>Id Usuario: {user.id}</p>
        <p>Nombre Usuario: {user.username}</p>
        <p>Id Comunidad: {props.idComunidad}</p>
        <p>Nombre Comunidad: {props.nombreComunidad}</p>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleDescripcion}
              value={descripcion}
            />
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
