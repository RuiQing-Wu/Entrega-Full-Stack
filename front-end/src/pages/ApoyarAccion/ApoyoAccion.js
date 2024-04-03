import './ApoyoAccion.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../component/MensajeError';

export default function Contribucion(props) {
  const name = useSelector((state) => state.user.userInfo.nombre);
  const [nombre, setNombre] = useState(name || '');
  const [correo, setCorreo] = useState('');
  const [contribucion, setContribucion] = useState(1);
  const [error, setError] = useState('');
  const idUsuario = useSelector((state) => state.user.userInfo.id);

  function handleNombreInput(event) {
    setNombre(event.target.value);
  }

  function handleCorreoInput(event) {
    setCorreo(event.target.value);
  }

  function handleContribucionInput(event) {
    const contribucionInt = parseFloat(event.target.value);
    setContribucion(contribucionInt);
  }

  async function contribuir() {
    if (nombre === '') {
      setError('Debes ingresar un nombre');
      return;
    }

    if (correo === '') {
      setError('Debes ingresar un correo electrónico');
      return;
    }

    if (
      props.tipo === 'monetario' &&
      contribucion <= 1 &&
      contribucion > props.maxContribucion
    ) {
      setError('Debes ingresar una cantidad válida');
      return;
    }

    const transactionData = {
      idUsuario,
      idAccion: props.idAccion,
      nombre,
      correo,
      contribucion,
    };

    if (props.tipo === 'voluntariado') {
      props.contribuirVoluntariado(transactionData);
    } else {
      props.showPasarela(transactionData);
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
          Contribuir a accion solidaria
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
          {props.tipo === 'monetario' && (
            <Form.Group className="mb-3" controlId="inputContribucion">
              <Form.Label>Contribucion:</Form.Label>
              <Form.Control
                type="number"
                placeholder="100"
                autoFocus={false}
                onChange={handleContribucionInput}
                required
              />
            </Form.Group>
          )}
          {error && <ErrorMessage message={error} gravedad="warning" />}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={contribuir}>Contribuir</Button>
        <Button onClick={close} variant="danger">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
