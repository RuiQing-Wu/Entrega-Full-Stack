import React from 'react';
import { Breadcrumb, Tabs, Tab, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import StackAccionSolidaria from '../../component/StackAccionSolidaria';

export default function MostrarCausa() {
  const location = useLocation();
  const causa = location.state;
  const navigate = useNavigate();

  function onHomeClicked() {
    navigate('/');
  }

  function handleRedireccionarACrearAccion() {
    navigate('/crear-accion');
  }

  function onCausasClicked() {
    navigate('/listaCausas');
  }

  if (!causa) {
    return <div>No hay datos de la causa</div>;
  }

  const objetivosAccion = ['objetivo1', 'objetivo2', 'objetivo3', 'objetivo4'];

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={onHomeClicked}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onCausasClicked}>
          Causas-solidarias
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{causa.titulo}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex flex-column m-auto w-75">
        <div className="ms-auto p-2">
          <Button
            variant="outline-success"
            size="sm"
            onClick={handleRedireccionarACrearAccion()}
          >
            Crear accion
          </Button>
        </div>
        <div>
          <CardCausaSolidaria
            titulo={causa.titulo}
            descripcion={causa.descripcion}
            fechaInicio={causa.fechaInicio}
            fechaFin={causa.fechaFin}
          />
        </div>
      </div>

      <Col className="mx-auto">
        <Tabs
          defaultActiveKey="acciones"
          id="uncontrolled-tab-causas-acciones"
          className="mb-3"
        >
          <Tab eventKey="causas" title="Causas solidarias">
            Tab content for Causas
          </Tab>
          <Tab eventKey="acciones" title="Acciones solidarias">
            <StackAccionSolidaria
              causa={causa}
              titulo={'accion1'}
              descripcion={'descripcion1'}
              objetivos={objetivosAccion}
              progreso={'20'}
            />
          </Tab>
        </Tabs>
      </Col>
    </div>
  );
}
