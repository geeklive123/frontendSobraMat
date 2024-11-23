import React from "react";
import { FaHeart, FaCartPlus } from "react-icons/fa";

const WishlistItem = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">{product.price}</p>
        <div className="flex items-center justify-between mt-4">
          {/* Botón de agregar al carrito */}
          <button className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
            <FaCartPlus className="mr-2" />
            Comprar
          </button>

          {/* Botón de lista de deseos */}
          <button className="text-red-500 text-xl hover:text-red-600">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;