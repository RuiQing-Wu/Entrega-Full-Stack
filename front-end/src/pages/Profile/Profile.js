import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabContent, Button, Form, Image, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import updateUser from '../../services/users.service';
import CardExternalProfile from '../../component/CardExternalProfile';
import { CardListaComunidad } from '../../component/CardComunidad';
import { getComunidades } from '../../services/comunidades.service';

export default function Profile() {
  const navigate = useNavigate();

  const initialUser = {
    username: 'johndoe',
    password: '123456',
    nombre: 'John Doe',
    telefono: '123456789',
    ciudad: 'Ciudad Ejemplo',
    pais: 'País Ejemplo',
    esAdministrador: true,
    role: 'ROLE_ADMIN',
  };

  const [user, setUser] = useState({ ...initialUser });
  const [isEditing, setIsEditing] = useState(false);
  const [seguidos, setSeguidos] = useState([]);
  const [errorSeguidos, setErrorSeguidos] = useState('');
  const [seguidores, setSeguidores] = useState([]);
  const [errorSeguidores, setErrorSeguidores] = useState('');
  const [comunidadesUser, setComunidadesUser] = useState([]);
  const [errorComunidades, setErrorComunidades] = useState('');

  const userSelected = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userSelected) {
      setUser({ ...userSelected });
    }
  }, [userSelected]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const response = await updateUser(
      user.username,
      user.nombre,
      user.telefono,
      user.ciudad,
      user.pais,
      user.id
    );

    if (!response) {
      console.log('Error al actualizar el usuario');
    }
  };

  async function getSeguidos() {
    setSeguidos([]);
    // const response = await getSeguidosByUser(user.id);
    // setSeguidos(response);

    if (seguidos.length === 0)
      setErrorSeguidos('No se encontraron usuarios seguidos.');
  }

  async function getSeguidores() {
    setSeguidores([]);
    // const response = await getSeguidoresByUser(user.id);
    // setSeguidores(response);

    if (seguidores.length === 0)
      setErrorSeguidores('No se encontraron usuarios seguidores.');
  }

  async function getComunidadesUser() {
    setComunidadesUser([]);
    // const response = await getComunidades();
    // setComunidadesUser(response);

    // console.log("HEY", comunidadesUser);
    // const response = await getComunidadesByUser(user.id);
    // setComunidadesUser(response);

    if (comunidadesUser.length === 0)
      setErrorComunidades('No se encontraron comunidades a las que el usuario pertenezca.');
  }

  function handleRedireccionarComunidad(nombre) {
    const comunidadSeleccionada = comunidadesUser.find((comunidad) =>
      comunidad.nombre.toLowerCase().includes(nombre.toLowerCase()),
    );
    if (comunidadSeleccionada) {
      navigate(`/comunidad/${comunidadSeleccionada.id}`, { replace: true });
    }
  }

  useEffect(() => {
    getSeguidos();
  }, []);

  useEffect(() => {
    getSeguidores();
  }, []);

  useEffect(() => {
    getComunidadesUser();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 d-flex align-items-center">
          <Image
            src="../../../imagenes/usuario.png"
            alt="Imagen de perfil"
            rounded
            fluid
            style={{ maxHeight: '150px' }} // ajusta el tamaño máximo de la imagen
          />
        </div>


        <div className="col-md-9">
          <h2>Perfil de usuario</h2>
          <Form>
            <Col sd={10} md={10} lg={8} className="mx-auto">
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={user.nombre}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group controlId="formTlf">
                <Form.Label>Teléfono móvil</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={user.telefono}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="ciudad"
                  value={user.ciudad}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              <Form.Group controlId="formPais">
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  name="pais"
                  value={user.pais}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
              {!isEditing ? (
                <Button variant="primary" onClick={handleEditClick}>
                  Editar
                </Button>
              ) : (
                <Button variant="primary" onClick={handleSaveClick}>
                  Guardar
                </Button>
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
                <CardExternalProfile
                  nombre={'nombre1'}
                  telefono={'123456789'}
                  email={'email1'}
                  imageUrl={'../../../imagenes/usuario.png'}
                />
              </TabContent>
            </Tab>
            <Tab eventKey="seguidores" title="Seguidores">
              <CardExternalProfile
                nombre={'nombre1'}
                telefono={'123456789'}
                email={'email1'}
                imageUrl={'../../../imagenes/usuario.png'}
              />
            </Tab>
            <Tab eventKey="comunidades" title="Comunidades">
              <TabContent>{comunidadesUser.length > 0 && (
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
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}</TabContent>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
