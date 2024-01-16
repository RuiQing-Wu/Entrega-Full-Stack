import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardExternalProfile from '../../component/CardExternalProfile';

export default function MostrarInformacionPerfil() {
  const navigate = useNavigate();
  const username = useParams();
  const [usuario, setUsuario] = useState(
    useSelector((state) => state.user.userInfo),
  );

  function handleRedireccionarPerfil(nombreUser) {
    navigate(`/perfil/${nombreUser}`);
  }

  if (!username) {
    return <div>No hay datos del usuario</div>;
  }

  return (
    <div>
      <CardExternalProfile
        username={usuario.username}
        role={usuario.role}
        imageUrl={'../../../imagenes/usuario.png'}
        handleRedireccionar={() => handleRedireccionarPerfil(usuario.username)}
      />
    </div>
  );
}
