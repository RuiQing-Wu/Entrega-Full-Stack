import './Style/CardComunidad.css';
import { useState } from 'react';
import Solicitud from '../pages/Solicitud/Solicitud';

export default function CardComunidad({
  imageUrl,
  nombre,
  descripcion,
  fechaInicio,
}) {
  const [modalShow, setModalShow] = useState(false);
  function showModal() {
    setModalShow(true);
  }

  return (
    <div id="cardComunidad" className="card">
      <img className="card-img-top" src={imageUrl} alt="Imagen de ejemplo" />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">Descripción: {descripcion}</p>
        <p className="card-text">Fecha de creación: {fechaInicio}</p>
      </div>
      <div className="card-footer">
        <button type="button" className="btn btn-primary" onClick={showModal}>
          Solicitar
        </button>
        <Solicitud
          show={modalShow}
          onHide={() => setModalShow(false)}
          nombreUsuario="Cambiar Aqui por el nombre del usuario"
          nombreComunidad="Cambiar Aqui por el nombre de la comunidad"
        />
      </div>
    </div>
  );
}
