import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-yellow-500 rounded-lg shadow-lg p-5 w-80">
                <h2 className="text-lg font-bold mb-4">Confirmar Eliminación</h2>
                <p>¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.</p>
                <div className="mt-4 flex justify-between">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>
                    <button
                        className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
