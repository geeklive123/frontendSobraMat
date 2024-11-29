import React from "react";
import { useLocation } from "react-router-dom";

const FinalizarCompra = () => {
  const location = useLocation();
  const { producto, formValues } = location.state; // Obtener los datos desde el estado

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Resumen de la Compra</h2>
      
      {/* Información del producto */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 mb-4">
        <h3 className="text-xl font-semibold mb-2">Producto:</h3>
        <p><strong>Nombre:</strong> {producto.nombre}</p>
        <p><strong>Precio:</strong> {producto.precio}</p>
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
      </div>

      {/* Datos del formulario */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 mb-4">
        <h3 className="text-xl font-semibold mb-2">Datos del Cliente:</h3>
        <p><strong>Nombre:</strong> {formValues.nombre}</p>
        <p><strong>Teléfono:</strong> {formValues.telefono}</p>
        <p><strong>Correo Electrónico:</strong> {formValues.email}</p>
        <p><strong>Mensaje:</strong> {formValues.mensaje}</p>
      </div>

      <button
        onClick={() => window.history.back()} // Regresar a la página anterior
        className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Volver
      </button>
    </div>
  );
};

export default FinalizarCompra;
