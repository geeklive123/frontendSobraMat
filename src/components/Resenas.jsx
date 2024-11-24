import React, { useState } from "react";

const Resenas = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    if (rating > 0 && comment.trim()) {
      setReviews([...reviews, { rating, comment }]);
      setRating(0);
      setComment("");
    } else {
      alert("Por favor, califica y escribe un comentario antes de enviar.");
    }
  };

  return (
    <div className="bg-yellow-200 p-6 rounded-md shadow-md max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {/* Calificación general */}
        <div className="bg-yellow-300 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Calificación:</h3>
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span key={index} className="text-yellow-500 text-xl">
                  ★
                </span>
              ))}
          </div>
          <p className="text-gray-600 mt-2">
            Sé el primero en calificar este producto.
          </p>
        </div>

        {/* Formulario de calificación */}
        <div className="bg-yellow-300 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Calificar:</h3>
          <div className="flex items-center gap-1 mb-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleRatingClick(index + 1)}
                  className={`text-xl cursor-pointer ${
                    index < rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            rows="3"
          />
          <button
            onClick={handleSubmitReview}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Enviar reseña
          </button>
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="bg-yellow-300 p-4 rounded-md mt-4">
        <h3 className="text-lg font-semibold mb-2">Reseñas:</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No hay reseñas aún.</p>
        ) : (
          <ul className="list-disc list-inside">
            {reviews.map((review, index) => (
              <li key={index} className="mb-2">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? "text-yellow-500" : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Resenas;
