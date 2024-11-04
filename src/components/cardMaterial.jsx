import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardMaterial = ({ material }) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(`/details/${material.id}`);
    };

    const baseURL = 'https://sobramat-services.onrender.com'; 
    const imageUrl = material.imagen_url.startsWith('http') ? 
                     material.imagen_url : 
                     `${baseURL}${material.imagen_url}`;

    const handleImageError = (e) => {
        e.target.src = '/path/to/placeholder-image.jpg'; 
        console.error("Error loading image:", imageUrl);
    };

    return (
        <div className="bg-yellow-400 p-4 rounded-lg shadow-lg cursor-pointer" onClick={handleClick}>
            <img
                src={imageUrl}
                alt={material.nombre_producto}
                className="w-full h-32 object-cover rounded-t-lg"
                onError={handleImageError}
            />
            <h3 className="text-xl text-black font-semibold mt-2">{material.nombre_producto}</h3>
            <p className="font-bold text-black">${material.precio}</p>
            <p className="text-lg mt-2">
                <strong>Estado:</strong> {material.estado_producto}
            </p>
        </div>
    );
};

export default CardMaterial;
