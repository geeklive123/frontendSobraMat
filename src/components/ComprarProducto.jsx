import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ComprarProducto = () => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre (solo permite caracteres alfabéticos)
    if (!formValues.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (!/^[A-Za-z\s]+$/.test(formValues.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras.";
    }

    // Validación del teléfono (debe comenzar con 6 o 7 y tener entre 7 a 10 dígitos)
    if (!formValues.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^[67]\d{7,10}$/.test(formValues.telefono)) {
      newErrors.telefono = "Ingrese un número válido que comience con 6 o 7.";
    }

    // Validación del correo electrónico
    if (!formValues.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email.trim())) {
      newErrors.email = "Ingrese un correo válido.";
    }

    // Validación del mensaje (no más de 400 caracteres)
    if (!formValues.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio.";
    } else if (formValues.mensaje.length > 400) {
      newErrors.mensaje = "El mensaje no puede superar los 400 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSuccessModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/listMaterial"); // Redirige a `ListMaterial`
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-orange-400 p-6 rounded-lg shadow-lg w-full sm:w-96"
      >
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Confirmar Compra
        </h2>

        <div className="mb-4">
          <label className="block text-black font-semibold mb-2">
            Nombre Completo:*
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingrese su nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black font-semibold mb-2">
            Teléfono:*
          </label>
          <input
            type="tel"
            name="telefono"
            placeholder="+591 Ingrese un número válido"
            value={formValues.telefono}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${errors.telefono ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black font-semibold mb-2">
            Correo Electrónico:*
          </label>
          <input
            type="email"
            name="email"
            placeholder="Ingrese un correo válido"
            value={formValues.email}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-black font-semibold mb-2">
            Mensaje:*
          </label>
          <textarea
            name="mensaje"
            placeholder="Ingrese un mensaje para solicitar compra"
            value={formValues.mensaje}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${errors.mensaje ? "border-red-500" : "border-gray-300"}`}
            rows="4"
          />
          {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-200"
        >
          CONFIRMAR COMPRA
        </button>
      </form>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold text-center text-black mb-4">
              Solicitud enviada correctamente
            </h2>
            <button
              onClick={handleModalClose}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprarProducto;
