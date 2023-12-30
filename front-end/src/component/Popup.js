import React, { useState, useEffect } from 'react';
import './Style/Popup.css'; // Estilos para el popup, puedes personalizarlos

const Popup = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Cerrar el popup después de 3 segundos (puedes ajustar el tiempo)

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className="popup">
      <p>{message}</p>
    </div>
  ) : null;
};

export default Popup;
