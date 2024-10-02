import { useState } from 'react';

const UploadProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [department, setDepartment] = useState('');
    const [images, setImages] = useState([]);
    const [locationReference, setLocationReference] = useState('');

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageURLs = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => prevImages.concat(imageURLs));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            productName,
            price,
            description,
            category,
            department,
            images,
            locationReference,
        });
        // Restablecer el formulario
        setProductName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setDepartment('');
        setImages([]);
        setLocationReference('');
    };

    const isFormValid = productName && price && description && category && department && images.length > 0 && locationReference;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center bg-yellow-500 p-20 rounded-lg shadow-lg max-w-3xl mx-auto">
            {/* Vista previa de las imágenes */}
            <div className="flex flex-col items-center md:w-1/2 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-4">Vista previa de imágenes</h2>
                <div className="flex flex-wrap">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Vista previa ${index + 1}`} className="w-24 h-24 object-cover rounded-lg m-2" />
                    ))}
                </div>
                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-600 mt-4"
                />
            </div>

            {/* Campos del formulario */}
            <div className="md:w-1/2 md:pl-4">
                <h1 className="text-3xl font-bold mb-6 text-center"> Nombre del producto</h1>

                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    placeholder="Nombre del producto"
                    required
                />

                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    placeholder="Precio"
                    required
                />

                <textarea
                    value={description}
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
                            {/* Agrega más opciones según sea necesario */}

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
                    <option value="La Paz">La Paz</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Beni">Beni</option>
                    <option value="Pando">Pando</option>
                    {/* Agrega más opciones según sea necesario */}


                </select>

                <input
                    type="text"
                    value={locationReference}
                    onChange={(e) => setLocationReference(e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    placeholder="Referencia de ubicación"
                    required
                />

                <button
                    type="submit"
                    className={`p-3 rounded-lg w-full transition-colors font-bold ${isFormValid ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                    disabled={!isFormValid} // Deshabilitar si el formulario no es válido
                >
                    PUBLICAR PRODUCTO
                </button>
            </div>
        </form>
    );
};

export default UploadProduct;
