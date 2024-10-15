import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const UploadProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [department, setDepartment] = useState('');
    const [image, setImage] = useState(null);
    const [locationReference, setLocationReference] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmPublish = () => {
        const formData = new FormData();
        formData.append('nombre_producto', productName);
        formData.append('estado_producto', state);
        formData.append('descripcion', description);
        formData.append('precio', price);
        formData.append('categoria_id', category);
        formData.append('departamento', department);
        formData.append('numero_celular', locationReference);
        
        
        if (image) {
            formData.append('imagen_url', document.getElementById('file-upload').files[0]);
        }

        fetch('http://localhost:5000/products/agregar-producto', {
            method: 'POST',
            body: formData, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setShowSuccessMessage(true);
            } else {
                alert(data.message || 'Error al publicar el producto.');
            }
        })
        .catch(error => {
            console.error('Error al subir el producto:', error);
            alert('Ocurrió un error al publicar el producto. Inténtalo de nuevo más tarde.');
        });

        resetForm();
        setShowConfirmation(false); 
    };

    const resetForm = () => {
        setProductName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setState('');
        setDepartment('');
        setImage(null);
        setLocationReference('');
    };

    const isFormValid = productName && price && description && state && category && department && image && /^[67]\d{7}$/.test(locationReference);

    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
            {showForm && (
                <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row justify-center items-center bg-yellow-400 p-16 rounded-lg shadow-lg max-w-7xl mx-auto mt-50 px-10">
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="absolute top-4 right-4 bg-transparent text-gray-900 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="border border-gray-100 bg-gray-100/65 rounded-lg w-[600px] h-[600px] mx-auto p-5 mb-30 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Vista previa de imagen</h2>
                        <div className="flex flex-wrap justify-center">
                            {image && (
                                <div className="relative m-2">
                                    <img src={image} alt="Vista previa" className="w-24 h-24 object-cover rounded-lg" />
                                    <button
                                        onClick={removeImage}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        type="button"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 text-center">
                            {image ? 'Imagen seleccionada' : 'Puedes agregar una imagen.'}
                        </div>
                        <div className="flex flex-col items-center">
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer border border-gray-100 bg-gray-100/65 rounded-lg w-full p-10 mb-1 text-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-600 mt-1 text-center"
                            >
                                <div className="flex flex-col items-center">
                                    <i className="fa fa-image text-gray-700" style={{ fontSize: '40px' }}></i>
                                    {image ? 'Cambiar imagen' : 'Elegir archivo'}
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="md:w-1/2 md:pl-4">
                        <h1 className="text-3xl font-bold mb-6 text-center">Producto en venta</h1>
                        <div className="flex items-center mb-3">
                            <div className="relative mr-4">
                                <input
                                    type="text"
                                    maxLength={80}
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="border border-gray-300 rounded-lg w-80 p-1 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                    placeholder="Nombre del producto*"
                                    required
                                />
                                <span className="absolute right-3 top-2 text-gray-500 text-sm">
                                    {productName.length}/80
                                </span>
                            </div>

                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="border bg-gray-200/80 rounded-lg w-50 w-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                required
                            >
                                <option value="">Seleccionar estado*</option>
                                <option value="nuevo">Nuevo</option>
                                <option value="usado - como nuevo">Usado - Como nuevo</option>
                                <option value="usado - buen estado">Usado - Buen estado</option>
                                <option value="usado - aceptable">Usado - Aceptable</option>
                            </select>
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg w-full p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-600 bg-white">
                            <span className="text-gray-500 mr-2">Bs.</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 7) {
                                        setPrice(value);
                                    }
                                }}
                                className="flex-1 border-none focus:outline-none"
                                placeholder="Ingrese el Precio*"
                                required
                            />
                        </div>

                        <textarea
                            value={description}
                            maxLength={1000}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            placeholder="Descripción del producto*"
                            required
                        ></textarea>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            required
                        >
                            <option value="">Seleccionar categoría*</option>
                            <option value="1">Cemento</option>
                            <option value="2">Hormigón</option>
                            <option value="3">Madera</option>
                            <option value="4">Vidrio</option>
                        </select>

                        <input
                            type="text"
                            value={locationReference}
                            onChange={(e) => setLocationReference(e.target.value)}
                            placeholder="Número de celular*"
                            className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            required
                        />

                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            required
                        >
                            <option value="">Seleccionar departamento*</option>
                            <option value="La Paz">La Paz</option>
                            <option value="Cochabamba">Cochabamba</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Oruro">Oruro</option>
                            <option value="Potosí">Potosí</option>
                            <option value="Tarija">Tarija</option>
                            <option value="Beni">Beni</option>
                            <option value="Pando">Pando</option>
                        </select>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
                            >
                                Publicar Producto
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p>¿Estás seguro de que deseas publicar este producto?</p>
                        <div className="flex justify-around mt-4">
                            <button
                                onClick={confirmPublish}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Sí, publicar
                            </button>
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p>Producto publicado exitosamente.</p>
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadProduct;
