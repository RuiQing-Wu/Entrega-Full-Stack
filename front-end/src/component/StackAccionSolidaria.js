import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StackAccionSolidaria({ titulo, objetivos, progreso }) {
  const navigate = useNavigate();

  function handleRedirecciónAAccion(
    tituloAccion,
    objetivosAccion,
    progresoAccion,
  ) {
    if (tituloAccion !== ' ') {
      navigate(`/accion/${tituloAccion}`, {
        state: {
          tituloAccion,
          ObjetivosAccion: objetivosAccion,
          progresoAccion,
        },
      });
    }
  }

  // Verificar si objetivos es un array
  const listaObjetivos = objetivos.join(', ');

  return (
    <div>
      <Stack gap={2}>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">{titulo}</div>
          <div className="p-2">{listaObjetivos}</div>
          <div className="p-2">{progreso}</div>
          <Button
            onClick={() =>
              handleRedirecciónAAccion(titulo, objetivos, progreso)
            }
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