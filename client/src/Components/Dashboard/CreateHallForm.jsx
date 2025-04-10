import { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import PropTypes from "prop-types";

const CreateHallForm = ({ accessToken, onCreated }) => {
  const [formHall, setFormHall] = useState({
    name: "",
    capacity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    const { name, capacity } = formHall;

    const parsedCapacity = parseInt(capacity, 10);

    if (!name || isNaN(parsedCapacity) || parsedCapacity <= 0) {
      setError(
        "Name and capacity are required (capacity must be a positive number)"
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetchData(
        "/hall",
        "POST",
        {
          name,
          capacity: parsedCapacity,
        },
        accessToken
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to create hall (Status: ${res.status})`
        );
      }

      const data = await res.json();
      setSuccess(`Hall "${data.name}" created successfully!`);
      setFormHall({ name: "", capacity: "" });
      onCreated && onCreated();
    } catch (err) {
      console.error("Error creating hall:", err);
      setError(err.message || "Failed to create hall. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">🏟️ Create New Hall</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Hall Name
        </label>
        <input
          type="text"
          placeholder="Main Hall"
          className="border p-2 rounded w-full"
          value={formHall.name}
          onChange={(e) => setFormHall({ ...formHall, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Capacity
        </label>
        <input
          type="number"
          placeholder="150"
          className="border p-2 rounded w-full"
          value={formHall.capacity}
          onChange={(e) =>
            setFormHall({ ...formHall, capacity: e.target.value })
          }
          min="1"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`mt-4 px-4 py-2 rounded w-full ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {isSubmitting ? "Creating..." : "Create Hall"}
      </button>
    </div>
  );
};

CreateHallForm.propTypes = {
  accessToken: PropTypes.string.isRequired,
  onCreated: PropTypes.func,
};

export default CreateHallForm;
