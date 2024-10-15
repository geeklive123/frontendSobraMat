import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="border rounded-lg p-4 shadow-lg bg-white">
            <h3 className="font-bold">{product.productName}</h3>
            <p>Precio: Bs. {product.price}</p>
            <p>Descripción: {product.description}</p>
            <p>Estado: {product.state}</p>
            <p>Categoría: {product.category}</p>
            <p>Departamento: {product.department}</p>
            <p>Número de contacto: {product.locationReference}</p>
            <div className="mt-4">
                <button onClick={onEdit} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                </button>
                <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">
                    Eliminar
                </button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                    Ver
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
