import { Route, Routes, useLocation } from 'react-router-dom'; // Importación correcta
import './App.css';
import Home from '../views/home'; // Asegúrate de que el nombre coincida con el archivo
import UploadProduct from './components/uploadProduct'; // Asegúrate de que el nombre coincide con el archivo

const App = () => {
  const location = useLocation();
  console.log(location.pathname); // Mostrar la ruta actual

  return (
    <div className="App"> {/* Mover la clase App aquí para envolver todo */}
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Ruta para la subida de productos */}
        <Route path="/upload" element={<UploadProduct />} />
      </Routes>
    </div>
  );
}

export default App;
