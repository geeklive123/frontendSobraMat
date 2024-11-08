import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import backgroundImage from '../assets/imagenREGISTRARSE.jpeg';

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
  const [isEmailRegistered, setIsEmailRegistered] = useState(false); // Para verificar si el correo ya está registrado

  // Se ejecuta cuando el correo cambia
  useEffect(() => {
    if (formData.email) {
      // Verificar si el correo ya está registrado
      checkEmailAvailability(formData.email);
    }
  }, [formData.email]);

  // Mostrar advertencia cuando el usuario intente salir sin haber completado el formulario
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (Object.values(formData).some((value) => value)) {
        const message = "Tienes cambios no guardados. ¿Estás seguro de que quieres salir?";
        event.returnValue = message; // Esto mostrará el mensaje en algunos navegadores
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevenir espacios en blanco en el nombre de usuario y correo
    if (value.includes(" ")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'El campo no puede contener espacios.',
      }));
      return; // No actualizar el estado si hay espacios
    }

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
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(`https://sobramat-services.onrender.com/auth/check-email?email=${email}`);
      const data = await response.json();
      setIsEmailRegistered(data.isRegistered); // Se actualiza el estado del correo registrado
    } catch (error) {
      console.error('Error al verificar el correo:', error);
    }
  };

  const validateForm = () => {
    // Validamos si el formulario es válido considerando los errores y campos no vacíos
    setIsFormValid(
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((val) => val !== '') && // Asegurarse de que todos los campos estén completos
      !isEmailRegistered // El correo no debe estar registrado
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid && !isEmailRegistered) {
      try {
        const response = await fetch('https://sobramat-services.onrender.com/auth/register', {
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
          navigate('/iniciarSesion'); 
        } else {
          setErrorMessage(data.error || 'Error en el registro');
          setSuccessMessage('');
        }
      } catch (error) {
        setErrorMessage('Ese correo ya está registrado');
        setSuccessMessage('');
      }
    } else {
      console.log('Por favor, llena todos los campos correctamente');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
      <div className="absolute top-20"> 
        <img 
          src={logo} 
          alt="Logo"
          className="h-24 w-auto mx-auto"
        />
      </div>
      <div className="flex flex-col items-center space-y-4 z-10 p-4">
        <h2 className="text-3xl font-light text-white text-center mb-2">REGÍSTRATE</h2>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="bg-yellow-500 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nombre de Usuario <span className="text-red-500">*</span></label>
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
              <label className="block text-gray-700 font-bold mb-2">Correo Electrónico <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Ej: juan21@gmail.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              {isEmailRegistered && <p className="text-red-500 text-sm">Este correo ya está registrado</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Contraseña <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
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
              <label className="block text-gray-700 font-bold mb-2">Confirmar Contraseña <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
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
              disabled={!isFormValid || isEmailRegistered}
            >
              Crear Cuenta
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
