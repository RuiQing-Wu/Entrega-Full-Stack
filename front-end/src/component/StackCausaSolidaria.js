import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StackCausaSolidaria({
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  accionSolidaria,
  idComunidad,
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

  return (
    <div>
      <Stack gap={2}>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">{titulo}</div>
          <div className="p-2">{descripcion}</div>
          <div className="p-2">{fechaInicio}</div>
          <div className="p-2">{fechaFin}</div>
          <Button
            onClick={() => handleRedirecciónACausa()}
            variant="outline-primary"
            size="sm"
          >
            Ver más detalles
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
