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
    const [previewImage, setPreviewImage] = useState(''); // Para mostrar la vista previa
    const [showModal, setShowModal] = useState(false);

    const categorias = [
        { id: 1, nombre: 'Electrónica' },
        { id: 2, nombre: 'Muebles' },
        { id: 3, nombre: 'Ropa' },
    ];

    const departamentos = ['La Paz','Cochabamba', 'Santa Cruz','Oruro','Potosi','Tarija','Beni','Pando','Sucre'];
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
            setPreviewImage(data.imagen_url); // Setear la imagen original para la vista previa
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

        if (name === 'nombre_producto' && value.length > 80) { // Limitar a 80 caracteres
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value.slice(0, 80),
            }));
        } else if (name === 'descripcion' && value.length > 400) { // Limitar a 400 caracteres
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value.slice(0, 400),
            }));
        } else if (name === 'precio' && value < 0) {
            return; 
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
                setPreviewImage(reader.result); // Establecer la vista previa de la imagen
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(product.imagen_url); // Restablecer a la imagen original si no hay archivo
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit clicked");
        setShowModal(true);
    };

    const confirmUpdate = async () => {
        console.log("Confirm update called");
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

        console.log("Updating product with data:", formData);

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
        console.log("Cancel update called");
        setShowModal(false);
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
                    <label className="block mb-2 text-white" htmlFor="descripcion">
                        Descripción <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="descripcion"
                        value={product.descripcion}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                        required
                        maxLength="400"
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
                        Número de celular <span className="text-red-500">*</span>
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
                        Imagen
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 rounded bg-white-900 text-gray-500 border border-gray-600"
                    />
                    {previewImage && <img src={previewImage} alt="Vista previa" className="mt-2 w-full h-auto" />}
                </div>
                <button
                    type="submit"
                    className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${!hasChanges ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!hasChanges}
                >
                    Actualizar Producto
                </button>
            </form>

            {/* Modal de Confirmación */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white text-black p-5 rounded shadow-lg z-10">
                        <h2 className="text-xl font-bold mb-4">Confirmar Actualización</h2>
                        <p>¿Estás seguro de que deseas actualizar este producto?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={confirmUpdate}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={cancelUpdate}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
