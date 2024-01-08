import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Tab, Tabs, Button } from 'react-bootstrap';
import { getCausasByComunityId } from '../../services/causas.service';
import CardComunidad from '../../component/CardComunidad';
import StackCausaSolidaria from '../../component/StackCausaSolidaria';
import CardExternalProfile from '../../component/CardExternalProfile';
import Popup from '../../component/Popup';
import { getComunidadById } from '../../services/comunidades.service';
import { refactorDate } from '../../utils/utils';

export default function MostrarComunidad() {
  const [comunidad, setComunidad] = useState();
  const param = useParams();
  const [todasLasCausas, setTodasLasCausas] = useState([]);
  const [user, setUser] = useState(useSelector((state) => state.user.userInfo));
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState('');

  const onApoyarCausaClicked = async () => {
    try {
      const response = await getCausasByComunityId(param.idComunidad);
      const totalCausas = response;
      setTodasLasCausas(totalCausas);

      navigate(`/comunidad/${param.idComunidad}`, { replace: true });

      setPopupMessage('¡Causa apoyada exitosamente!');
    } catch (error) {
      setPopupMessage(
        'Error al apoyar la causa. Por favor, inténtalo de nuevo.',
      );
    }
  };

  const fetchComunidad = useCallback(async () => {
    const response = await getComunidadById(param.idComunidad);
    setComunidad(response);
  }, [param.idComunidad]);

  const fetchCausas = useCallback(async () => {
    const response = await getCausasByComunityId(param.idComunidad);
    setTodasLasCausas(response);
  }, [param.idComunidad]);

  useEffect(() => {
    fetchComunidad();
  }, [fetchComunidad]);

  useEffect(() => {
    fetchCausas();
  }, [fetchCausas]);

  if (!comunidad) {
    return <div>No hay datos de la comunidad</div>;
  }

  function onHomeClicked() {
    navigate('/');
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
  }

  function handleRedireccionarACrearCausa() {
    navigate(`/comunidad/${param.idComunidad}/crear-causa`, { replace: true });
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onComunidadesClicked}>
          Comunidades
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{comunidad.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex flex-column m-auto w-75">
        {user && (
          <div className="ms-auto p-2">
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleRedireccionarACrearCausa}
            >
              Crear causa
            </Button>
          </div>
        )}
        <div>
          <CardComunidad
            imageUrl={'../../../imagenes/comunidad.jpeg'}
            id={comunidad.id}
            nombre={comunidad.nombre}
            descripcion={comunidad.descripcion}
            fechaInicio={refactorDate(comunidad.fechaInicio)}
          />
        </div>
      </div>

      <Tabs
        defaultActiveKey="causasSolidarias"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {todasLasCausas.length > 0 && (
          <Tab eventKey="causasSolidarias" title="Causas solidarias">
            {todasLasCausas.isEmpty ? (
              <p>No hay causas en la comunidad</p>
            ) : (
              todasLasCausas.map((cau, index) => (
                <StackCausaSolidaria
                  key={index}
                  idCausa={cau.id}
                  titulo={cau.titulo}
                  descripcion={cau.descripcion}
                  fechaInicio={refactorDate(cau.fechaInicio)}
                  fechaFin={refactorDate(cau.fechaFin)}
                  accionSolidaria={[]}
                  idComunidad={comunidad.id}
                  onApoyarCausaClicked={onApoyarCausaClicked}
                />
              ))
            )}
          </Tab>
        )}
        <Tab eventKey="seguidores" title="Seguidores">
          <CardExternalProfile
            nombre={'nombre1'}
            telefono={'123456789'}
            email={'email1'}
            imageUrl={'../../../imagenes/usuario.png'}
          />
        </Tab>
      </Tabs>
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage('')} />
      )}
    </div>
  );
}
