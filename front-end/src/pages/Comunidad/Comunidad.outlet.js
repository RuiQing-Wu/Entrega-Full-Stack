import { Outlet } from 'react-router-dom';
import './Comunidad.outlet.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function ComunidadOutlet() {
  return (
    <div className="comunidadOutlet">
      <Outlet />
    </div>
  );
}

export default ComunidadOutlet;
