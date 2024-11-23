import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const CategoryFilter = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [departamentos, setDepartamentos] = useState([
        'Cochabamba', 'Santa Cruz', 'La Paz', 'Tarija', 'Potosí',
        'Chuquisaca', 'Beni', 'Pando', 'Oruro'
    ]); // Departamentos estáticos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [favoritos, setFavoritos] = useState([]);
    const [agregarCarrito, setagregarCarrito] = useState([]);


    const handleAddCart = (producto) => {
        setagregarCarrito(prev => {
            if (!prev.some(item => item.id === producto.id)) {
                const newCart = [...prev, producto]; // Agrega el producto a favoritos
                localStorage.setItem('agregarCarrito', JSON.stringify(newCart)); // Guardar en localStorage
                return newCart;
            }
            return prev; // Si ya está en favoritos, no lo agrega
        });
        
    };

    const isInCart = (productoId) => {
        return agregarCarrito.some(item => item.id === productoId); // Verifica si el producto está en favoritos
    };

    const [estados] = useState(['Nuevo', 'Usado - Como Nuevo', 'Usado - Buen Estado', 'Usado - Aceptable']);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
    const [precioMaximo, setPrecioMaximo] = useState(5000);
    const [precioMinimo, setPrecioMinimo] = useState(0);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState([]);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
    const [precioError, setPrecioError] = useState(false);

    // Llamada para obtener productos
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://sobramat-services.onrender.com/products/');
                if (!response.ok) throw new Error('Error fetching data');

                const data = await response.json();
                setProductos(data);
                setProductosFiltrados(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);


    useEffect(() => {
        // Cargar los favoritos desde localStorage cuando se monta el componente
        const storedFavoritos = localStorage.getItem('favoritos');
        if (storedFavoritos) {
            setFavoritos(JSON.parse(storedFavoritos));
        }
    }, []);
    // Llamada para obtener las categorías
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('https://sobramat-services.onrender.com/categories/');
                if (!response.ok) throw new Error('Error fetching categories');

                const data = await response.json();
                setCategorias(data); // Guardar las categorías en el estado
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCategorias();
    }, []);

    // Llamada para obtener el rango de precios
    useEffect(() => {
        const fetchPrecios = async () => {
            try {
                const response = await fetch('https://sobramat-services.onrender.com/products/price-range');
                if (!response.ok) throw new Error('Error fetching price range');

                const data = await response.json();
                setPrecioMinimo(data.min); // Suponiendo que la API retorna un objeto { min: 0, max: 5000 }
                setPrecioMaximo(data.max);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPrecios();
    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        let filteredProducts = productos;

        if (estadoSeleccionado.length > 0) {
            filteredProducts = filteredProducts.filter(product => estadoSeleccionado.includes(product.estado_producto));
        }
        if (categoriaSeleccionada.length > 0) {
            filteredProducts = filteredProducts.filter(product => categoriaSeleccionada.includes(product.categoria_id));
        }
        if (departamentoSeleccionado.length > 0) {
            filteredProducts = filteredProducts.filter(product => departamentoSeleccionado.includes(product.departamento));
        }
        if (precioMaximo) {
            filteredProducts = filteredProducts.filter(product => product.precio <= precioMaximo);
        }
        if (precioMinimo) {
            filteredProducts = filteredProducts.filter(product => product.precio >= precioMinimo);
        }

        setProductosFiltrados(filteredProducts);
    };

    const handleEstadoChange = (item) => {
        setEstadoSeleccionado(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleCategoriaChange = (item) => {
        setCategoriaSeleccionada(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleDepartamentoChange = (item) => {
        setDepartamentoSeleccionado(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleClearFilters = () => {
        setEstadoSeleccionado([]);
        setCategoriaSeleccionada([]);
        setDepartamentoSeleccionado([]);
        setPrecioMaximo(5000);
        setPrecioMinimo(0);
        setProductosFiltrados(productos); // Muestra todos los productos
        setPrecioError(false); // Restablecer el estado de error
    };

    const handlePrecioMinimoChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > precioMaximo) {
            setPrecioError(true);
        } else {
            setPrecioError(false);
        }
        setPrecioMinimo(value);
    };

    const handlePrecioMaximoChange = (e) => {
        const value = parseInt(e.target.value);
        if (value < precioMinimo) {
            setPrecioError(true);
        } else {
            setPrecioError(false);
        }
        setPrecioMaximo(value);
    };

    // Función para verificar si hay filtros activos
    const isAnyFilterActive = () => {
        return (
            estadoSeleccionado.length > 0 ||
            categoriaSeleccionada.length > 0 ||
            departamentoSeleccionado.length > 0 ||
            precioMinimo > 0 ||
            precioMaximo < 5000
        );
    };


    const handleAddToFavorites = (producto) => {
        setFavoritos(prev => {
            if (!prev.some(item => item.id === producto.id)) {
                const newFavoritos = [...prev, producto]; // Agrega el producto a favoritos
                localStorage.setItem('favoritos', JSON.stringify(newFavoritos)); // Guardar en localStorage
                return newFavoritos;
            }
            return prev; // Si ya está en favoritos, no lo agrega
        });
        
    };

    const isInFavorites = (productoId) => {
        return favoritos.some(item => item.id === productoId); // Verifica si el producto está en favoritos
    };
    return (
        <div className="flex flex-col md:flex-row h-screen relative">
            {/* Panel de filtros */}
            <div
                className={`transition-all duration-300 ease-in-out w-full md:w-1/4 p-4 bg-[#F2A649] ${isFilterPanelOpen ? 'block' : 'hidden'}`}
                style={{ overflowY: 'auto', maxHeight: '100vh' }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">FILTRO</h2>
                    <button
                        className="text-black focus:outline-none"
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                    >
                        {isFilterPanelOpen ? (
                            <i className="fa fa-chevron-left"></i>
                        ) : (
                            <span className="text-black">Mostrar filtros</span>
                        )}
                    </button>
                </div>

                {isFilterPanelOpen && (
                    <form onSubmit={handleFilterSubmit}>
                        {/* Filtros del formulario */}
                        <div className="mb-4 border-b border-black pb-4">
                            <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR ESTADO*</h3>
                            <div className="flex flex-col">
                                {estados.map((item) => (
                                    <label
                                        key={item}
                                        className={`flex items-center mb-2 p-2 rounded ${estadoSeleccionado.includes(item) ? 'bg-gray-300' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={estadoSeleccionado.includes(item)}
                                            onChange={() => handleEstadoChange(item)}
                                            className="mr-2"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4 border-b border-black pb-4">
                            <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR CATEGORÍA*</h3>
                            <div className="flex flex-col">
                                {categorias.map((cat) => (
                                    <label
                                        key={cat.id}
                                        className={`flex items-center mb-2 p-2 rounded ${categoriaSeleccionada.includes(cat.id) ? 'bg-gray-300' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={categoriaSeleccionada.includes(cat.id)}
                                            onChange={() => handleCategoriaChange(cat.id)}
                                            className="mr-2"
                                        />
                                        {cat.nombre}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4 border-b border-black pb-4">
                            <label className="block mb-2 uppercase bg-gray-800 text-white p-2">RANGO DE PRECIO</label>
                            <div className="flex flex-col">
                                <label className="flex items-center">
                                    <span className="mr-2">Precio Mínimo:</span>
                                    <input
                                        type="number"
                                        value={precioMinimo}
                                        onChange={handlePrecioMinimoChange}
                                        className={`border border-gray-300 p-1 rounded ${precioError ? 'border-red-500' : ''}`}
                                        min="0"
                                    />
                                </label>
                                <label className="flex items-center mt-2">
                                    <span className="mr-2">Precio Máximo:</span>
                                    <input
                                        type="number"
                                        value={precioMaximo}
                                        onChange={handlePrecioMaximoChange}
                                        className={`border border-gray-300 p-1 rounded ${precioError ? 'border-red-500' : ''}`}
                                        min="0"
                                    />
                                </label>
                                {precioError && (
                                    <p className="text-red-500 text-sm mt-2">
                                        El precio mínimo no puede ser mayor que el máximo.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4 pb-4">
                            <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR DEPARTAMENTO*</h3>
                            <div className="flex flex-col">
                                {departamentos.map((item) => (
                                    <label
                                        key={item}
                                        className={`flex items-center mb-2 p-2 rounded ${departamentoSeleccionado.includes(item) ? 'bg-gray-300' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={departamentoSeleccionado.includes(item)}
                                            onChange={() => handleDepartamentoChange(item)}
                                            className="mr-2"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded">Aplicar filtros</button>
                    </form>
                )}

                {/* Botón para limpiar los filtros */}
                <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded"
                >
                    Limpiar filtros
                </button>
            </div>

            {/* Botón para mostrar el panel de filtros si está oculto */}
            {!isFilterPanelOpen && (
                <button
                    className="fixed top-5 left-5 bg-[#F2A649] text-white py-2 px-4 rounded-full shadow-lg z-50"
                    onClick={() => setIsFilterPanelOpen(true)}
                >
                    Mostrar filtros
                </button>
            )}

            {/* Mostrar los productos filtrados */}
            <div className="flex-grow p-4" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                <h2 className="font-bold text-xl">
                    {isAnyFilterActive() ? 'FILTRADOS RECIENTES' : 'TIENDA'}
                </h2>
                <div className="border border-gray-300 bg-[#F2EAC2] p-4 mt-4 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map((producto) => (
                                <div key={producto.id} className="border border-gray-300 bg-white p-2 rounded flex flex-col items-center">
                                    <div className="w-full h-0 pb-[100%] relative">
                                        <img
                                            src={producto.imagen_url}
                                            alt={producto.nombre_producto}
                                            className="absolute top-0 left-0 w-full h-full rounded"
                                        />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p>Nombre: {producto.nombre_producto}</p>
                                        <p>Precio: ${producto.precio}</p>
                                        <p>Estado: {producto.estado_producto}</p>
                                        <p>Departamento: {producto.departamento}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToFavorites(producto)}
                                        className={`mt-2 py-1 px-4 rounded ${isInFavorites(producto.id) ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                                    >
                                        {isInFavorites(producto.id) ? 'Guardado en favoritos' : 'Agregar a favoritos'}
                                    </button>
                                    <button
    onClick={() => handleAddCart(producto)}
    className="mt-2 bg-yellow-500 text-white py-1 px-4 rounded"
>
    Agregar a Carrito
</button>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron productos.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
