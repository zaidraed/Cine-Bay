import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import CreateMovieForm from "./CreateMovieForm";
import CreateHallForm from "./CreateHallForm";
import CreateScreeningForm from "./CreateScreeningForm";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const { accessToken, logout } = useAuthStore();
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderForm = () => {
    switch (selectedForm) {
      case "movie":
        return (
          <CreateMovieForm
            accessToken={accessToken}
            onCreated={() => setSelectedForm(null)}
          />
        );
      case "hall":
        return (
          <CreateHallForm
            accessToken={accessToken}
            onCreated={() => setSelectedForm(null)}
          />
        );
      case "screening":
        return (
          <CreateScreeningForm
            accessToken={accessToken}
            onCreated={() => setSelectedForm(null)}
          />
        );
      case "users":
        return (
          <UserManagement
            accessToken={accessToken}
            onUpdated={() => setSelectedForm(null)}
          />
        );
      default:
        return (
          <p className="text-gray-500">Seleccioná una acción del panel.</p>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 text-black bg-white min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🎛️ Panel de Administración</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          onClick={() => setSelectedForm("movie")}
        >
          🎬 Crear Película
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          onClick={() => setSelectedForm("hall")}
        >
          🏟️ Crear Sala
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
          onClick={() => setSelectedForm("screening")}
        >
          🕒 Crear Función
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors"
          onClick={() => setSelectedForm("users")}
        >
          👥 Gestionar Usuarios
        </button>
      </div>

      <div className="pt-6 border-t">{renderForm()}</div>
    </div>
  );
};

export default AdminDashboard;
