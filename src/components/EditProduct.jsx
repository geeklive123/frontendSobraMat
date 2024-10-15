import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nombre_producto: '',
        descripcion: '',
        precio: '',
        estado_producto: '',
        categoria_id: '',
        departamento: '',
        imagen_url: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const categorias = [
        { id: 1, nombre: 'Construcción' },
        { id: 2, nombre: 'Electrónica' },
        { id: 3, nombre: 'Muebles' },
    ];

    const departamentos = ['Cochabamba', 'La Paz', 'Santa Cruz'];
    const estados = ['Nuevo', 'Usado', 'Refurbished'];

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('nombre_producto', product.nombre_producto);
        formData.append('descripcion', product.descripcion);
        formData.append('precio', product.precio);
        formData.append('estado_producto', product.estado_producto);
        formData.append('categoria_id', product.categoria_id);
        formData.append('departamento', product.departamento);

        if (imageFile) {
            formData.append('imagen_url', imageFile);
        }

        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            const updatedProduct = await response.json();
            navigate(`/details/${id}`); 
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-gray-800 text-white p-5">
            <h1 className="text-3xl font-bold text-center mb-4">Editar Producto</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-yellow-400 p-5 rounded-lg shadow-lg"
                encType="multipart/form-data"
            >
                <div className="mb-4">
                    <label className="block mb-2 text-black" htmlFor="nombre_producto">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        name="nombre_producto"
                        value={product.nombre_producto}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="descripcion">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        value={product.descripcion}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="precio">
                        Precio
                    </label>
                    <input
                        type="number"
                        name="precio"
                        value={product.precio}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="estado_producto">
                        Estado
                    </label>
                    <select
                        name="estado_producto"
                        value={product.estado_producto}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                    >
                        <option value="">Selecciona un estado</option>
                        {estados.map((estado, index) => (
                            <option key={index} value={estado}>
                                {estado}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="categoria_id">
                        Categoría
                    </label>
                    <select
                        name="categoria_id"
                        value={product.categoria_id}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="departamento">
                        Departamento
                    </label>
                    <select
                        name="departamento"
                        value={product.departamento}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                    >
                        <option value="">Selecciona un departamento</option>
                        {departamentos.map((departamento, index) => (
                            <option key={index} value={departamento}>
                                {departamento}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="imagen_url">
                        Subir Imagen
                    </label>
                    <input
                        type="file"
                        name="imagen_url"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                    />
                </div>

               
                {product.imagen_url && (
                    <div className="mb-4">
                        <label className="block mb-2 text-white">Imagen Actual</label>
                        <img
                            src={product.imagen_url}
                            alt="Imagen del producto"
                            className="w-full h-auto rounded"
                        />
                    </div>
                )}

                <button type="submit" className="bg-gray-900 p-2 rounded hover:bg-yellow-500">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
