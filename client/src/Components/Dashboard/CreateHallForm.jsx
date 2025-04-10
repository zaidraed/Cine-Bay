import { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import PropTypes from "prop-types";

const CreateHallForm = ({ accessToken, onCreated }) => {
  const [formHall, setFormHall] = useState({
    name: "",
    capacity: "",
  });
  CreateHallForm.propTypes = {
    accessToken: PropTypes.string.isRequired,
    onCreated: PropTypes.func,
  };
  const handleSubmit = async () => {
    const { name, capacity } = formHall;

    if (!name || !capacity || isNaN(Number(capacity))) {
      alert(
        "Nombre y capacidad son obligatorios (capacidad debe ser numérica)."
      );
      return;
    }

    try {
      const res = await fetchData(
        "/hall",
        "POST",
        {
          name,
          capacity: Number(capacity),
        },
        accessToken
      );

      const data = await res.json();

      await fetchData(`/seats/generate/${data.id}`, "POST", null, accessToken);

      alert("Sala creada y asientos generados.");
      setFormHall({ name: "", capacity: "" });
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
      alert("Error al crear la sala.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🏟️ Crear Sala</h2>

      <input
        type="text"
        placeholder="Nombre de la sala"
        className="border p-2 rounded w-full"
        value={formHall.name}
        onChange={(e) => setFormHall({ ...formHall, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Capacidad"
        className="border p-2 rounded w-full"
        value={formHall.capacity}
        onChange={(e) => setFormHall({ ...formHall, capacity: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
      >
        Crear Sala
      </button>
    </div>
  );
};

export default CreateHallForm;
