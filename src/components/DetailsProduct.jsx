import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from './Modal'; 

const DetailsProduct = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://sobramat-services.onrender.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Error al cargar el producto');
            }
            const data = await response.json();
            setProduct(data); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE', 
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            navigate('/listMaterial'); 
        } catch (err) {
            setError(err.message);
        } finally {
            setIsModalOpen(false);
        }
    };

    if (loading) return <div>Cargando...</div>; 
    if (error) return <div className="text-red-500">{error}</div>; 

    const baseURL = 'http://localhost:5000';
    const imageUrl = product.imagen_url && product.imagen_url.startsWith('http') ? 
                     product.imagen_url : 
                     `${baseURL}${product.imagen_url}`;

    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row justify-center items-center bg-yellow-400 p-16 rounded-lg shadow-lg max-w-7xl mx-auto mt-10 px-10">
                <div className="border border-gray-100 bg-gray-100/65 rounded-lg w-[600px] h-[600px] mx-auto p-5 mb-10 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Imagen del producto</h2>
                    <div className="flex flex-wrap justify-center">
                        {product.imagen_url ? (
                            <img src={imageUrl} alt="Imagen del producto" className="w-full h-auto max-w-full max-h-[400px] object-cover rounded-lg" />
                        ) : (
                            <p>No hay imágenes disponibles.</p>
                        )}
                    </div>
                </div>
                <div className="md:w-1/2 md:pl-4">
                    <h1 className="text-3xl font-bold mb-6 text-center">{product.nombre_producto}</h1>
                    <p className="text-lg mb-2"><strong>Precio:</strong> Bs. {product.precio}</p>
                    <p className="text-lg mb-2"><strong>Estado:</strong> {product.estado_producto}</p>
                    <p className="text-lg mb-2"><strong>Categoría:</strong> {product.categoria}</p>
                    <p className="text-lg mb-2"><strong>Departamento:</strong> {product.departamento}</p>
                    <p className="text-lg mb-2"><strong>Descripción:</strong> {product.descripcion}</p>
                    <p className="text-lg mb-2"><strong>Celular:</strong> {product.numero_celular}</p>
                    <div className="flex justify-center mt-4">
                        <button className="w-full bg-green-500 text-white py-2 px-4 rounded mr-2" onClick={() => navigate(`/edit/${id}`)}>Editar</button>
                    </div>
                    <div className="flex justify-center mt-4">      
                        <button
                            className="w-full bg-red-500 text-white py-2 px-4 rounded"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Eliminar
                        </button>
                    </div> 
                    <div className="flex justify-center mt-4">
                        <button 
                            className="w-full bg-gray-500 text-white py-2 px-4 rounded"
                            onClick={() => navigate('/listMaterial')} 
                        >
                            Atrás
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleDelete} 
            />
        </div>
    );
};

export default DetailsProduct;
