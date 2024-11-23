import React from "react";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  // Ejemplo de productos en la lista de deseos
  const wishlistProducts = [
    {
      id: 1,
      name: "MAQUINA MEZCLADORA",
      price: "500 Bs.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Arena Fina",
      price: "180 Bs.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Pala",
      price: "30 Bs.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-[#06333c] p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Mi Lista de Deseos</h1>
      </header>

      {/* Lista de productos */}
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <WishlistItem key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4 mt-8">
        <p>© 2024 Mi Tienda Online</p>
      </footer>
    </div>
  );
};

export default Wishlist;