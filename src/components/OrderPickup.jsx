import React from "react";

const data = [
  {
    id: 1,
    material: {
      name: "Cemento Portland",
      price: "$50",
      quantity: "10 sacos",
      image: "https://via.placeholder.com/150",
    },
    seller: {
      name: "Juan Pérez",
      phone: "+591 78912345",
      image: "https://via.placeholder.com/150",
    },
  },
];

export default function OrderPickup() {
  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Pedido</h2>

      {data.map((item) => (
        <div key={item.id} className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Material Info */}
            <div className="bg-gray-300 p-4 rounded-lg flex items-center">
              <img
                src={item.material.image}
                alt={item.material.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="font-semibold mb-2">Info del Material</h3>
                <p className="mb-2">
                  <strong>Nombre:</strong> {item.material.name}
                </p>
                <p className="mb-2">
                  <strong>Precio:</strong> {item.material.price}
                </p>
                <p>
                  <strong>Cantidad:</strong> {item.material.quantity}
                </p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-300 p-4 rounded-lg flex items-center">
              <img
                src={item.seller.image}
                alt={item.seller.name}
                className="w-24 h-24 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold mb-2">Info del Vendedor</h3>
                <p className="mb-2">
                  <strong>Nombre:</strong> {item.seller.name}
                </p>
                <p>
                  <strong>Teléfono:</strong> {item.seller.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Map and Address */}
          <div className="grid grid-cols-2 gap-4 items-center mb-4">
            <div className="bg-gray-300 h-40 flex items-center justify-center rounded-lg">
              <p className="text-lg font-semibold">Mapa</p>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Dirección:</label>
              <input
                type="text"
                value="Calle Eliodoro Villazon #128...."
                readOnly
                className="bg-gray-200 p-2 rounded-md"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-gray-400 text-white py-2 px-4 rounded-md">
          Volver
        </button>
        <button className="bg-gray-600 text-white py-2 px-4 rounded-md">
          OK
        </button>
      </div>
    </div>
  );
}
