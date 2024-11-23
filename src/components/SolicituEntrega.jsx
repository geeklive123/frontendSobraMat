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

export default function SolicitudEntrega() {
  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Pedido</h2>

      {data.map((item) => (
        <div key={item.id} className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">

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

  
          <div className="grid grid-cols-3 gap-4 mb-4">

            <div className="bg-gray-300 h-40 flex items-center justify-center rounded-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_no_key.png"
                alt="Mapa estático"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

  
            <div className="flex flex-col space-y-4">
              <div>
                <label className="font-semibold mb-1 block">
                  Nombre del Destinatario:
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre del destinatario"
                  className="bg-gray-200 p-2 rounded-md w-full"
                />
              </div>
              <div>
                <label className="font-semibold mb-1 block">Dirección:</label>
               <p>Villa Pagador</p>
              </div>
              <div>
                <label className="font-semibold mb-1 block">Teléfono:</label>
                <input
                  type="text"
                  placeholder="Ingrese el teléfono de contacto"
                  className="bg-gray-200 p-2 rounded-md w-full"
                />
              </div>
            </div>

      
            <div className="flex items-center justify-start ml-4">
              <p className="text-lg font-semibold mr-4">
                ¿Tiene una dirección de entrega?
              </p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Elegir
              </button>
            </div>
          </div>
        </div>
      ))}


      <div className="flex justify-between mt-4">
  <button className="bg-gray-400 text-white py-2 px-4 rounded-md">
    Volver
  </button>

  <div className="flex space-x-4">
    <button className="bg-green-600 text-white py-2 px-4 rounded-md">
      Limpiar
    </button>
    <button className="bg-green-600 text-white py-2 px-4 rounded-md">
      Enviar solicitud
    </button>
  </div>
</div>  
    </div>
  );
}
