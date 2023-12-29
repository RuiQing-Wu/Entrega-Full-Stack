import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Comunidad.css';

export default function Comunidad() {
  // Crear un hook para navegar entre páginas
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');

  function handleNombreInput(event) {
    setNombre(event.target.value);
    setNombreError('');
  }

  function handleDescripcionInput(event) {
    setDescripcion(event.target.value);
    setDescripcionError('');
  }

  async function crearComunidad(event) {
    // eslint-disable-next-line no-console
    console.log('Login');
    event.preventDefault();

    // Resetear los errores
    setNombreError('');
    setDescripcionError('');

    // Validar que el usuario y la contraseña no estén vacíos
    if (nombre === '') {
      setNombreError('El nombre de la comunidad no puede estar vacío');
      return;
    }

    if (descripcion === '') {
      setDescripcionError('La descripción de la comunidad no puede estar vacía');
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    console.log("Fecha formateada");
    console.log(formattedDate); // Devuelve un valor

    setFechaInicio(formattedDate);

    console.log("Fecha registrada");
    console.log(fechaInicio); // Esto no devuelve nada

    // Navegar a la página que contiene los detalles de la nueva comunidad
    navigate(`/comunidad/${nombre}`, {
      state: {
        nombre,
        descripcion,
        formattedDate,
      },
    });
  }

  return (
    <div class="container">
      <h1>Crear una nueva comunidad</h1>
      <form onSubmit={crearComunidad}>
        <div class="mb-3">
          <label for="Nombre" class="form-label">
            Nombre de la comunidad
          </label>
          <input
            type="text"
            class="form-control"
            id="nombre"
            placeholder="NombreDeComunidad"
            onChange={handleNombreInput}
          />
          <label>{nombreError}</label>
        </div>
        <div class="mb-3">
          <label for="descripcion" class="form-label">
            Descripción breve de la comunidad
          </label>
          <input
            type="text"
            class="form-control"
            id="descripcion"
            placeholder="DescripcionDeComunidad"
            onChange={handleDescripcionInput}
          />
          <label>{descripcionError}</label>
        </div>
        <button type="submit" class="btn btn-primary">
          Crear comunidad
        </button>
      </form>
    </div>
  );
}
