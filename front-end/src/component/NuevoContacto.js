import React, { useState } from 'react';
import './Style/NuevoContacto.css';

const NuevoContacto = ({ onAddToCartClicked }) => {
  const [contactos, setContactos] = useState([]);

  const handleAddContact = () => {
    // Aquí puedes agregar la lógica para obtener la información del nuevo contacto
    // Puedes recibir la información como argumentos o mediante un formulario

    // Supongamos que tienes la información del nuevo contacto en las siguientes variables
    const nuevoContacto = {
      id: contactos.length + 1, // Puedes usar un mejor mecanismo para generar el ID
      nombre: 'Nuevo Usuario',
      telefono: '123-456-7890',
    };

    // Actualizar el estado para incluir el nuevo contacto
    setContactos((prevContactos) => [...prevContactos, nuevoContacto]);

    // Llamar a la función proporcionada como prop para realizar otras acciones si es necesario
    if (onAddToCartClicked) {
      onAddToCartClicked(nuevoContacto);
    }
  };

  return (
    <div id="cardNuevoUsuario" className="card mt-2">
      <ul className="list-group list-group-flush">
        {contactos.map((contacto) => (
          <li key={contacto.id} className="list-group-item">
            {contacto.nombre} - {contacto.telefono}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={handleAddContact}>
        Añadir Nuevo Usuario
      </button>
    </div>
  );
};

export default NuevoContacto;
