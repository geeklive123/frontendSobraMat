import { useState } from 'react';
<<<<<<< Updated upstream
import axios from 'axios';
=======
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
>>>>>>> Stashed changes
import 'font-awesome/css/font-awesome.min.css';


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
    const [showForm, setShowForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (e) => {
<<<<<<< Updated upstream
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
=======
        const file = e.target.files[0];
        if (file) {
            const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];
            if (validFormats.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                    setErrorMessage(''); // Resetear mensaje de error si la imagen es válida
                };
                reader.readAsDataURL(file);
            } else {
                setErrorMessage('Formato de imagen no permitido. Por favor sube una imagen válida.');
            }
        }
    };

    const validateForm = () => {
        const missingFields = [];
        if (!productName) missingFields.push('Nombre del producto');
        if (!price) missingFields.push('Precio');
        if (!description) missingFields.push('Descripción');
        if (!state) missingFields.push('Estado');
        if (!category) missingFields.push('Categoría');
        if (!department) missingFields.push('Departamento');
        if (!image) missingFields.push('Imagen');
        if (!/^[67]\d{7}$/.test(locationReference)) {
            missingFields.push('Número de celular (debe tener 8 dígitos y empezar con 6 o 7)');
        }
        return missingFields;
>>>>>>> Stashed changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const missingFields = validateForm();
        
        if (missingFields.length > 0) {
            setErrorMessage(`Por favor, completa los siguientes campos: ${missingFields.join(', ')}`);
            return;
        }

        setShowConfirmation(true);
        setErrorMessage(''); // Resetear mensaje de error
    };

    const confirmPublish = () => {
<<<<<<< Updated upstream
        const productData = {
            productName,
            price,
            description,
            category,
            state,
            department,
            locationReference,
            images
        };
        axios.post('http://localhost:5173/upload', productData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setShowSuccessMessage(true);
                } else {
                    alert(response.data.message || 'Error al publicar el producto.');
                }
            })
            .catch(error => {
                console.error('Error al subir el producto:', error);
                alert('Ocurrió un error al publicar el producto. Inténtalo de nuevo más tarde.');
=======
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
>>>>>>> Stashed changes

            });
        setShowConfirmation(false);
        setProductName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setState('');
        setDepartment('');
        setImages([]);
        setLocationReference('');

        resetForm();
    };
    const resetForm = () => {
        setShowConfirmation(false);
        setProductName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setState('');
        setDepartment('');
        setImages([]);
        setLocationReference('');
    };

<<<<<<< Updated upstream
    const isFormValid = productName && price && description && state && category && department && images.length > 0 && images.length <= 10 && /^[67]\d{7}$/.test(locationReference);

=======
>>>>>>> Stashed changes
    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
                {showForm && (
                    <form onSubmit={handleSubmit} className= "relative flex flex-col md:flex-row justify-center items-center bg-yellow-400 p-16 rounded-lg shadow-lg max-w-7xl mx-auto mt-50 px-10">
                    <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 bg-transparent text-gray-900 hover:text-gray-700 text-2xl font-bold focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>

                    <div className="border border-gray-100 bg-gray-100/65 rounded-lg w-[600px] h-[600px] mx-auto p-5 mb-30 flex flex-col items-center">
<<<<<<< Updated upstream
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
=======
                        <h2 className="text-2xl font-bold mb-4">Vista previa de imagen</h2>
                        <div className="flex flex-wrap justify-center">
                            {image && (
                                <div className="relative m-2">
                                    <img src={image} alt="Vista previa" className="w-full h-auto object-cover rounded-lg" />
                                    <button
                                        onClick={() => setImage(null)} 
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
                        {errorMessage && (
                            <div className="text-red-500 mb-4">{errorMessage}</div>
                        )}
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
>>>>>>> Stashed changes
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
                            <div className="flex flex-col items-center ">
                                <i className={`fa fa-image text-2xl ${images.length >= 10 ? 'text-red-500' : 'text-gray-700'}`} style={{ fontSize: '40px' }}></i>
                                {images.length >= 10 ? 'Límite de 10 imágenes alcanzado' : 'Elegir archivo'}
                            </div>
                        </label>


<<<<<<< Updated upstream
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
=======
                        <div className="flex items-center border border-gray-300 rounded-lg w-full p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-600 bg-white">
    <span className="text-gray-500 mr-2">Bs.</span>
    <input
        type="text"
        value={price}
        onChange={(e) => {
            const value = e.target.value;
            
            if (/^\d*\.?\d*$/.test(value) && value.length <= 7) {
                setPrice(value);
            }
        }}
        className="flex-1 border-none focus:outline-none"
        placeholder="Ingrese el Precio*"
        required
    />
</div>
>>>>>>> Stashed changes

                        <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="border bg-gray-200/80 rounded-lg w-50 w-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            required
                        >
<<<<<<< Updated upstream
                            <option value="">Seleccionar estado*</option>
                            <option value="nuevo">Nuevo</option>
                            <option value="usado">Usado - Como nuevo</option>
                            <option value="usado">Usado - Buen estado</option>
                            <option value="usado">Usado - Aceptable</option>
=======
                            <option value="">Seleccionar categoría*</option>
                            <option value="1">Electronica</option>
                            <option value="2">Muebles</option>
                            <option value="3">Ropa</option>
                       
>>>>>>> Stashed changes
                        </select>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg w-full p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-600 bg-white">
                        <span className="text-gray-500 mr-2">Bs.</span>
                        <input
<<<<<<< Updated upstream
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
=======
                            type="text"
                            value={locationReference}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) || value === '') {
                                    setLocationReference(value);
                                }
                            }}
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
                            <option value="Sucre">Sucre</option>
                        </select>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`w-full bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600`}
                            >
                                Publicar Producto
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate('/listMaterial')} // Llama a navigate al hacer clic
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
                        >
                            Atrás
                        </button>
>>>>>>> Stashed changes
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
                        <option value="">Seleccionar departamento*</option>
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
                            placeholder="Número de celular*"
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
        )}
        {showConfirmation && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Confirmar publicación</h2>
                        <p>¿Está seguro de que desea publicar el producto?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={resetForm}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmPublish}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

{showSuccessMessage && (
<<<<<<< Updated upstream
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
=======
                <div className="fixed inset-0 flex items-center justify-center z-50">
>>>>>>> Stashed changes
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">¡Éxito!</h2>
                        <p>El producto ha sido publicado con éxito.</p>
                        <button
                            onClick={() => {
                                setShowSuccessMessage(false);
                                setShowForm(true);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                        >
                            Aceptar
                        </button>
                       
                    </div>
                </div>
            )}
<<<<<<< Updated upstream
    </div>
);
=======

        </div>
    );
>>>>>>> Stashed changes
};

export default UploadProduct;
