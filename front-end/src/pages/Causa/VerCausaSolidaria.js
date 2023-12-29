import { useLocation } from 'react-router-dom';
import './VerCausaSolidaria.css';

export default function VerCausaSolidaria() {
  const location = useLocation();
  const titulo = location.state && location.state.titulo;
  const descripcion = location.state && location.state.descripcion;
  const fechaInicio = location.state && location.state.fechaInicio;
  const fechaFin = location.state && location.state.fechaFin;

  return (
    <div className="container">
      <h3 className="mt-4"> Causa Solidaria </h3>
      <div id="cardCausaSolidaria" className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descripcion}</p>
          <p className="card-text">{fechaInicio}</p>
          <p className="card-text"> {fechaFin}</p>
        </div>
      </div>
    </div>
  );
}
