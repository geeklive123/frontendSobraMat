
import React, { useEffect , useState}from 'react';
import CardMaterial from './cardMaterial';
import { useNavigate } from 'react-router-dom';


const RecuperarContrasena = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();
  const [myUser, setMyUser] = useState(null);
  const [emailRecuperacion, setEmailRecuperacion] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setMyUser(user);
      console.log(myUser)
    }
  }, [myUser]);

  const handleEnviar = (e) => {
    e.preventDefault();
    setModalVisible(true); // Muestra el modal
  };
  const handleRestablecerContrasena = () => {
    localStorage.setItem('emailRecuperacion',emailRecuperacion);
    
    navigate('/RestablecerContrasena');
  };
  const handleCerrarModal = () => {
    setModalVisible(false); // Cierra el modal
  };

  return (
    <div className="bg-gray-800 text-black min-h-screen flex items-center justify-center">
      {/* Contenedor principal */}
      <div className="w-full max-w-sm bg-orange-400 p-6 rounded-lg shadow-md space-y-4">
        {/* Título */}
        <h2 className="text-xl font-bold text-center">Recuperar contraseña</h2>
        <p className="text-sm text-center text-white">
          Ingresa tu correo electrónico para verificar su correo y pueda cambiar la contraseña
        </p>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleEnviar}>
          {/* Campo de correo */}
          <div>
            <label htmlFor="email" className="sr-only">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                📧
              </span>
              <input
                value={emailRecuperacion}
                type="email"
                id="email"
                placeholder="Ingrese tu correo electrónico"
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                required
                onChange={(e) => setEmailRecuperacion(e.target.value)}
              />
            </div>
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 flex items-center justify-center"
          >
            <span className="mr-2">📨</span> Enviar instrucciones
          </button>

          {/* Botón de cancelar */}
          <button
            type="button"
            onClick={() => console.log("Cancelar")}
            className="w-full py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
          >
            Cancelar
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
            <p className="text-black text-sm">
            Se ha verificado su correo 
            </p>
            <button
              onClick={handleRestablecerContrasena}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
             Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecuperarContrasena;