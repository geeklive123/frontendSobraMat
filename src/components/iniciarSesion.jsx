import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import logo from '../assets/logo.png'; 
import backgroundImage from '../assets/IMAGENINICIARSESIO.jpeg';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const InicioSesion = () => {
  const { setUser } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const navigate = useNavigate();

  const handleInicioSesion = () => {
    navigate('/registro'); // Redirige al registro
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sobramat-services.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_electronico: email, contrasena: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error en el inicio de sesión');
        return;
      }

      const data = await response.json();
      console.log('Inicio de sesión exitoso', data);

      setUser(data.user);  // Establece el usuario en el contexto global
      localStorage.setItem('user', JSON.stringify(data.user)); // Guarda el usuario en el localStorage
      navigate('/listMaterial'); // Redirige a la lista de materiales

    } catch (error) {
      console.error('Error:', error);
      setError('Inicio de sesión fallido. Verifique sus credenciales');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Contenedor para el logo y el texto, con margen superior para separar */}
      <div className="absolute top-20"> 
        <img 
          src={logo} 
          alt="Logo"
          className="h-24 w-auto mx-auto"  // Asegura que el logo se alinee al centro
        />
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">INICIAR SESIÓN</h2>
      </div>

      {/* Formulario de inicio de sesión */}
      <div className="w-full max-w-md p-8 space-y-6 bg-opacity-80 bg-yellow-400 rounded-lg shadow-md">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'} // Cambia entre 'text' y 'password' dependiendo del estado
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)} // Alterna el estado para mostrar/ocultar la contraseña
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Muestra un icono dependiendo del estado */}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Iniciar Sesión
          </button>
          
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>

        <div className="text-center mt-4">
          <p className="mt-4">
            ¿Olvidaste tu contraseña?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={() => navigate('/recuperar-contrasena')} // Cambia esta ruta según tu implementación
            >
              Recuperar aquí
            </span>
          </p>

          <p className="mt-4">
            ¿No tienes cuenta?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={handleInicioSesion} // Redirige al registro
            >
              Regístrate aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
