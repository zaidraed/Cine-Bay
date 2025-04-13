import useAuthStore from "../store/authStore";
import AdminDashboard from "../Components/Dashboard/AdminDashboard";
import { EmployeeDashboard } from "../Components/Dashboard/EmployeeDashboard";
import { UserDashboard } from "../components/Dashboard/UserDashboard";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const overrideRole = params.get("as");

  if (!isAuthenticated || !user) {
    return (
      <div>
        <h1>Por favor, inicie sesión para acceder al dashboard.</h1>
      </div>
    );
  }

  const roleToUse = overrideRole?.toUpperCase() || user.role;

  const renderDashboard = () => {
    switch (roleToUse) {
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
