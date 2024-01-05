import React, { useEffect } from 'react';
import { Breadcrumb, Tabs, Tab, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAccionesByCausaId } from '../../services/acciones.service';
import CardCausaSolidaria from '../../component/CardCausaSolidaria';
import StackAccionSolidaria from '../../component/StackAccionSolidaria';

export default function MostrarCausa() {
  const location = useLocation();
  const [todasLasAcciones, setTodasLasAcciones] = React.useState([]);
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

  useEffect(() => {
    async function acciones() {
      try {
        const response = await getAccionesByCausaId(causa.id);
        const totalAcciones = response;
        setTodasLasAcciones(totalAcciones);
      } catch (errorGet) {
        throw new Error(
          'Error al obtener las acciones. Por favor, inténtalo de nuevo.',
        );
      }
    }
    acciones();
  }, [causa.id, setTodasLasAcciones]);

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
            onClick={handleRedireccionarACrearAccion}
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
          {todasLasAcciones.length > 0 && (
            <Tab eventKey="acciones" title="Acciones solidarias">
              {todasLasAcciones.isEmpty ? (
                <p>No hay acciones en la causa</p>
              ) : (
                todasLasAcciones.map((acc, index) => (
                  <StackAccionSolidaria
                    key={index}
                    idAccion={acc.id}
                    titulo={acc.titulo}
                    descripcion={acc.descripcion}
                    fechaInicio={acc.fechaInicio}
                    fechaFin={acc.fechaFin}
                    objetivos={acc.objetivos}
                    progreso={acc.progreso}
                  />
                ))
              )}
              <StackAccionSolidaria
                causa={causa}
                titulo={'accion1'}
                descripcion={'descripcion1'}
                objetivos={objetivosAccion}
                progreso={'20'}
              />
            </Tab>
          )}
        </Tabs>
      </Col>
    </div>
  );
}
