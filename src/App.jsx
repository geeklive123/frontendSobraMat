import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from '../views/home';
import UploadProduct from './components/uploadProduct';

const App = () => {
  const location = useLocation();
  console.log(location.pathname);
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
