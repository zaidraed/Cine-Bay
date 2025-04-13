import useAuthStore from "../../store/authStore";
import CreateMovieForm from "./CreateMovieForm";

export const EmployeeDashboard = () => {
  const { accessToken } = useAuthStore();

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">👷 Panel de Empleado</h1>
      <CreateMovieForm accessToken={accessToken} />
    </div>
  );
};

export default EmployeeDashboard;
