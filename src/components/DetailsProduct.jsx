import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from './Modal';

const DetailsProduct = () => {
    const { id } = useParams();  // Obtener el id del producto desde la URL
    const navigate = useNavigate();  // Navegar entre páginas
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [category, setCategory] = useState(null);  // Guardar la categoría del producto
    const [isModalOpen, setIsModalOpen] = useState(false); 

    // Función para obtener los detalles del producto
    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://sobramat-services.onrender.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Error al cargar el producto');
            }
            const data = await response.json();
            setProduct(data);  // Guardamos el producto
            console.log('Producto recibido:', data);  // Verifica que el producto llega correctamente

            // Verifica si el producto tiene un ID de categoría válido
            if (data && data.categoria_id) {
                console.log('ID de categoría:', data.categoria_id);  // Verifica que el ID de categoría es correcto
                fetchCategory(data.categoria_id);  // Llamamos a la función para cargar la categoría
            } else {
                console.error('El producto no tiene una categoría válida');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);  // Se detiene el estado de "cargando"
        }
    };

    // Función para obtener la categoría
    const fetchCategory = async (categoryId) => {
        try {
            const response = await fetch(`https://sobramat-services.onrender.com/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error('Error al cargar la categoría');
            }
            const data = await response.json();
            console.log('Categoría recibida:', data);  // Verificación de la categoría
            setCategory(data);  // Guardamos la categoría en el estado
        } catch (err) {
            console.error('Error al obtener la categoría:', err);  // Mejor manejo de errores
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchProduct();  // Llamamos a la función para obtener el producto cuando el componente se monta
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://sobramat-services.onrender.com/products/${id}`, {
                method: 'DELETE',  // Usamos el método DELETE para eliminar el producto
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            navigate('/listMaterial');  // Redirigimos a la lista de materiales
        } catch (err) {
            setError(err.message);
        } finally {
            setIsModalOpen(false);  // Cerramos el modal
        }
    };

    if (loading) return <div>Cargando...</div>;  // Mostramos un mensaje de carga
    if (error) return <div className="text-red-500">{error}</div>;  // Mostramos el error si ocurre

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
                    <p className="text-lg mb-2"><strong>Categoría:</strong> {category ? category.nombre : 'Cargando categoría...'}</p>
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
