import React, { useState } from "react";

const Wishlist = ({ productos }) => {
  const [wishlist, setWishlist] = useState(productos || []); // Inicializar con los productos recibidos

  const [notification, setNotification] = useState(""); // Para manejar mensajes de confirmación

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== productId);
    setWishlist(updatedWishlist);

    // Mostrar notificación temporal
    setNotification("Producto eliminado de la lista de deseos.");
    setTimeout(() => setNotification(""), 3000); // Ocultar mensaje después de 3 segundos
  };

  return (
    <div className="p-4">
      {/* Encabezado */}
      <h1 className="text-2xl font-bold mb-4">Mi Lista de Deseos</h1>

      {/* Notificación */}
      {notification && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}

      {/* Contenido de la wishlist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wishlist.length > 0 ? (
          wishlist.map((producto) => (
            <div key={producto.id} className="border border-gray-300 bg-white p-2 rounded flex flex-col items-center">
              <div className="w-full h-0 pb-[100%] relative">
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre_producto}
                  className="absolute top-0 left-0 w-full h-full rounded"
                />
              </div>
              <div className="mt-2 text-center">
                <p>Nombre: {producto.nombre_producto}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Estado: {producto.estado_producto}</p>
                <p>Departamento: {producto.departamento}</p>
              </div>
              <div className="flex mt-2 space-x-2">
                <button
                  onClick={() => handleRemoveFromWishlist(producto.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded"
                >
                  Eliminar de favoritos
                </button>
                <button className="bg-blue-500 text-white py-1 px-4 rounded">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes productos en tu lista de favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;