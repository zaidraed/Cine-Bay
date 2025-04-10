import { useState } from "react";
import useAuthStore from "../../store/authStore";
import CreateMovieForm from "./CreateMovieForm";
import CreateHallForm from "./CreateHallForm";
import CreateScreeningForm from "./CreateScreeningForm";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const { accessToken } = useAuthStore();
  const [selectedForm, setSelectedForm] = useState(null);

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
      <h1 className="text-2xl font-bold">🎛️ Panel de Administración</h1>

      <div className="flex gap-4 flex-wrap">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setSelectedForm("movie")}
        >
          🎬 Crear Película
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setSelectedForm("hall")}
        >
          🏟️ Crear Sala
        </button>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => setSelectedForm("screening")}
        >
          🕒 Crear Función
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
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
