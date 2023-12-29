import React from 'react';
import { useLocation } from 'react-router-dom';
import CardExternalProfile from '../../component/CardExternalProfile';

export default function MostrarInformacionPerfil() {
  const location = useLocation();
  const usuario = location.state;

  if (!usuario) {
    return <div>No hay datos del usuario</div>;
  }

  return (
    <div>
      <CardExternalProfile
        username={usuario.username}
        telefono={usuario.telefono}
        correo={usuario.correo}
      />
    </div>
  );
}
