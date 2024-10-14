import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from '../views/home';
import UploadProduct from './components/uploadProduct';

const App = () => {
  const location = useLocation();
  console.log(location.pathname);

  const product = {
    productName: 'Producto Ejemplo',
    price: '500',
    description: 'Este es un producto de ejemplo.',
    state: 'Nuevo',
    category: 'Cemento',
    department: 'Cochabamba',
    images: ['https://via.placeholder.com/150'], 
    locationReference: '+59112345678',
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadProduct />} />
      </Routes>
    </div>
  );
}

export default App;
