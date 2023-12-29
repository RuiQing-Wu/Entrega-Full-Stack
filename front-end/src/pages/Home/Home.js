// Importa useState para manejar el estado local del componente
import React, { useState } from 'react';
import CardComunidad from '../../component/CardComunidad';
import NuevoContacto from '../../component/NuevoContacto';

export default function Home({ comunidades = [], addToCart }) {
  // Estado local para almacenar las comunidades
  const [comunidadesLocales, setComunidadesLocales] = useState(comunidades);

  // Función para añadir una comunidad ficticia
  const agregarComunidadFicticia = () => {
    const nuevaComunidad = {
      id: 999, // Puedes ajustar el ID según tus necesidades
      imageUrl: 'url_de_la_imagen',
      title: 'Comunidad Ficticia',
    };

    // Actualiza el estado con la nueva comunidad ficticia
    setComunidadesLocales([...comunidadesLocales, nuevaComunidad]);
  };

  return (
    <div className="container">
      <div className="row">
        {/* Muestra las comunidades existentes */}
        {comunidadesLocales.map((comunidad) => (
          <div key={comunidad.id} className="row-md-4">
            <CardComunidad
              imageUrl={comunidad.imageUrl}
              title={comunidad.title}
              onAddToCartClicked={() => addToCart(comunidad.id)}
            />
          </div>
        ))}

        {/* Botón para añadir una comunidad ficticia */}
        <div className="row-md-4">
          <button
            className="btn btn-success"
            onClick={agregarComunidadFicticia}
          >
            Añadir Comunidad Ficticia
          </button>
        </div>

        <div className="row-md-4">
          <NuevoContacto />
        </div>
      </div>
    </div>
  );
}
