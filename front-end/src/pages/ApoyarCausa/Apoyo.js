import './Apoyo.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createApoyoRegistro } from '../../services/apoyo_registro.service';
import { apoyarCausa } from '../../services/apoyo_causa.service';

export default function Apoyo(props) {

  const name = useSelector((state) => state.user.userInfo.nombre);
  const [nombre, setNombre] = useState(name || '');
  const [correo, setCorreo] = useState('');

  function handleNombreInput(event) {
    setNombre(event.target.value);
  }

  function handleCorreoInput(event) {
    setCorreo(event.target.value);
  }

  function apoyar() {

    const response = createApoyoRegistro(props.idCausa, nombre, correo);
    if (response === undefined) {
      // eslint-disable-next-line no-console
      console.log('No se pudo enviar el apoyo');
    } else {
      apoyarCausa(props.idCausa);
      alert('Apoyo enviado con éxito');
      props.onHide();
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
