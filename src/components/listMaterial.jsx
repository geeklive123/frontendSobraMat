import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardMaterial from './cardMaterial';

const ListMaterial = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:5000/products/');
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            const data = await response.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-gray-800 text-white p-5">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">MIS PRODUCTOS</h1>
                    <button 
                        onClick={() => navigate('/upload')}
                        className="bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Registrar Producto
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {productos.map((item) => (
                        <CardMaterial key={item.id} material={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListMaterial;
