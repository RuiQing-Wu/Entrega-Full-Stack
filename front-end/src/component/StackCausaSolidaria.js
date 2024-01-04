import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StackCausaSolidaria({
  idCausa,
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  accionSolidaria,
  idComunidad,
  onApoyarCausaClicked,
}) {
  const navigate = useNavigate();

  function handleRedirecciónACausa() {
    if (titulo !== ' ') {
      navigate(`/causa/${titulo}`, {
        state: {
          titulo,
          descripcion,
          fechaInicio,
          fechaFin,
          accionSolidaria,
          idComunidad,
        },
      });
    }
  }

  const handleApoyarClick = () => {
    onApoyarCausaClicked(idCausa);
  };

  return (
    <div>
      <Stack key={idCausa} gap={2}>
        <Stack key={idCausa} direction="horizontal" gap={2}>
          <div className="p-2">{titulo}</div>
          <div className="p-2">{descripcion}</div>
          <div className="p-2">{fechaInicio}</div>
          <div className="p-2">{fechaFin}</div>
          <Button
            onClick={() => handleRedirecciónACausa()}
            variant="outline-secondary"
            size="sm"
          >
            Ver más detalles
          </Button>
          <Button
            onClick={handleApoyarClick}
            variant="outline-primary"
            size="sm"
          >
            Apoyar Causa
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
