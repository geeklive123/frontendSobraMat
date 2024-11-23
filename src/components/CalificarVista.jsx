import React from "react";

const CalificarProducto = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {/* Título */}
      <h1 className="text-2xl font-semibold mb-6">Calificar Producto</h1>

      {/* Contenedor principal */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        {/* Imagen */}
        <div className="flex justify-center mb-4">
          <img
            src="ruta-de-la-imagen.png"
            alt="Producto"
            className="w-40 h-40 object-cover rounded-full"
          />
        </div>

        {/* Nombre del producto */}
        <h2 className="text-lg text-center font-medium mb-6">Nombre del Producto</h2>

        {/* Estrellas de calificación */}
        <div className="flex justify-around mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-500 text-3xl cursor-pointer">
              ★
            </span>
          ))}
        </div>

        {/* Campo de texto */}
        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Deja tu comentario aquí..."
          ></textarea>
        </div>

        {/* Botón de enviar */}
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition">
          Calificar
        </button>
      </div>
    </div>
  );
};

export default CalificarProducto;
