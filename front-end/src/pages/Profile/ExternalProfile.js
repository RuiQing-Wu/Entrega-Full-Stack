import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardExternalProfile from '../../component/CardExternalProfile';

export default function MostrarInformacionPerfil() {
  const username = useParams();
  const [usuario, setUsuario] = useState(
    useSelector((state) => state.user.userInfo),
  );

  if (!username) {
    return <div>No hay datos del usuario</div>;
  }

  return (
    <div>
      <CardExternalProfile
        username={usuario.username}
        role={usuario.role}
        imageUrl={'../../../imagenes/usuario.png'}
      />
    </div>
  );
}
