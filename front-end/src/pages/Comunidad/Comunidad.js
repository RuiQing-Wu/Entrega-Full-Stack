import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { saveComunidad } from '../../services/comunidades.service';
import ErrorMessage from '../../component/MensajeError';
import './Comunidad.css';

export default function Comunidad() {
  // Crear un hook para navegar entre páginas
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
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
      setDescripcionError(
        'La descripción de la comunidad no puede estar vacía',
      );
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // TODO Llamar a la API para iniciar sesión
    try {
      const response = await saveComunidad(nombre, descripcion, formattedDate);
      // eslint-disable-next-line no-console
      console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Navegar a la página que contiene los detalles de la nueva comunidad
    navigate(`/comunidad/${nombre}`, {
      state: {
        nombre,
        descripcion,
        fechaInicio: formattedDate,
      },
    });
  }

  return (
    <div className="container">
      <h1>Crear una nueva comunidad</h1>
      <form onSubmit={crearComunidad}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre de la comunidad
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="NombreDeComunidad"
            onChange={handleNombreInput}
          />
          {nombreError && <ErrorMessage message={nombreError} />}
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción breve de la comunidad
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            placeholder="DescripcionDeComunidad"
            onChange={handleDescripcionInput}
          />
          {descripcionError && <ErrorMessage message={descripcionError} />}
        </div>
        <button type="submit" className="btn btn-primary">
          Crear comunidad
        </button>
      </form>
    </div>
  );
}
