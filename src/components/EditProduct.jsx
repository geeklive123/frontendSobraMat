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
    const [showCancelModal, setShowCancelModal] = useState(false); // Nuevo estado para el modal de cancelación

    const categorias = [
        { id: 1, nombre: 'Herramientas' },
        { id: 2, nombre: 'Materiales de construccion' },
        { id: 3, nombre: 'Equipos' },
    ];

    const departamentos = ['La Paz','Cochabamba', 'Santa Cruz','Oruro','Potosi','Tarija','Beni','Pando','Sucre'];
    const estados = ['Nuevo', 'usado - como nuevo', 'usado - buen estado', 'usado - aceptable'];

    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://sobramat-services.onrender.com/products/${id}`);
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
        } else if (name === 'precio') {
            // Limitar el precio a un máximo de 5000
            const numericValue = Math.max(0, Math.min(value, 5000)); // Asegura que el precio no sea mayor que 5000 ni menor que 0
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
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('No hay usuario logueado. Por favor, inicie sesión.');
            return;
        }
        console.log("Confirm update called");
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

        console.log("Updating product with data:", formData);

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
        setShowCancelModal(true); // Muestra el modal de cancelación
    };

    const confirmCancel = () => {
        navigate(-1); // Regresa a la página anterior
    };

    const rejectCancel = () => {
        setShowCancelModal(false); // Cierra el modal y sigue en la página actual
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
                        style={{
                            resize: 'none'
                        }}
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
                    <label className="block mb-2 text-white" htmlFor="imagen_url">
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

            {/* Modal de Confirmación */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-black text-xl font-semibold mb-4">¿Estás seguro?</h2>
                        <p className=" text-black mb-4">¿Quieres actualizar este producto?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={confirmUpdate}
                                className="bg-green-500 text-white p-3 rounded mr-3"
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white p-3 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Cancelación */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-black text-xl font-semibold mb-4">Confirmacion</h2>
                        <p className=" text-black mb-4">Todos los cambios realizados no se guardaran ¿Desea Continuar?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={confirmCancel}
                                className="bg-red-500 text-white p-2 rounded mr-2"
                            >
                                Sí,Cancelar
                            </button>
                            <button
                                onClick={rejectCancel}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                               Seguir editando
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
