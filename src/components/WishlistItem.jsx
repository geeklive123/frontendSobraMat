import React from "react";
import { FaHeart, FaCartPlus } from "react-icons/fa";

const WishlistItem = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="font-semibold text-xl">{product.name}</h3>
      <p className="text-gray-600">{product.price}</p>
      <div className="flex justify-between items-center mt-4">
        <button className="text-red-500">
          <FaHeart className="text-xl" />
        </button>
        <button className="text-blue-500">
          <FaCartPlus className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
