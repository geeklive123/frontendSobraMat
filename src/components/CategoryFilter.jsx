import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const CategoryFilter = () => {
    const [productos, setProductos] = useState([]); // Todos los productos
    const [productosFiltrados, setProductosFiltrados] = useState([]); // Productos después del filtro
    const [estado, setEstado] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState(5000); // Valor inicial
    const [departamento, setDepartamento] = useState('');

    useEffect(() => {
        // Cargar todos los productos desde el backend
        const fetchProductos = async () => {
            const response = await fetch('http://localhost:5000/products/all');
            const data = await response.json();
            setProductos(data);
            setProductosFiltrados(data); // Inicialmente, los productos filtrados son todos
        };

        fetchProductos();
    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();

        let filteredProducts = productos;

        if (estado) {
            filteredProducts = filteredProducts.filter(product => product.estado === estado);
        }

        if (categoria) {
            filteredProducts = filteredProducts.filter(product => product.categoria === categoria);
        }

        if (departamento) {
            filteredProducts = filteredProducts.filter(product => product.departamento === departamento);
        }

        if (precio) {
            filteredProducts = filteredProducts.filter(product => product.precio <= precio);
        }

        setProductosFiltrados(filteredProducts); // Actualiza los productos filtrados
    };

    const incrementarPrecio = () => {
        if (precio < 10000) {
            setPrecio(precio + 100);
        }
    };

    const decrementarPrecio = () => {
        if (precio > 100) {
            setPrecio(precio - 100);
        }
    };

    const handleEstadoChange = (item) => {
        setEstado(estado === item ? '' : item);
    };

    const handleCategoriaChange = (item) => {
        setCategoria(categoria === item ? '' : item);
    };

    const handleDepartamentoChange = (item) => {
        setDepartamento(departamento === item ? '' : item);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Sección de Filtros */}
            <div className="w-full md:w-1/4 p-4 bg-[#F2A649]" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                <h2 className="font-bold text-lg mb-4">FILTRAR</h2>
                <form onSubmit={handleFilterSubmit}>
                    {/* Estado */}
                    <div className="mb-4 border-b border-black pb-4">
                        <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR ESTADO*</h3>
                        <div className="flex flex-col">
                            {['nuevo', 'usado - como nuevo', 'usado - buen estado'].map((item) => (
                                <label
                                    key={item}
                                    className={`flex items-center mb-2 p-2 rounded ${estado === item ? 'bg-gray-300' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={estado === item}
                                        onChange={() => handleEstadoChange(item)}
                                        className="mr-2"
                                    />
                                    {item.toLowerCase()}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Categoría */}
                    <div className="mb-4 border-b border-black pb-4">
                        <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR CATEGORÍA*</h3>
                        <div className="flex flex-col">
                            {['cemento', 'hormigón', 'ladrillos', 'madera', 'acero', 'herramientas eléctricas', 'herramientas manuales', 'pinturas', 'azulejos', 'tuberías', 'tejas', 'otros'].map((item) => (
                                <label
                                    key={item}
                                    className={`flex items-center mb-2 p-2 rounded ${categoria === item ? 'bg-gray-300' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={categoria === item}
                                        onChange={() => handleCategoriaChange(item)}
                                        className="mr-2"
                                    />
                                    {item.toLowerCase()}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rango de Precio */}
                    <div className="mb-4 border-b border-black pb-4">
                        <label className="block mb-2 uppercase bg-gray-800 text-white p-2">RANGO DE PRECIO</label>
                        <div className="flex items-center">
                            <button type="button" onClick={decrementarPrecio} className="bg-gray-300 border border-gray-400 p-2 rounded-l">-</button>
                            <input type="number" value={precio} readOnly className="w-20 mx-2 text-center border border-gray-300 p-2" />
                            <button type="button" onClick={incrementarPrecio} className="bg-gray-300 border border-black p-2 rounded-r">+</button>
                        </div>
                        <input
                            type="range"
                            min="100"
                            max="10000"
                            value={precio}
                            step="100"
                            onChange={(e) => setPrecio(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer my-2"
                        />
                        <div className="flex justify-between">
                            <span>100</span>
                            <span>{precio}</span>
                            <span>10,000</span>
                        </div>
                    </div>

                    {/* Departamento */}
                    <div className="mb-4 pb-4">
                        <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR DEPARTAMENTO*</h3>
                        <div className="flex flex-col">
                            {['cochabamba', 'santa cruz', 'la paz', 'tarija', 'potosí', 'chuquisaca', 'beni', 'pando', 'oruro'].map((item) => (
                                <label
                                    key={item}
                                    className={`flex items-center mb-2 p-2 rounded ${departamento === item ? 'bg-gray-300' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={departamento === item}
                                        onChange={() => handleDepartamentoChange(item)}
                                        className="mr-2"
                                    />
                                    {item.toLowerCase()}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Aplicar filtros</button>
                </form>
            </div>

            {/* Sección de Productos Filtrados */}
            <div className="flex-grow p-4" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                <h2 className="font-bold text-xl">PRODUCTOS FILTRADOS</h2>
                <div className="border border-gray-300 bg-[#F2EAC2] p-4 mt-4 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map((producto) => (
                                <div key={producto.id} className="border border-gray-300 bg-white p-2 rounded flex flex-col items-center">
                                    <div className="w-full h-0 pb-[100%] relative">
                                        <img
                                            src={producto.imagen_url} // Cambia esta propiedad según tu modelo
                                            alt={producto.nombre_producto} // Cambia esta propiedad según tu modelo
                                            className="absolute top-0 left-0 w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p>{producto.nombre_producto}</p> // Cambia esta propiedad según tu modelo
                                        <p>Precio: ${producto.precio}</p> // Cambia esta propiedad según tu modelo
                                        <p>Estado: {producto.estado}</p> // Cambia esta propiedad según tu modelo
                                        <p>Departamento: {producto.departamento}</p> // Cambia esta propiedad según tu modelo
                                    </div>
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
