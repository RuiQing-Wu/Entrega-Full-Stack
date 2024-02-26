import './Solicitud.css';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createSolicitud,
  getSolicitudByUserAndComunidad,
} from '../../services/solicitud.service';
import ErrorMessage from '../../component/MensajeError';
import { getComunidadById } from '../../services/comunidades.service';
import { dateToString } from '../../utils/utils';

export default function Solicitud(props) {
  const navigate = useNavigate();
  const [administradorComunidad, setAdministradorComunidad] = useState(false);
  const [error, setError] = useState('');
  const [estado, setEstado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [badgeVariant, setBadgeVariant] = useState('secondary');
  const user = useSelector((state) => {
    return state.user.userInfo;
  });

  function handleDescripcion(event) {
    setDescripcion(event.target.value);
  }

  async function estadoSolicitud() {
    const reponseEstado = await getSolicitudByUserAndComunidad(
      user.id,
      props.idComunidad,
    );
    if (reponseEstado !== undefined) {
      setEstado(reponseEstado.estado);
    }
  }

  async function verificarAdministrador() {
    const comunidad = await getComunidadById(props.idComunidad);
    const dataComunidad = await comunidad.json();
    if (dataComunidad && dataComunidad.idAdministrador === user.id) {
      setAdministradorComunidad(true);
      setError(
        'El administrador no puede solicitar unirse a su propia comunidad',
      );
    }
  }

  useEffect(() => {
    verificarAdministrador();
  }, [user.id, props.idComunidad]);

  useEffect(() => {
    estadoSolicitud();
  }, [user.id, props.idComunidad]);

  useEffect(() => {
    if (estado === 'pendiente') {
      setBadgeVariant('warning');
    } else if (estado === 'aceptada') {
      setBadgeVariant('success');
    } else if (estado === 'rechazada') {
      setBadgeVariant('danger');
    } else {
      setBadgeVariant('secondary');
    }
  }, [estado]);

  async function enviar(event) {
    event.preventDefault();
    const estadoPendiente = 'pendiente';

    if (user) {
      if (props.usersData.some((usuario) => usuario.id === user.id)) {
        if (!administradorComunidad) {
          setError(
            'Ya existe una solicitud con este usuario para esta comunidad',
          );
        }
      } else {
        const fechaSolicitud = dateToString();
        if (descripcion === '') {
          setError('Debes ingresar una descripción');
          return;
        }
        if (estado === 'pendiente') {
          setError('Ya existe una solicitud pendiente');
        } else {
          const response = await createSolicitud(
            descripcion,
            fechaSolicitud,
            estadoPendiente,
            user.id,
            props.idComunidad,
          );

          if (response !== undefined) {
            setEstado(estadoPendiente);
            setError('Solicitud enviada');
            props.onHide();
            navigate(`/comunidades/${props.idComunidad}`);
          }
        }

        /* const responseUsuarioComunidad = await addMember(
            user.id,
            props.idComunidad,
          );
          if (responseUsuarioComunidad !== undefined) {
            props.usersData.push(user);
            props.onHide();
            navigate(`/comunidades/${props.idComunidad}`);
            estadoSolicitud();
          } */
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
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center"
          style={{ textAlign: 'center', flex: '1' }}
        >
          Solicitud de ingreso a comunidad
        </Modal.Title>
        {!administradorComunidad && (
          <Badge bg={badgeVariant}>{estado || 'no solicitada'}</Badge>
        )}
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
            Cerrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
