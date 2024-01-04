import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Tab, Tabs } from 'react-bootstrap';
import { getCausas } from '../../services/causas.service';
import CardComunidad from '../../component/CardComunidad';
import StackCausaSolidaria from '../../component/StackCausaSolidaria';
import CardExternalProfile from '../../component/CardExternalProfile';
import Popup from '../../component/Popup';

export default function MostrarComunidad() {
  const location = useLocation();
  const comunidad = location.state;
  const [todasLasCausas, setTodasLasCausas] = React.useState([]);
  const navigate = useNavigate();
  const objetivos = ['objetivo1', 'objetivo2'];

  const [popupMessage, setPopupMessage] = React.useState('');

  const onApoyarCausaClicked = () => {
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

      setPopupMessage('¡Causa apoyada exitosamente!');
    }, 1000);
  };

  async function causas() {
    try {
      const response = await getCausas();
      const totalCausas = response;
      setTodasLasCausas(totalCausas);
    } catch (errorGet) {
      throw new Error(
        'Error al obtener las causas. Por favor, inténtalo de nuevo.',
      );
    }
  }

  if (!comunidad) {
    return <div>No hay datos de la comunidad</div>;
  }
  causas();
  console.log(comunidad.id);
  console.log(comunidad.fechaInicio);

  function onHomeClicked() {
    navigate('/');
  }

  function onComunidadesClicked() {
    navigate('/comunidades');
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

      <CardComunidad
        nombre={comunidad.nombre}
        descripcion={comunidad.descripcion}
        fechaInicio={comunidad.fechaInicio}
      />

      <Tabs
        defaultActiveKey="causasSolidarias"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {todasLasCausas.length > 0 && (
          <Tab eventKey="causasSolidarias" title="Causas solidarias">
            {todasLasCausas?.map((cau, index) => (
              <StackCausaSolidaria
                titulo={cau.titulo}
                descripcion={cau.descripcion}
                fechaInicio={cau.fechaInicio}
                fechaFin={cau.fechaFin}
                accionSolidaria={[]}
                idComunidad={comunidad.id}
                onApoyarCausaClicked={onApoyarCausaClicked}
                index={index}
              />
            ))}
          </Tab>
        )}
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
