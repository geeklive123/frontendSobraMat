import { Route, Routes } from 'react-router-dom';
import Home from '../views/home';
import UploadProduct from './components/uploadProduct';
import DetailsProduct from './components/DetailsProduct';
import EditProduct from './components/EditProduct';
import ListMaterial from './components/listMaterial'; // Asegúrate de importar este componente
import InicioSesion from './components/iniciarSesion';
import Register from './components/register';
import CategoryFilter from './components/CategoryFilter'
const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<InicioSesion />} />
        <Route path="/upload" element={<UploadProduct />} />
        <Route path="/details/:id" element={<DetailsProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/listMaterial" element={<ListMaterial />} /> 
        <Route path="/iniciarSesion" element={<InicioSesion />} /> 
        <Route path="/registro" element={<Register />} /> 
        <Route path="/filtro" element={<CategoryFilter/>} /> 
        CategoryFilter
      </Routes>
    </div>
  );
};

export default App;
