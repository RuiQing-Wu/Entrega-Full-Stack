import React from 'react';
import { Breadcrumb, Tabs, Tab, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import StackAccionSolidaria from '../../component/StackAccionSolidaria';

export default function MostrarCausa() {
  const location = useLocation();
  const causa = location.state;

  if (!causa) {
    return <div>No hay datos de la causa</div>;
  }

  const objetivosAccion = ['objetivo1', 'objetivo2', 'objetivo3', 'objetivo4'];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/causa">Causas solidarias</Breadcrumb.Item>
        <Breadcrumb.Item active>{causa.titulo}</Breadcrumb.Item>
      </Breadcrumb>

      <CardCausaSolidaria
        titulo={causa.titulo}
        descripcion={causa.descripcion}
        fechaInicio={causa.fechaInicio}
        fechaFin={causa.fechaFin}
      />

      <Col sd={10} md={10} lg={8} className="mx-auto">
        <Tabs
          defaultActiveKey="acciones"
          id="uncontrolled-tab-example"
          className="mb-3 mt-4 custom-size-tabs"
          fill
        >
          <Tab eventKey="causas" title="Causas solidarias">
            Tab content for Causas
          </Tab>
          <Tab eventKey="acciones" title="Acciones solidarias">
            <StackAccionSolidaria
              titulo={'accion1'}
              objetivos={objetivosAccion}
              progreso={'20%'}
            />
          </Tab>
        </Tabs>
      </Col>
    </div>
  );
}
