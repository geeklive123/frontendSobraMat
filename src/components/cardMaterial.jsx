import React from 'react';


// this component depends on the component listMaterial
const CardMaterial = ({ material }) => {
    const { id, nombre, urlImage, precio, description } = material;
    return (
      <div className="bg-yellow-400 rounded-lg overflow-hidden text-gray-800 transition duration-400 hover:-translate-y-2 cursor-pointer">
        <div className="flex justify-between items-center p-4">
         <img src={urlImage} alt={nombre} className="w-full h-48 object-cover" />
        </div>
        <div className="p-4">
          <p className="font-bold text-lg mb-2">{nombre}</p>
          <p className="font-bold text-xl mb-2">$ {precio}</p>
          <p>{description}</p>
        </div>
      </div>
    );
  };
  
  export default CardMaterial;