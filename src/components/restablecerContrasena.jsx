import React, { useState, useEffect} from "react";
import CardMaterial from './cardMaterial';
import { useNavigate } from "react-router-dom";


const RestablecerContrasena = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const emailRecuperado = localStorage.getItem('emailRecuperacion');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validaciones
    if (!isConfirmed) {
      setModalMessage("Confirme el cambio de contraseña");
      setIsModalOpen(true);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setModalMessage("No coinciden las contraseñas");
      setIsModalOpen(true);
      return;
    }
  
    // Obtener el email del localStorage
    const emailRecuperado = localStorage.getItem('emailRecuperacion');
  
    // Crear el cuerpo de la solicitud
    const body = {
      correo_electronico: emailRecuperado,
      nueva_contrasena: newPassword,
    };
  
    try {
      const response = await fetch('https://sobramat-services.onrender.com/auth/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar la contraseña');
      }
  
      const data = await response.json()
      .then(() => setModalMessage("Contraseña actualizada correctamente"))
      .finally(() => navigate('/iniciarSesion'))
      
      
    } catch (error) {
      setModalMessage(error.message || "Ocurrió un error al actualizar la contraseña");
    } finally {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra la ventana modal
  };

  return (
    <div className="bg-gray-800 text-black min-h-screen flex items-center justify-center">
      {/* Contenedor principal */}
      <div className="w-full max-w-sm bg-orange-400 p-6 rounded-lg shadow-md space-y-4">
        {/* Título */}
        <h2 className="text-xl font-bold text-center">Restablecer Contraseña</h2>
        <p className="text-sm text-center">Ingresa tu nueva contraseña</p>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Campo de Nueva Contraseña */}
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium">
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingresar nueva contraseña"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              required
            />
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium">
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              required
            />
          </div>

          {/* Checkbox para Confirmar */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="confirm-checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="mr-2 w-4 h-4 border-gray-300 rounded focus:ring-blue-300"
            />
            <label htmlFor="confirm-checkbox" className="text-sm">
              Confirmar
            </label>
          </div>

          {/* Botón de Guardar */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-gray-800 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            Guardar nueva contraseña
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <p className="text-center text-black font-medium">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestablecerContrasena;