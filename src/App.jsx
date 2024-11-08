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
        <Route path="/upload" element={<UploadProduct />} />
        <Route path="/details/:id" element={<DetailsProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/listMaterial" element={<ListMaterial />} /> 
        <Route path="/iniciarSesion" element={<InicioSesion />} /> 
        <Route path="/registro" element={<Register />} /> 
        <Route path="/filtro" element={<CategoryFilter />} /> 
      </Routes>
    </div>
  );
};

export default App;
