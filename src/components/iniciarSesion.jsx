import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 

const InicioSesion = () => {
  const { setUser } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInicioSesion= () => {
    navigate('/registro'); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
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

      
      setUser(data.user); 

     
      navigate('/listMaterial'); 

    } catch (error) {
      console.error('Error:', error);
      setError('Inicio de sesión fallido. Verifique sus credenciales');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-5 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Inicio de Sesión</h2>
      <div className="w-full max-w-md p-8 space-y-6 bg-yellow-400 rounded-lg shadow-md">
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Iniciar Sesión
          </button>
          
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
        <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleInicioSesion}
          >
           Crer Cuenta
          </button>
      </div>
      
    </div>
  );
};

export default InicioSesion;
