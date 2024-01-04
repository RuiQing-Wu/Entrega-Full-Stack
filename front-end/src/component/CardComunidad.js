import './Style/CardComunidad.css';
import { useState } from 'react';
import Solicitud from '../pages/Solicitud/Solicitud';
import Apoyo from '../pages/ApoyarCausa/Apoyo';

export default function CardComunidad({
  imageUrl,
  nombre,
  descripcion,
  fechaInicio,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowApoyo, setModalShowApoyo] = useState(false);

  function showModal() {
    setModalShow(true);
  }

  function showModalApoyo() {
    setModalShowApoyo(true);
  }

  console.log(imageUrl);

  return (
    <div id="cardComunidad" className="card">
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={showModalApoyo}
        >
          Apoyar
        </button>
        <Apoyo
          show={modalShowApoyo}
          onHide={() => setModalShowApoyo(false)}
          nombreCausa="Cambiar Aqui por el nombre del causa"
        />
      </div>
    </div>
  );
}
