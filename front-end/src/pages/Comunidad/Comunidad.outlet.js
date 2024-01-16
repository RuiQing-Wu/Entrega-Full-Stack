import { Outlet } from 'react-router-dom';
import './Comunidad.outlet.css';

function ComunidadOutlet() {
  return (
    <div className="comunidadOutlet">
      <Outlet />
    </div>
  );
}

export default ComunidadOutlet;
