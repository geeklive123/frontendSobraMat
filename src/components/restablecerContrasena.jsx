import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RestablecerContrasena = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar la nueva contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setModalMessage(
        "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula y un número."
      );
      setIsModalOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalMessage("No coinciden las contraseñas");
      setIsModalOpen(true);
      return;
    }

    // Abrir el modal de confirmación
    setIsConfirmationModalOpen(true);
  };

  const handleConfirm = async () => {
    const emailRecuperado = localStorage.getItem("emailRecuperacion");

    const body = {
      correo_electronico: emailRecuperado,
      nueva_contrasena: newPassword,
    };

    try {
      const response = await fetch(
        "https://sobramat-services.onrender.com/auth/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la contraseña");
      }

      setModalMessage("Contraseña actualizada correctamente");
      setIsModalOpen(true);

      // Cerrar el modal de confirmación
      setIsConfirmationModalOpen(false);

      // Redirigir a la página de inicio de sesión tras un breve retraso
      setTimeout(() => navigate("/iniciarSesion"), 2000);
    } catch (error) {
      setModalMessage(
        error.message || "Ocurrió un error al actualizar la contraseña"
      );
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-800 text-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-orange-400 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-bold text-center">Restablecer Contraseña</h2>
        <p className="text-sm text-center">Ingresa tu nueva contraseña</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium">
              Nueva Contraseña:
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresar nueva contraseña"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium"
            >
              Confirmar Contraseña:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-gray-800 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            Guardar nueva contraseña
          </button>
        </form>
      </div>

      {/* Modal de error o éxito */}
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

      {/* Modal de confirmación */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <p className="text-center text-black font-medium">
              ¿Estás seguro de que deseas cambiar la contraseña?
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => setIsConfirmationModalOpen(false)}
                className="py-2 px-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="py-2 px-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Confirmar
              </button>
            </div>
          </div>  
        </div>
      )}
    </div>
  );
};

export default RestablecerContrasena;
