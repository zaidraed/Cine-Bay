import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { fetchData } from "../../utils/fetchData";

const AdminDashboard = () => {
  const { accessToken } = useAuthStore();

  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [halls, setHalls] = useState([]);
  //const [screenings, setScreenings] = useState([]);

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

  const [formHall, setFormHall] = useState({
    name: "",
    capacity: "",
  });

  const [formScreening, setFormScreening] = useState({
    movieId: "",
    hallId: "",
    schedule: "",
    price: "",
  });

  const loadData = async () => {
    try {
      const [moviesRes, usersRes, hallsRes] = await Promise.all([
        fetchData("/movies", "GET", null, accessToken),
        fetchData("/users", "GET", null, accessToken),
        fetchData("/hall", "GET", null, accessToken),
      ]);

      const moviesData = await moviesRes.json();
      const usersData = await usersRes.json();
      const hallsData = await hallsRes.json();

      console.log("Usuarios cargados:", usersData);

      setMovies(moviesData);
      setUsers(Array.isArray(usersData) ? usersData : usersData.users);
      setHalls(hallsData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Hubo un error al cargar los datos. Ver consola.");
    }
  };

  const createMovie = async () => {
    if (!formMovie.title || !formMovie.genre || !formMovie.duration) {
      alert("Por favor completa los campos obligatorios de la película.");
      return;
    }
    try {
      await fetchData("/movies", "POST", formMovie, accessToken);
      alert("Película creada exitosamente");
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
      loadData();
    } catch {
      alert("Error al crear la película");
    }
  };

  const createHall = async () => {
    if (!formHall.name || !formHall.capacity) {
      alert("Por favor ingresa nombre y capacidad de la sala.");
      return;
    }
    try {
      const res = await fetchData("/hall", "POST", formHall, accessToken);
      const data = await res.json();
      await fetchData(`/seats/generate/${data.id}`, "POST", null, accessToken);
      alert("Sala creada y asientos generados");
      setFormHall({ name: "", capacity: "" });
      loadData();
    } catch {
      alert("Error al crear la sala");
    }
  };

  const createScreening = async () => {
    if (
      !formScreening.movieId ||
      !formScreening.hallId ||
      !formScreening.schedule ||
      !formScreening.price
    ) {
      alert("Completa todos los campos de la función");
      return;
    }
    try {
      await fetchData("/screening", "POST", formScreening, accessToken);
      alert("Función creada exitosamente");
      setFormScreening({ movieId: "", hallId: "", schedule: "", price: "" });
      loadData();
    } catch {
      alert("Error al crear la función");
    }
  };

  const updateUserRole = async (userId, role) => {
    try {
      await fetchData(`/users/${userId}`, "PATCH", { role }, accessToken);
      alert("Rol actualizado");
      loadData();
    } catch {
      alert("Error al actualizar el rol del usuario");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-12 p-6 text-black bg-white">
      {/* Crear Película */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🎬 Crear Nueva Película</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formMovie).map((key) => (
            <input
              key={key}
              type="text"
              className="border p-2 rounded"
              placeholder={key}
              value={formMovie[key]}
              onChange={(e) =>
                setFormMovie({ ...formMovie, [key]: e.target.value })
              }
            />
          ))}
        </div>
        <button
          onClick={createMovie}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Crear Película
        </button>
      </section>

      {/* Crear Sala */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🏟️ Crear Sala</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Nombre"
            value={formHall.name}
            onChange={(e) => setFormHall({ ...formHall, name: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Capacidad"
            value={formHall.capacity}
            onChange={(e) =>
              setFormHall({ ...formHall, capacity: e.target.value })
            }
          />
        </div>
        <button
          onClick={createHall}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Crear Sala y Generar Asientos
        </button>
      </section>

      {/* Crear Función */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🕒 Crear Función</h2>
        <div className="grid grid-cols-2 gap-4">
          <select
            className="border p-2 rounded"
            value={formScreening.movieId}
            onChange={(e) =>
              setFormScreening({ ...formScreening, movieId: e.target.value })
            }
          >
            <option value="">Seleccione Película</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={formScreening.hallId}
            onChange={(e) =>
              setFormScreening({ ...formScreening, hallId: e.target.value })
            }
          >
            <option value="">Seleccione Sala</option>
            {halls.map((hall) => (
              <option key={hall.id} value={hall.id}>
                {hall.name}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={formScreening.schedule}
            onChange={(e) =>
              setFormScreening({ ...formScreening, schedule: e.target.value })
            }
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Precio"
            value={formScreening.price}
            onChange={(e) =>
              setFormScreening({ ...formScreening, price: e.target.value })
            }
          />
        </div>
        <button
          onClick={createScreening}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Crear Función
        </button>
      </section>

      {/* Usuarios */}
      <section>
        <h2 className="text-2xl font-bold mb-4">👤 Gestión de Usuarios</h2>
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="USER">USER</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
