import './Solicitud.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createSolicitud,
  getSolicitud,
} from '../../services/solicitud.service';
import ErrorMessage from '../../component/MensajeError';
import { addMember } from '../../services/comunidades.service';
import { dateToString } from '../../utils/utils';

export default function Solicitud(props) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const user = useSelector((state) => {
    // console.log('state.user.userInfo', state.user.userInfo);
    return state.user.userInfo;
  });

  const [descripcion, setDescripcion] = useState('');

  function handleDescripcion(event) {
    setDescripcion(event.target.value);
  }

  async function enviar(event) {
    event.preventDefault();

    if (user) {
      const userSols = await getSolicitud();
      if (
        userSols.some(
          (solicitud) =>
            solicitud.idUsuario === user.id &&
            solicitud.idComunidad === props.idComunidad,
        )
      ) {
        setError(
          'Ya existe una solicitud con este usuario para esta comunidad',
        );
      } else {
        const fechaSolicitud = dateToString();
        const response = await createSolicitud(
          descripcion,
          fechaSolicitud,
          false,
          user.id,
          props.idComunidad,
        );

        if (response !== undefined) {
          const responseUsuarioComunidad = await addMember(
            user.id,
            props.idComunidad,
          );

          if (responseUsuarioComunidad !== undefined) {
            props.onHide();
            await props.fetchUser();
            navigate(`/comunidad/${props.idComunidad}`, { replace: true });
            console.log(
              'Solicitud: fetchUser llamado después de la navegación',
            );
          }
        }
      }
    } else {
      setError('Debes tener un usuario para unirte a la comunidad');
    }
  }

  function close() {
    setError('');
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
      <Form onSubmit={enviar}>
        <Modal.Body>
          <p>Nombre Usuario: {user.username}</p>
          <p>Nombre Comunidad: {props.nombreComunidad}</p>

          <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-2">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleDescripcion}
              value={descripcion}
            />
          </Form.Group>
          {error && <ErrorMessage message={error} gravedad="warning" />}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={enviar}>Enviar solicitud</Button>
          <Button onClick={close} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
