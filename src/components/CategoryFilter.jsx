import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const CategoryFilter = () => {
    const [productos, setProductos] = useState([]); 
    const [productosFiltrados, setProductosFiltrados] = useState([]); 
    const [categorias] = useState([  
        { id: 'herramientas', nombre: 'Herramientas' },
        { id: 'materiales', nombre: 'Materiales de construcción' },
        { id: 'equipos', nombre: 'Equipos eléctricos' }
    ]);
    const [estados] = useState(['Nuevo', 'usado - como nuevo', 'usado - buen estado','usado - aceptable']); 
    const [estado, setEstado] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precioMaximo, setPrecioMaximo] = useState(5000); 
    const [precioMinimo, setPrecioMinimo] = useState(0); 
    const [departamento, setDepartamento] = useState('');

    useEffect(() => {
    
        const fetchProductos = async () => {
            const response = await fetch('https://sobramat-services.onrender.com/products/all');
            const data = await response.json();
            setProductos(data);
            setProductosFiltrados(data); 
            console.log(data);
        };

        fetchProductos();
    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();

        let filteredProducts = productos;

        if (estado) {
            filteredProducts = filteredProducts.filter(product => product.estado_producto === estado);
        }

        if (categoria) {
            filteredProducts = filteredProducts.filter(product => product.categoria_id === categoria);
        }

        if (departamento) {
            filteredProducts = filteredProducts.filter(product => product.departamento === departamento);
        }

      
        if (precioMaximo) {
            filteredProducts = filteredProducts.filter(product => product.precio <= precioMaximo);
        }

        if (precioMinimo) {
            filteredProducts = filteredProducts.filter(product => product.precio >= precioMinimo);
        }

        setProductosFiltrados(filteredProducts); 
        console.log(filteredProducts);
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
        
            <div className="w-full md:w-1/4 p-4 bg-[#F2A649]" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                <h2 className="font-bold text-lg mb-4">FILTRAR</h2>
                <form onSubmit={handleFilterSubmit}>
                 
                    <div className="mb-4 border-b border-black pb-4">
                        <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR ESTADO*</h3>
                        <div className="flex flex-col">
                            {estados.map((item) => (
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

                 
                    <div className="mb-4 border-b border-black pb-4">
                        <h3 className="block mb-2 uppercase bg-gray-800 text-white p-2">SELECCIONAR CATEGORÍA*</h3>
                        <div className="flex flex-col">
                            {categorias.map((cat) => (
                                <label
                                    key={cat.id}
                                    className={`flex items-center mb-2 p-2 rounded ${categoria === cat.id ? 'bg-gray-300' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={categoria === cat.id}
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
                                    onChange={(e) => setPrecioMinimo(parseInt(e.target.value))}
                                    className="border border-gray-300 p-1 rounded"
                                    min="0"
                                />
                            </label>
                            <label className="flex items-center mt-2">
                                <span className="mr-2">Precio Máximo:</span>
                                <input
                                    type="number"
                                    value={precioMaximo}
                                    onChange={(e) => setPrecioMaximo(parseInt(e.target.value))}
                                    className="border border-gray-300 p-1 rounded"
                                    min="0"
                                />
                            </label>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={precioMaximo}
                            step="100"
                            onChange={(e) => setPrecioMaximo(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer my-2"
                        />
                        <div className="flex justify-between">
                            <span>{precioMinimo}</span>
                            <span>{precioMaximo}</span>
                            <span>10,000</span>
                        </div>
                    </div>

                
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

            <div className="flex-grow p-4" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                <h2 className="font-bold text-xl">PRODUCTOS FILTRADOS</h2>
                <div className="border border-gray-300 bg-[#F2EAC2] p-4 mt-4 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map((producto) => (
                                <div key={producto.id} className="border border-gray-300 bg-white p-2 rounded flex flex-col items-center">
                                    <div className="w-full h-0 pb-[100%] relative">
                                        <img
                                            src={producto.imagen_url}
                                            alt={producto.nombre_producto}
                                            className="absolute top-0 left-0 w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p>Nombre: {producto.nombre_producto}</p> 
                                        <p>Precio: ${producto.precio}</p>
                                        <p>Estado: {producto.estado_producto}</p>
                                        <p>Departamento: {producto.departamento}</p> 
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
