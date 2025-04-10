import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetchData";
import PropTypes from "prop-types";

const CreateScreeningForm = ({ accessToken, onCreated }) => {
  const [formScreening, setFormScreening] = useState({
    movieId: "",
    hallId: "",
    schedule: "",
    price: "",
  });
  CreateScreeningForm.propTypes = {
    accessToken: PropTypes.string.isRequired,
    onCreated: PropTypes.func,
  };

  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [moviesRes, hallsRes] = await Promise.all([
        fetchData("/movies", "GET", null, accessToken),
        fetchData("/hall", "GET", null, accessToken),
      ]);

      setMovies(await moviesRes.json());
      setHalls(await hallsRes.json());
    };

    loadData();
  }, [accessToken]);

  const handleSubmit = async () => {
    const { movieId, hallId, schedule, price } = formScreening;

    if (!movieId || !hallId || !schedule || !price) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await fetchData(
        "/screening",
        "POST",
        {
          movieId,
          hallId,
          schedule: new Date(schedule).toISOString(),
          price: Number(price),
        },
        accessToken
      );

      alert("Función creada correctamente.");
      setFormScreening({ movieId: "", hallId: "", schedule: "", price: "" });
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
      alert("Error al crear la función.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🕒 Crear Función</h2>

      <select
        className="border p-2 rounded w-full"
        value={formScreening.movieId}
        onChange={(e) =>
          setFormScreening({ ...formScreening, movieId: e.target.value })
        }
      >
        <option value="">Seleccione Película</option>
        {movies.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded w-full"
        value={formScreening.hallId}
        onChange={(e) =>
          setFormScreening({ ...formScreening, hallId: e.target.value })
        }
      >
        <option value="">Seleccione Sala</option>
        {halls.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        className="border p-2 rounded w-full"
        value={formScreening.schedule}
        onChange={(e) =>
          setFormScreening({ ...formScreening, schedule: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Precio"
        className="border p-2 rounded w-full"
        value={formScreening.price}
        onChange={(e) =>
          setFormScreening({ ...formScreening, price: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Crear Función
      </button>
    </div>
  );
};

export default CreateScreeningForm;
