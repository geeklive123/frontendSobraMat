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
        numero_celular: '',
    });
    const [originalProduct, setOriginalProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const categorias = [
        { id: 1, nombre: 'Electrónica' },
        { id: 2, nombre: 'Muebles' },
        { id: 3, nombre: 'Ropa' },
    ];

    const departamentos = ['La Paz','Cochabamba',  'Santa Cruz','Oruro','Potosi','Tarija','Beni','Pando','Sucre'];
    const estados = ['Nuevo', 'usado - como nuevo', 'usado - buen estado', 'usado - aceptable'];

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`);
            if (!response.ok) {
                throw new Error('Error al cargar el producto');
            }
            const data = await response.json();
            setProduct(data);
            setOriginalProduct(data);
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

        if (name === 'nombre_producto' && value.length > 40) {
            return; 
        }

        if (name === 'descripcion' && value.length > 200) {
            return;
        }

        if (name === 'precio' && value < 0) {
            return;
        }

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
        setShowModal(true);
    };

    const confirmUpdate = async () => {
        const formData = new FormData();
        formData.append('nombre_producto', product.nombre_producto);
        formData.append('descripcion', product.descripcion);
        formData.append('precio', product.precio);
        formData.append('estado_producto', product.estado_producto);
        formData.append('categoria_id', product.categoria_id);
        formData.append('departamento', product.departamento);
        formData.append('numero_celular', product.numero_celular);

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
            navigate(`/details/${id}`);
        } catch (err) {
            setError(err.message);
        }
        setShowModal(false);
    };

    const cancelUpdate = () => {
        setShowModal(false);
    };

    const hasChanges = JSON.stringify(product) !== JSON.stringify(originalProduct);

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
                        Nombre del Producto <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="nombre_producto"
                        value={product.nombre_producto}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                        maxLength="40"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="descripcion">
                        Descripción <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="descripcion"
                        value={product.descripcion}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                        maxLength="200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="precio">
                        Precio <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="precio"
                        value={product.precio}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white" htmlFor="estado_producto">
                        Estado <span className="text-red-500">*</span>
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
                        Categoría <span className="text-red-500">*</span>
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
                        Departamento <span className="text-red-500">*</span>
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
                    <label className="block mb-2 text-white" htmlFor="numero_celular">
                        Número de Celular <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="numero_celular"
                        value={product.numero_celular}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                    />
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
                <div className="flex justify-between">
                    <button type="button" onClick={() => navigate(-1)} className="bg-red-500 p-2 rounded text-white hover:bg-red-600">
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="bg-green-500 p-2 rounded text-white hover:bg-green-600" 
                        disabled={!hasChanges}
                    >
                        Actualizar Producto
                    </button>
                </div>
            </form>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-yellow-500 p-5 rounded shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4">Confirmar Actualización</h2>
                        <p>¿Estás seguro de que deseas actualizar este producto?</p>
                        <div className="mt-4">
                            <button onClick={cancelUpdate} className="bg-red-500 p-2 rounded mr-2">Cancelar</button>
                            <button onClick={confirmUpdate} className="bg-green-500 p-2 rounded text-white">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
