import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../views/home';
import UploadProduct from './components/uploadProduct';
import DetailsProduct from './components/DetailsProduct';
import EditProduct from './components/EditProduct';
import ListMaterial from './components/listMaterial';
import InicioSesion from './components/iniciarSesion';
import Register from './components/register';
import CategoryFilter from './components/CategoryFilter';
import CustomNavbar from './components/CustomNavbar'; 
import RecuperarContrasena from './components/recuperarContrasena';
import RestablecerContrasena from './components/restablecerContrasena';
import Wishlist from './components/Wishlist';
import AgregarCarrito from './components/agregarCarrito';
import CalificarVista from './components/CalificarVista';

import OrderPickup  from './components/OrderPickup';
import SolicitudEntrega  from './components/SolicituEntrega';
const App = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const location = useLocation(); // Para detectar cambios en la ruta.

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsUserLogged(user && user.id ? true : false);
  }, [location.pathname]); // Se ejecuta cuando la ruta cambia.

  const isAuthPage = location.pathname === '/iniciarSesion' || location.pathname === '/registro';

  return (
    <div className="App">
      {!isAuthPage && isUserLogged && <CustomNavbar />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderPickup/>} />
        <Route path="/upload" element={<UploadProduct />} />
        <Route path="/details/:id" element={<DetailsProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/listMaterial" element={<ListMaterial />} /> 
        <Route path="/iniciarSesion" element={<InicioSesion />} /> 
        <Route path="/registro" element={<Register />} /> 
        <Route path="/filtro" element={<CategoryFilter />} /> 
        <Route path="/solicitud" element={<SolicitudEntrega />} /> 
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena />} /> 
        <Route path="/RestablecerContrasena" element={<RestablecerContrasena />} /> 
        <Route path="/Wishlist" element={<Wishlist/>} /> 
        <Route path="/AgregarCarrito" element={<AgregarCarrito/>} />      
        <Route path="/CalificarVista" element={<CalificarVista/>} />      
         </Routes>
    </div>
  );
};

export default App;
