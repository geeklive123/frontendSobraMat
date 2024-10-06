import { useState } from 'react';

const UploadProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [department, setDepartment] = useState('');
    const [images, setImages] = useState([]);
    const [locationReference, setLocationReference] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = files.length + images.length;

        if (images.length >= 10) {
        alert('Ya has alcanzado el límite de 10 imágenes.');
            return;
        }

        if (totalImages > 10) {
            const remainingSlots = 10 - images.length;
            alert(`Puedes subir un máximo de 10 imágenes. Solo se tomarán las primeras ${remainingSlots} imágenes nuevas.`);
            const limitedFiles = files.slice(0, remainingSlots);
            const imageURLs = limitedFiles.map(file => URL.createObjectURL(file));
            setImages(prevImages => prevImages.concat(imageURLs));
        } else {
            const imageURLs = files.map(file => URL.createObjectURL(file));
            setImages(prevImages => prevImages.concat(imageURLs));
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmPublish = () => {

        setShowConfirmation(false);
        setShowSuccessMessage(true);
        console.log({
            productName,
            price,
            description,
            state,
            category,
            department,
            images,
            locationReference,
        });

        setProductName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setState('');
        setDepartment('');
        setImages([]);
        setLocationReference('');
    };

    const isFormValid = productName && price && description && state && category && department && images.length > 0 && locationReference;

    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center bg-yellow-400 p-16 rounded-lg shadow-lg max-w-7xl mx-auto mt-50 px-10">
                <div className="border border-gray-100 bg-gray-100/65 rounded-lg w-[600px] h-[600px] mx-auto p-5 mb-30 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Vista previa de imágenes</h2>
                    <div className="flex flex-wrap justify-center">
                        {images.map((image, index) => (
                            <div key={index} className="relative m-2">
                                <img src={image} alt={`Vista previa ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    type="button"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 text-center">
                        {images.length > 0 ? `${images.length} archivo(s) seleccionado(s)` : ' Puedes agregar un máximo de 10 fotos.'}
                    </div>

                    <div className="flex flex-col items-center">
                    <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={images.length >= 10}
                        />
                        <label
                            htmlFor="file-upload"
                            className={`cursor-pointer border border-gray-100 bg-gray-100/65 rounded-lg w-full p-10 mb-1 m-300 text-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-600 mt-1 text-center ${images.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {images.length >= 10 ? 'Límite de 10 imágenes alcanzado' : 'Elegir archivo'}
                        </label>
                    </div>
                </div>
                <div className="md:w-1/2 md:pl-4">
                    <h1 className="text-3xl font-bold mb-6 text-center">Artículo en venta</h1>
                    <input
                        type="text"
                        maxLength={40}
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="border border-gray-300 rounded-lg w-80 p-1 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        placeholder="Nombre del producto"
                        required
                    />
                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="border bg-gray-200/80 rounded-lg w-60 p-1 mb-5 focus:outline-none focus:ring-2 focus:ring-yellow-600 ml-5"
                        required
                    >
                        <option value="">Seleccionar estado</option>
                        <option value="nuevo">Nuevo</option>
                        <option value="usado">Usado - Como nuevo</option>
                        <option value="usado">Usado - Buen estado</option>
                        <option value="usado">Usado - Aceptable</option>
                    </select>
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
                            placeholder="Ingrese el Precio"
                            required
                        />
                    </div>
                    <textarea
                        value={description}
                        maxLength={2000}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        placeholder="Descripción del producto"
                        required
                    ></textarea>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        required
                    >
                        <option value="">Seleccionar categoría</option>
                        <option value="Cemento">Cemento</option>
                        <option value="Hormigón">Hormigón</option>
                        <option value="Ladrillos">Ladrillos</option>
                        <option value="Madera">Madera</option>
                        <option value="Acero">Acero</option>
                        <option value="Herramientas eléctricas">Herramientas eléctricas</option>
                        <option value="Herramientas manuales">Herramientas manuales</option>
                        <option value="Pinturas">Pinturas</option>
                        <option value="Azulejos">Azulejos</option>
                        <option value="Tuberías">Tuberías</option>
                        <option value="Tejas">Tejas</option>
                    </select>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        required
                    >
                        <option value="">Seleccionar departamento</option>
                        <option value="Cochabamba">Cochabamba</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="La Paz">La Paz</option>
                        <option value="Tarija">Tarija</option>
                        <option value="Potosí">Potosí</option>
                        <option value="Chuquisaca">Chuquisaca</option>
                        <option value="Beni">Beni</option>
                        <option value="Pando">Pando</option>
                        <option value="Oruro">Oruro</option>
                    </select>
                    <div className="flex items-center border border-gray-300 rounded-lg w-full p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-600 bg-white">
                        <span className="text-gray-500 mr-2">+591</span>
                        <input
                            type="tel"
                            value={locationReference}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^[67]\d{0,7}$/.test(value) || value === '') {
                                    setLocationReference(value);
                                }
                            }}
                            className="flex-1 border-none focus:outline-none"
                            placeholder="Número de celular"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`p-3 rounded-lg w-full transition-colors font-bold ${isFormValid ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                        disabled={!isFormValid}
                    >
                        PUBLICAR
                    </button>
                </div>
            </form>
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmar publicación</h2>
                        <p>¿Estás seguro de que quieres publicar este producto?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmPublish}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">¡Publicación exitosa!</h2>
                        <p>Tu producto ha sido publicado correctamente.</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowSuccessMessage(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadProduct;
