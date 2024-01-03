import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Tab, Tabs } from 'react-bootstrap';
import { getCausas } from '../../services/causas.service';
import CardComunidad from '../../component/CardComunidad';
import StackAccionSolidaria from '../../component/StackAccionSolidaria';
import CardExternalProfile from '../../component/CardExternalProfile';
import Popup from '../../component/Popup';

export default function MostrarComunidad() {
  const location = useLocation();
  const comunidad = location.state;
  const navigate = useNavigate();
  const objetivos = ['objetivo1', 'objetivo2'];

  const [popupMessage, setPopupMessage] = React.useState('');

  const onApoyarComunidadClicked = () => {
    setTimeout(() => {
      navigate(
        '.',
        {
          state: {
            nombre: comunidad.nombre,
            descripcion: comunidad.descripcion,
          },
        },
        { replace: true },
      );

      setPopupMessage('¡Comunidad apoyada exitosamente!');
    }, 1000);
  };

  if (!comunidad) {
    return <div>No hay datos de la comunidad</div>;
  }

  async function causas() {
    try {
      const response = await getCausas();
      const causa = response;
    } catch (errorGet) {
      throw new Error(
        'Error al obtener las causas. Por favor, inténtalo de nuevo.',
      );
    }
  }

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/listaComunidades">Comunidades</Breadcrumb.Item>
        <Breadcrumb.Item active>{comunidad.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <CardComunidad
        nombre={comunidad.nombre}
        descripcion={comunidad.descripcion}
        fechaInicio={comunidad.fechaInicio}
        onApoyarComunidadClicked={onApoyarComunidadClicked}
      />

      <Tabs
        defaultActiveKey="causasSolidarias"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="causasSolidarias" title="Causas solidarias">
          <StackAccionSolidaria titulo={'accion1'} objetivos={objetivos} />
        </Tab>
        <Tab eventKey="seguidores" title="Seguidores">
          <CardExternalProfile
            nombre={'nombre1'}
            telefono={'123456789'}
            email={'email1'}
          />
          <CardExternalProfile
            nombre={'nombre2'}
            telefono={'987654321'}
            email={'email2'}
          />
        </Tab>
      </Tabs>
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage('')} />
      )}
    </div>
  );
}
