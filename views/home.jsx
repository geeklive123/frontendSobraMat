//import React from 'react';
import ListMaterial from '../src/components/listMaterial';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to my home page</h1>
      <ListMaterial />
      <Link to="/upload" className="mt-4 inline-block text-blue-500">
        Subir Producto
      </Link>
      <br />
      <Link to="/details" className="mt-4 inline-block text-green-500">
        Ver Detalles del Producto
      </Link> {/* Nuevo enlace para acceder al componente de detalles */}
    </div>
  );
}

export default Home;
