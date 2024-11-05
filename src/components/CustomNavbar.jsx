

import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaBookmark, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';




const CustomNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [myUser,setMyUser] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
      
    const user = JSON.parse(localStorage.getItem('user'));
    setMyUser(user);
}, []); 



  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleRedirectToUpload = () => {
    navigate('/upload'); 
  };

  const handleRedirectToProducts = () => {
    navigate('/ListMaterial'); 
  };
  const handleRedirectToStore = () => {
    navigate('/filtro'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/iniciarSesion'); 
  };

  return (
    <nav className="bg-[#06333c] px-4 py-2 flex items-center justify-between">
  
      <a href="#" className="flex items-center space-x-2">
        <img src="logo.png" alt="Logo" className="h-10" /> 
      </a>

 
      <button 
        className="text-white text-2xl md:hidden" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

   
      <div className="hidden md:flex space-x-4">
        <button onClick={handleRedirectToProducts} className="text-white px-3 py-1 rounded hover:bg-[#08545b] transition">
          Mis Productos
        </button>
        <button onClick={handleRedirectToStore} className="text-white px-3 py-1 rounded hover:bg-[#08545b] transition">
          Tienda
        </button>
        <button onClick={handleRedirectToUpload} className="text-white px-3 py-1 rounded hover:bg-[#08545b] transition">
            Crear Producto
          </button>
      </div>

  
      <div className="hidden md:flex items-center w-1/3 bg-gray-100 rounded-full">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-transparent w-full px-4 py-2 outline-none text-gray-700 rounded-l-full"
        />
        <button className="px-4 text-gray-600">
          <FaSearch />
        </button>
      </div>


      <div className="hidden md:flex items-center space-x-4">
        <a href="#" className="text-white text-lg">
          <FaShoppingCart />
        </a>
        <a href="#" className="text-white text-lg">
          <FaBookmark />
        </a>
        <button onClick={handleLogout} className="bg-yellow-500 text-gray-800 px-4 py-1 rounded hover:bg-yellow-600 transition">
          Cerrar Sesión
        </button>
      </div>


      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-[#06333c] flex flex-col items-center space-y-4 py-4 md:hidden z-10">
          <button onClick={handleRedirectToProducts} className="text-white px-3 py-1 rounded hover:bg-[#08545b] transition">
            Mis Productos
          </button>
          <button onClick={handleRedirectToStore} className="text-white px-3 py-1 rounded hover:bg-[#08545b] transition">
            Tienda
          </button>
          <button onClick={handleRedirectToUpload} className="text-white px-3 py-1 rounded hover:bg-[#08545b] transition">
            Crear Producto
          </button>
        
          <div className="flex items-center bg-gray-100 rounded-full w-10/12">
            <input
              type="text"
              placeholder="Buscar"
              className="bg-transparent w-full px-4 py-2 outline-none text-gray-700 rounded-l-full"
            />
            <button className="px-4 text-gray-600">
              <FaSearch />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white text-lg">
              <FaShoppingCart />
            </a>
            <a href="#" className="text-white text-lg">
              <FaBookmark />
            </a>
          </div>
      {myUser && (
        <p className='text-center text-black' >  {myUser.nombre_usuario || "" }</p>
      )}
          <button onClick={handleLogout} className="bg-yellow-500 text-gray-800 px-4 py-1 rounded hover:bg-yellow-600 transition">
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default CustomNavbar;
