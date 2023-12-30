import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function handleRedirecciónAAccion(tituloAccion) {
  const navigate = useNavigate();
  if (tituloAccion !== ' ') {
    navigate(`/accion/${tituloAccion}`, {
      state: {
        tituloAccion,
        objetivos: ' ',
      },
    });
  }
}

export default function StackAccionSolidaria({ titulo, objetivos }) {
  return (
    <Stack gap={2}>
      <Stack direction="horizontal" gap={2}>
        <div className="p-2">{titulo}</div>
        <div className="p-2">{objetivos}</div>
        <Button
          onClick={() => handleRedirecciónAAccion(titulo)}
          variant="outline-primary"
          size="sm"
        >
          Ver más detalles
        </Button>
      </Stack>
    </Stack>
  );
}
