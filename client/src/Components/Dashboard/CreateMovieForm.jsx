import { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import PropTypes from "prop-types";

const formatOptions = ["2D", "3D", "IMAX", "4D"];

const CreateMovieForm = ({ accessToken, onCreated }) => {
  const [formMovie, setFormMovie] = useState({
    title: "",
    year: "",
    genre: "",
    language: "",
    duration: "",
    imageUrl: "",
    trailerUrl: "",
    description: "",
    classification: "",
    format: [],
    releaseDate: "",
    isUpcoming: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cinebay");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxquk9fwx/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error al subir la imagen.");
      return null;
    }
  };

  const handleSubmit = async () => {
    const {
      title,
      year,
      genre,
      language,
      duration,
      imageUrl,
      trailerUrl,
      description,
      classification,
      format,
      releaseDate,
    } = formMovie;

    if (
      !title ||
      !year ||
      !genre ||
      !language ||
      !duration ||
      !imageUrl ||
      !trailerUrl ||
      !description ||
      !classification ||
      !format.length ||
      !releaseDate
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(Number(year))) {
      alert("El año debe ser un número válido.");
      return;
    }

    if (isNaN(Number(duration))) {
      alert("La duración debe ser un número válido.");
      return;
    }

    const payload = {
      ...formMovie,
      year: Number(year),
      duration: Number(duration),
      releaseDate: new Date(releaseDate).toISOString(),
    };

    setIsSubmitting(true);
    try {
      await fetchData("/movies", "POST", payload, accessToken);
      alert("Película creada exitosamente.");
      setFormMovie({
        title: "",
        year: "",
        genre: "",
        language: "",
        duration: "",
        imageUrl: "",
        trailerUrl: "",
        description: "",
        classification: "",
        format: [],
        releaseDate: "",
        isUpcoming: false,
      });
      onCreated?.();
    } catch (error) {
      console.error("Error creating movie:", error);
      alert(
        "Error al crear la película. Verifica los datos e intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        🎬 Crear Nueva Película
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            placeholder="Título de la película"
            className="border p-2 rounded w-full"
            value={formMovie.title}
            onChange={(e) =>
              setFormMovie({ ...formMovie, title: e.target.value })
            }
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Año
          </label>
          <input
            type="number"
            placeholder="Año de lanzamiento"
            className="border p-2 rounded w-full"
            value={formMovie.year}
            onChange={(e) =>
              setFormMovie({ ...formMovie, year: e.target.value })
            }
            min="1900"
            max="2100"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración (minutos)
          </label>
          <input
            type="number"
            placeholder="Duración en minutos"
            className="border p-2 rounded w-full"
            value={formMovie.duration}
            onChange={(e) =>
              setFormMovie({ ...formMovie, duration: e.target.value })
            }
            min="1"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Género
          </label>
          <input
            type="text"
            placeholder="Ej: Acción, Comedia, Drama"
            className="border p-2 rounded w-full"
            value={formMovie.genre}
            onChange={(e) =>
              setFormMovie({ ...formMovie, genre: e.target.value })
            }
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idioma
          </label>
          <input
            type="text"
            placeholder="Idioma principal"
            className="border p-2 rounded w-full"
            value={formMovie.language}
            onChange={(e) =>
              setFormMovie({ ...formMovie, language: e.target.value })
            }
          />
        </div>

        {/* Classification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clasificación
          </label>
          <input
            type="text"
            placeholder="Ej: PG-13, R, ATP"
            className="border p-2 rounded w-full"
            value={formMovie.classification}
            onChange={(e) =>
              setFormMovie({ ...formMovie, classification: e.target.value })
            }
          />
        </div>

        {/* Release Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Estreno
          </label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={formMovie.releaseDate}
            onChange={(e) =>
              setFormMovie({ ...formMovie, releaseDate: e.target.value })
            }
          />
        </div>

        {/* Is Upcoming */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isUpcoming"
            checked={formMovie.isUpcoming}
            onChange={(e) =>
              setFormMovie({ ...formMovie, isUpcoming: e.target.checked })
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isUpcoming"
            className="ml-2 block text-sm text-gray-700"
          >
            ¿Es una película próxima a estrenarse?
          </label>
        </div>

        {/* Format */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Formatos Disponibles
          </label>
          <select
            multiple
            className="border p-2 rounded w-full h-32"
            value={formMovie.format}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setFormMovie({ ...formMovie, format: selected });
            }}
          >
            {formatOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Mantén presionado Ctrl para seleccionar múltiples formatos
          </p>
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Poster de la Película
          </label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded w-full"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = await uploadImageToCloudinary(file);
                if (url) {
                  setFormMovie({ ...formMovie, imageUrl: url });
                }
              }
            }}
          />
          {formMovie.imageUrl && (
            <div className="mt-2">
              <img
                src={formMovie.imageUrl}
                alt="Vista previa del poster"
                className="w-40 h-auto rounded shadow"
              />
            </div>
          )}
        </div>

        {/* Trailer URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL del Tráiler
          </label>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className="border p-2 rounded w-full"
            value={formMovie.trailerUrl}
            onChange={(e) =>
              setFormMovie({ ...formMovie, trailerUrl: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            placeholder="Sinopsis de la película"
            className="border p-2 rounded w-full h-32"
            value={formMovie.description}
            onChange={(e) =>
              setFormMovie({ ...formMovie, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
        >
          {isSubmitting ? "Creando..." : "Crear Película"}
        </button>
      </div>
    </div>
  );
};

CreateMovieForm.propTypes = {
  accessToken: PropTypes.string.isRequired,
  onCreated: PropTypes.func,
};

export default CreateMovieForm;
