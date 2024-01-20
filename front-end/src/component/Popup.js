import React, { useState, useEffect } from 'react';
import './Style/Popup.css'; 

const Popup = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className="popup">
      <p>{message}</p>
    </div>
  ) : null;
};

export default Popup;
