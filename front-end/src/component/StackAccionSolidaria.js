import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StackAccionSolidaria({
  idAccion,
  causa,
  titulo,
  descripcion,
  objetivos,
  progreso,
}) {
  const navigate = useNavigate();

  function handleRedirecciónAAccion() {
    navigate(`/accion/${idAccion}`, { replace: true });
  }

  // Verificar si objetivos es un array
  const listaObjetivos = objetivos.join(', ');

  return (
    <div>
      <Stack gap={2}>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">{titulo}</div>
          <div className="p-2">{descripcion}</div>
          <div className="p-2">{listaObjetivos}</div>
          <div className="p-2">{progreso}%</div>
          <Button
            onClick={() => handleRedirecciónAAccion()}
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
