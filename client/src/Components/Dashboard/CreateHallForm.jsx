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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdHall, setCreatedHall] = useState(null);

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
      setCreatedHall(data);
      setShowSuccessModal(true);
      setFormHall({ name: "", capacity: "" });
    } catch (err) {
      setError(err.message || "Failed to create hall. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setCreatedHall(null);
    onCreated && onCreated();
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">🏟️ Create New Hall</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
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

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">
                Hall Created Successfully!
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  <span className="font-semibold">{createdHall?.name}</span>{" "}
                  with capacity for{" "}
                  <span className="font-semibold">{createdHall?.capacity}</span>{" "}
                  people has been created.
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                  onClick={closeModal}
                >
                  Volver al Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CreateHallForm.propTypes = {
  accessToken: PropTypes.string.isRequired,
  onCreated: PropTypes.func,
};

export default CreateHallForm;
