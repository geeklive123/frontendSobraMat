import React, { useEffect, useState } from 'react';
import CardMaterial from './CardMaterial';

const ListMaterial = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <h1 className="text-3xl font-bold text-center mb-2">MIS PRODUCTOS</h1>
                <h2 className="text-xl text-center mb-6">Subheading</h2>
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
