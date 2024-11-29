import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    // Cargar la wishlist desde localStorage
    const storedWishlist = JSON.parse(localStorage.getItem('favoritos')) || [];
    console.log('Cargando wishlist desde localStorage:', storedWishlist); // Verifica el contenido cargado
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    console.log('Eliminando producto con id:', productId); // Verifica que el id es correcto
    const updatedWishlist = wishlist.filter(product => product.id !== productId);
    console.log('Lista actualizada:', updatedWishlist); // Verifica el resultado de la eliminación
    setWishlist(updatedWishlist);
    localStorage.setItem('favoritos', JSON.stringify(updatedWishlist)); // Guardar los cambios en localStorage

    // Mostrar confirmación visual
    setConfirmationMessage('Producto eliminado de favoritos');
    setTimeout(() => setConfirmationMessage(null), 3000); // Ocultar mensaje después de 3 segundos
  };

  const handleAddToCart = (product) => {
    console.log(`Agregando producto con id ${product.id} al carrito`); // Lógica para agregar al carrito

    // Cargar carrito existente desde localStorage o inicializar
    const storedCart = JSON.parse(localStorage.getItem('carrito')) || [];
    const updatedCart = [...storedCart, product];

    // Actualizar localStorage con el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(updatedCart));

    // Mostrar confirmación visual
    setConfirmationMessage('Producto agregado al carrito');
    setTimeout(() => setConfirmationMessage(null), 3000); // Ocultar mensaje después de 3 segundos
  };

  return (
    <div className="p-4">
      {/* Encabezado */}
      <h1 className="text-2xl font-bold text-center mb-6">Mi Lista de Deseos</h1>

      {/* Confirmación visual */}
      {confirmationMessage && (
        <div className="bg-green-200 text-green-800 p-2 rounded text-center mb-4">
          {confirmationMessage}
        </div>
      )}

      {/* Productos de la wishlist */}
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
                <p className="font-semibold">Nombre: {producto.nombre_producto}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Estado: {producto.estado_producto}</p>
                <p>Departamento: {producto.departamento}</p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-2">
                <button
                  onClick={() => handleRemoveFromWishlist(producto.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded"
                >
                  Eliminar de favoritos
                </button>
                <button
                  onClick={() => handleAddToCart(producto)}
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No tienes productos en tu lista de favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
