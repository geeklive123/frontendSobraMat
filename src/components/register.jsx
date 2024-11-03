import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessages = { ...errors };
    if (name === 'username') {
      if (!value) errorMessages.username = 'Este campo es obligatorio';
      else if (/[^a-zA-Z\s]/.test(value)) errorMessages.username = 'El nombre no puede contener caracteres especiales';
      else if (value.length > 15) setFormData({ ...formData, username: value.slice(0, 15) });
      else delete errorMessages.username;
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMessages.email = 'Este campo es obligatorio';
      else if (!emailRegex.test(value)) errorMessages.email = 'El correo debe cumplir con el formato alias@gmail.com';
      else delete errorMessages.email;
    }
    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
      if (!value) errorMessages.password = 'Este campo es obligatorio';
      else if (!passwordRegex.test(value)) errorMessages.password = 'La contraseña debe incluir al menos un número, una mayúscula y un carácter especial';
      else if (value.length < 8) errorMessages.password = 'La contraseña debe tener al menos 8 caracteres';
      else delete errorMessages.password;
    }
    if (name === 'confirmPassword') {
      if (value !== formData.password) errorMessages.confirmPassword = 'Las contraseñas no coinciden';
      else delete errorMessages.confirmPassword;
    }
    setErrors(errorMessages);
    validateForm();
  };

  const validateForm = () => {
    setIsFormValid(Object.keys(errors).length === 0 && Object.values(formData).every((val) => val !== ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_usuario: formData.username,
            correo_electronico: formData.email,
            contrasena: formData.password,
          }),
        });
        
        const data = await response.json();
        if (response.ok) {
          setSuccessMessage('Registro exitoso. Puedes iniciar sesión.');
          setErrorMessage('');
          setFormData({ username: '', email: '', password: '', confirmPassword: '' });
          navigate('/login'); 
        } else {
          setErrorMessage(data.error || 'Error en el registro');
          setSuccessMessage('');
        }
      } catch (error) {
        setErrorMessage('Error al comunicarse con el servidor');
        setSuccessMessage('');
      }
    } else {
      console.log('Please fill all required fields correctly');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/imageniniregister.jpeg)' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 0,
        }}
      ></div>

      <div className="flex flex-col items-center space-y-4 z-10 p-4">
        <img src="/logo.png" alt="Descripción de la imagen" className="mb-4" style={{ maxWidth: '100px' }} />
        
        <h2 className="text-3xl font-light text-white text-center mb-2">REGÍSTRATE</h2>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="bg-yellow-500 p-4 rounded-lg shadow-lg w-full max-w-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                placeholder="Ej: Juan Martínez"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="Ej: juan21@gmail.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Ej: contraseñaJM_7"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-2 top-2 text-gray-600 focus:outline-none"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-2 top-2 text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              className={`bg-black text-white w-full py-2 rounded-lg ${isFormValid ? 'hover:bg-teal-900' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Registrarse
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Al registrarse, acepta nuestros <a href="#" className="text-teal-600 underline">Términos de uso</a> y <a href="#" className="text-teal-600 underline">Política de privacidad</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
