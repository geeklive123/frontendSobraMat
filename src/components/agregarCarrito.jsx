import React, { useEffect, useState } from 'react';

const AgregarCarrito = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Cargar la wishlist desde localStorage
    const storedWishlist = JSON.parse(localStorage.getItem('agregarCarrito')) || [];
    console.log('Cargando carrito desde localStorage:', storedWishlist); // Verifica el contenido cargado
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    console.log('Eliminando producto con id:', productId); // Verifica que el id es correcto
    const updatedWishlist = wishlist.filter(product => product.id !== productId);
    console.log('Lista actualizada:', updatedWishlist); // Verifica el resultado de la eliminación
    setWishlist(updatedWishlist);
    localStorage.setItem('agregarCarrito', JSON.stringify(updatedWishlist)); // Guardar los cambios en localStorage
  };

  // Calcular el total de los precios en el carrito
  const total = wishlist.reduce((acc, product) => acc + product.precio, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {wishlist.length > 0 ? (
        <>
          {wishlist.map((producto) => (
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
              <button
                onClick={() => handleRemoveFromWishlist(producto.id)}
                className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
              >
                Eliminar Carrito
              </button>
            </div>
          ))}
          <div className="col-span-3 text-center mt-4">
            <p className="text-lg font-semibold">Total: ${total}</p>
          </div>
        </>
      ) : (
        <p>No tienes producto en tu carrito de Compra</p>
      )}
    </div>
  );
};

export default AgregarCarrito;
