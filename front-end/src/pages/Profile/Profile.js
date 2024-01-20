import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Image,
  Button,
  Form,
  Col,
  Row,
  Tab,
  TabContent,
  Tabs,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser, getUserByName } from '../../services/users.service';
import { getComunidadesByUser } from '../../services/comunidades.service';
import { CardListaComunidad } from '../../component/CardComunidad';
import {
  seguirUsuario,
  getSeguidosByUser,
  getSeguidoresByUser,
} from '../../services/seguidor.service';
import CardExternalProfile from '../../component/CardExternalProfile';
import {
  alertErrorMessage,
  checkResponseStatusCode,
  checkPageToNavigate,
  HTTP_STATUS_UNAUTHORIZED,
} from '../../utils/utils';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const params = useParams();

  const [user, setUser] = useState({
    username: '',
    nombre: '',
    telefono: '',
    ciudad: '',
    pais: '',
  });

  const usernameActual = useSelector((state) => state.user.userInfo.username);
  const idActual = useSelector((state) => state.user.userInfo.id);

  const [isEditing, setIsEditing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isNotFollowing, setIsNotFollowing] = useState(true);
  const [comunidadesUser, setComunidadesUser] = useState([]);
  const [actualizacion, setActualizacion] = useState(false);
  const [errorComunidades, setErrorComunidades] = useState('');
  const [seguidos, setSeguidos] = useState([]);
  const [errorSeguidos, setErrorSeguidos] = useState('');
  const [seguidores, setSeguidores] = useState([]);
  const [errorSeguidores, setErrorSeguidores] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const response = await updateUser(
      user.username,
      user.nombre,
      user.telefono,
      user.ciudad,
      user.pais,
      user.id,
    );

    if (!checkResponseStatusCode(response)) {
      alertErrorMessage(response);
      const page = checkPageToNavigate(response);
      navigate(page);
    } else {
      setIsEditing(false);
    }
  };

  const fetchUser = useCallback(async () => {
    const response = await getUserByName(params.nombrePerfil);

    if (!checkResponseStatusCode(response)) {
      const page = checkPageToNavigate(response);
      navigate(page);
    }
    const data = await response.json();
    setUser(data);
  }, [params.nombrePerfil, navigate]);

  function handleRedireccionarComunidad(nombre) {
    const comunidadSeleccionada = comunidadesUser.find((comunidad) =>
      comunidad.nombre.toLowerCase().includes(nombre.toLowerCase()),
    );
    if (comunidadSeleccionada) {
      navigate(`/comunidades/${comunidadSeleccionada.id}`, { replace: true });
    }
  }

  function handleRedireccionarPerfil(nombreUser) {
    navigate(`/perfil/${nombreUser}`);
  }

  async function seguir() {
    setActualizacion(false);
    const response = await seguirUsuario(idActual, usernameActual, user.id, user.username);

    if (!checkResponseStatusCode(response)) {
      alertErrorMessage(response);
      if (response.status === HTTP_STATUS_UNAUTHORIZED) navigate('/login');
    } else {
      alert('Usuario seguido correctamente');
    }

    setActualizacion(true);
    setIsNotFollowing(false);
  }


  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (usernameActual === user.username) {
      setIsOwnProfile(true);
    }
  }, [usernameActual, user.username]);

  function getComunidadesUser() {
    setComunidadesUser([]);

    return getComunidadesByUser(user.id).then((response) => {
      setComunidadesUser(response);

      if (response.length === 0) {
        setErrorComunidades(
          'No se encontraron comunidades a las que el usuario pertenezca.',
        );
      }
    });
  }

  const getSeguidos = useCallback(async () => {
    if (user.id === undefined) return;
    setSeguidos([]);
    const response = await getSeguidosByUser(user.id);
    if (response.length === 0) {
      setErrorSeguidos('No se encontraron usuarios seguidores por el usuario.');
    }
    setSeguidos(response);
  }, [user.id]);

  const getSeguidores = useCallback(async () => {
    if (user.id === undefined) return;
    setSeguidores([]);
    const response = await getSeguidoresByUser(user.id);
    if (response.length === 0) {
      setErrorSeguidores('No se encontraron usuarios que sigan al usuario.');
    }

    if (response.length > 0) {
      response.forEach((element) => {
        if (element.id === idActual) {
          setIsNotFollowing(false);
        }
      });
    }

    setSeguidores(response);

  }, [user.id]);

  useEffect(() => {
    getSeguidores();
  }, [user.id, actualizacion]);

  useEffect(() => {
    getSeguidos();
  }, [user.id, actualizacion]);


  useEffect(() => {
    getComunidadesUser();
  },
    [user.id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 d-flex align-items-center">
          <Image
            src="../../../imagenes/usuario.png"
            alt="Imagen de perfil"
            rounded
            fluid
            style={{ maxHeight: '150px' }}
          />
        </div>
        <div className="col-md-9">
          {!isOwnProfile && isNotFollowing && (
            <div className="ms-auto p-2">
              <Button variant="outline-success" size="sm" onClick={seguir}>
                Seguir al usuario
              </Button>
            </div>
          )}
          <h2>Perfil de usuario</h2>
          <Form>
            <Col sd={10} md={10} lg={8} className="mx-auto">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={user.nombre}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTlf">
                <Form.Label>Teléfono móvil</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={user.telefono}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="ciudad"
                  value={user.ciudad}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPais">
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  name="pais"
                  value={user.pais}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              {isOwnProfile && (
                <Form.Group className="mb-3" controlId="editar">
                  {!isEditing ? (
                    <Button variant="primary" onClick={handleEditClick}>
                      Editar
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleSaveClick}>
                      Guardar
                    </Button>
                  )}
                </Form.Group>
              )}
            </Col>
          </Form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          <Tabs defaultActiveKey="seguidos">
            <Tab eventKey="seguidos" title="Seguidos">
              <TabContent>
                {seguidos.length > 0 ? (
                  <div>
                    <Row xs={1} md={2} lg={2} className="g-4">
                      {seguidos.map((elemento, index) => (
                        <Col key={index}>
                          <CardExternalProfile
                            key={index}
                            nombre={elemento.username}
                            imageUrl={'../../../imagenes/usuario.png'}
                            handleRedireccionar={() =>
                              handleRedireccionarPerfil(elemento.username)
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : (
                  <p>{errorSeguidos}</p>
                )}
              </TabContent>
            </Tab>
            <Tab eventKey="seguidores" title="Seguidores">
              <TabContent>
                {seguidores.length > 0 ? (
                  <div>
                    <Row xs={1} md={2} lg={2} className="g-4">
                      {seguidores.map((elemento, index) => (
                        <Col key={index}>
                          <CardExternalProfile
                            key={index}
                            nombre={elemento.username}
                            imageUrl={'../../../imagenes/usuario.png'}
                            handleRedireccionar={() =>
                              handleRedireccionarPerfil(elemento.username)
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : (
                  <p>{errorSeguidores}</p>
                )}
              </TabContent>
            </Tab>
            <Tab eventKey="comunidades" title="Comunidades">
              <TabContent>
                {comunidadesUser.length > 0 ? (
                  <div>
                    <Row xs={1} md={2} lg={2} className="g-4">
                      {comunidadesUser.map((elemento, index) => (
                        <Col key={index}>
                          <CardListaComunidad
                            imageUrl={'../../../imagenes/comunidad.jpeg'}
                            nombre={elemento.nombre}
                            descripcion={elemento.descripcion}
                            handleRedireccionar={(nombre) =>
                              handleRedireccionarComunidad(elemento.nombre)
                            }
                            miembros={elemento.usuarios.length}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : (
                  <p>{errorComunidades}</p>
                )}
              </TabContent>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
