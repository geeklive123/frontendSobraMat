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
    const [previewImage, setPreviewImage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false); 
    const [categorias, setCategorias] = useState([]);  // Nuevo estado para las categorías

    const departamentos = ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosi', 'Tarija', 'Beni', 'Pando', 'Sucre'];
    const estados = ['Nuevo', 'Usado - Como Nuevo', 'Usado - Buen Estado', 'Usado - Aceptable'];

    // Función para obtener las categorías
    const fetchCategorias = async () => {
        try {
            const response = await fetch('https://sobramat-services.onrender.com/categories/');
            if (!response.ok) {
                throw new Error('Error al cargar las categorías');
            }
            const data = await response.json();
            setCategorias(data);  // Guardamos las categorías en el estado
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para obtener el producto
    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://sobramat-services.onrender.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Error al cargar el producto');
            }
            const data = await response.json();
            setProduct(data);
            setOriginalProduct(data);
            setPreviewImage(data.imagen_url);  // Setear la imagen original para la vista previa
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();  // Obtener las categorías cuando el componente se monte
        fetchProduct();     // Obtener el producto
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'nombre_producto' && value.length > 80) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value.slice(0, 80),
            }));
        } else if (name === 'descripcion' && value.length > 400) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value.slice(0, 400),
            }));
        } else if (name === 'precio') {
            const numericValue = Math.max(0, Math.min(value, 5000));
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: numericValue,
            }));
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(product.imagen_url); // Restablecer a la imagen original si no hay archivo
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const confirmUpdate = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('No hay usuario logueado. Por favor, inicie sesión.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre_producto', product.nombre_producto);
        formData.append('descripcion', product.descripcion);
        formData.append('precio', product.precio);
        formData.append('estado_producto', product.estado_producto);
        formData.append('categoria_id', product.categoria_id);
        formData.append('departamento', product.departamento);
        formData.append('numero_celular', product.numero_celular);
        formData.append('usuario_id', user.id);

        if (imageFile) {
            formData.append('imagen_url', imageFile);
        }

        try {
            const response = await fetch(`https://sobramat-services.onrender.com/products/edit/${id}`, {
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
        setShowCancelModal(true);
    };

    const confirmCancel = () => {
        navigate(-1);
    };

    const rejectCancel = () => {
        setShowCancelModal(false);
    };

    const hasChanges = Object.keys(product).some((key) => product[key] !== originalProduct[key]);

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
                        maxLength="80"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-black" htmlFor="descripcion">
                        Descripción <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="descripcion"
                        value={product.descripcion}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                        maxLength="400"
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-black" htmlFor="precio">
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
                    <label className="block mb-2 text-black" htmlFor="estado_producto">
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
                    <label className="block mb-2 text-black" htmlFor="categoria_id">
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
                    <label className="block mb-2 text-black" htmlFor="departamento">
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
                    <label className="block mb-2 text-black" htmlFor="numero_celular">
                        Número de Celular <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="numero_celular"
                        value={product.numero_celular}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                        pattern="^\+?[1-9]\d{1,14}$"
                        maxLength="15"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-black" htmlFor="imagen_url">
                        Imagen del producto <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name="imagen_url"
                        onChange={handleImageChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                    />
                    {previewImage && (
                        <div className="mt-2">
                            <img src={previewImage} alt="Vista previa" className="w-full h-auto" />
                        </div>
                    )}
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={cancelUpdate}
                        className="text-white bg-red-500 p-2 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={!hasChanges}
                        className={`p-2 rounded ${hasChanges ? 'bg-green-500' : 'bg-gray-400'} text-white`}
                    >
                        Actualizar
                    </button>
                </div>
            </form>

            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-yellow-500 p-5 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold">Confirmación</h2>
                        <p>¿Estás seguro de que deseas actualizar el producto?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={confirmUpdate}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Sí, actualizar
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                No, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de cancelación */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-yellow-500 p-5 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold">Cancelar cambios</h2>
                        <p>¿Estás seguro de que deseas cancelar la actualización?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={confirmCancel}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Sí, cancelar
                            </button>
                            <button
                                onClick={rejectCancel}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                No, continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
