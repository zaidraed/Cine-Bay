import useAuthStore from "../store/authStore";
import AdminDashboard from "../Components/Dashboard/AdminDashboard";
import { EmployeeDashboard } from "../components/Dashboard/EmployeeDashboard";
import { UserDashboard } from "../components/Dashboard/UserDashboard";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div>
        <h1>Por favor, inicie sesión para acceder al dashboard.</h1>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case "ADMIN":
        return <AdminDashboard />;
      case "EMPLOYEE":
        return <EmployeeDashboard user={user} />;
      case "USER":
        return <UserDashboard user={user} />;
      default:
        return <h1>Rol no reconocido. Contacte al administrador.</h1>;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default DashboardPage;
