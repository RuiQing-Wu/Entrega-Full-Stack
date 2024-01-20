import { Outlet } from 'react-router-dom';
import './CausasOutlet.css';

function CausaOutlet() {
  return (
    <div className="causaOutlet">
      <Outlet />
    </div>
  );
}

export default CausaOutlet;
