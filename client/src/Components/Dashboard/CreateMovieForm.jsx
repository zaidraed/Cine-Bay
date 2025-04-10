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
  });
  CreateMovieForm.propTypes = {
    accessToken: PropTypes.string.isRequired,
    onCreated: PropTypes.func,
  };
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

    if (isNaN(Number(year)) || isNaN(Number(duration))) {
      alert("Año y duración deben ser números.");
      return;
    }

    const payload = {
      ...formMovie,
      year: Number(year),
      duration: Number(duration),
      releaseDate: new Date(releaseDate).toISOString(),
    };

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
      });
      onCreated && onCreated(); // recargar desde el dashboard
    } catch {
      alert("Error al crear la película.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🎬 Crear Película</h2>

      <input
        type="text"
        placeholder="Título"
        className="border p-2 rounded w-full"
        value={formMovie.title}
        onChange={(e) => setFormMovie({ ...formMovie, title: e.target.value })}
      />

      <input
        type="number"
        placeholder="Año"
        className="border p-2 rounded w-full"
        value={formMovie.year}
        onChange={(e) => setFormMovie({ ...formMovie, year: e.target.value })}
      />

      <input
        type="text"
        placeholder="Género"
        className="border p-2 rounded w-full"
        value={formMovie.genre}
        onChange={(e) => setFormMovie({ ...formMovie, genre: e.target.value })}
      />

      <input
        type="text"
        placeholder="Idioma"
        className="border p-2 rounded w-full"
        value={formMovie.language}
        onChange={(e) =>
          setFormMovie({ ...formMovie, language: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Duración (min)"
        className="border p-2 rounded w-full"
        value={formMovie.duration}
        onChange={(e) =>
          setFormMovie({ ...formMovie, duration: e.target.value })
        }
      />

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
        <img
          src={formMovie.imageUrl}
          alt="preview"
          className="w-40 h-auto rounded shadow"
        />
      )}

      <input
        type="text"
        placeholder="URL del Trailer"
        className="border p-2 rounded w-full"
        value={formMovie.trailerUrl}
        onChange={(e) =>
          setFormMovie({ ...formMovie, trailerUrl: e.target.value })
        }
      />

      <textarea
        placeholder="Descripción"
        className="border p-2 rounded w-full"
        value={formMovie.description}
        onChange={(e) =>
          setFormMovie({ ...formMovie, description: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Clasificación (Ej: PG-13)"
        className="border p-2 rounded w-full"
        value={formMovie.classification}
        onChange={(e) =>
          setFormMovie({ ...formMovie, classification: e.target.value })
        }
      />

      <label className="block font-semibold">Formato:</label>
      <select
        multiple
        className="border p-2 rounded w-full"
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

      <input
        type="date"
        className="border p-2 rounded w-full"
        value={formMovie.releaseDate}
        onChange={(e) =>
          setFormMovie({ ...formMovie, releaseDate: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Crear Película
      </button>
    </div>
  );
};

export default CreateMovieForm;
