import './Home.css';
import CardComunidad from '../../component/CardComunidad';

const ComunidadContainer = ({ comunidades = [], addToCart }) => (
  <div className="container">
    <div className="row">
      {comunidades.map((comunidad) => (
        <div key={comunidad.id} className="col-md-4 mb-4">
          <CardComponent
            imageUrl={comunidad.imageUrl}
            title={comunidad.title}
            onAddToCartClicked={() => addToCart(comunidad.id)}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ComunidadContainer;
