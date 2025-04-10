import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import PropTypes from "prop-types";
const roles = ["ADMIN", "EMPLOYEE", "USER"];

const UserManagement = ({ accessToken, onUpdated }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await fetchData("/users", "GET", null, accessToken);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };
  UserManagement.propTypes = {
    accessToken: PropTypes.string.isRequired,
    onUpdated: PropTypes.func,
  };
  const updateUserRole = async (userId, newRole) => {
    try {
      await fetchData(
        `/users/${userId}`,
        "PATCH",
        { role: newRole },
        accessToken
      );
      alert("Rol actualizado");
      loadUsers();
      onUpdated && onUpdated();
    } catch (err) {
      console.error("Error actualizando rol:", err);
      alert("Error al actualizar el rol.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">👥 Gestión de Usuarios</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">
                <select
                  value={u.role}
                  onChange={(e) => updateUserRole(u.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
