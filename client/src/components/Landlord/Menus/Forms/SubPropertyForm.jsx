import { useState } from "react";
import DashboardHeader from "../../DashboardHeader";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSubProperty } from "../../../../state/SubProperty/Action";

const SubPropertyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jwt, user } = useSelector((state) => state.auth);
  const landlordId = user?._id;

  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  if (!propertyId) {
    return <p className="text-center mt-10">Property not selected</p>;
  }

  const [formData, setFormData] = useState({
    unitName: "",
    rentAmount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.unitName || !formData.rentAmount) {
      setError("Unit name and rent amount are required");
      return;
    }

    dispatch(
      createSubProperty(
        {
          landlordId,
          propertyId,
          ...formData,
        },
        jwt,
      ),
    );

    setSuccess("Sub-property created successfully ✅");

    setFormData({
      unitName: "",
      rentAmount: "",
    });

    // go back to list after short delay
    setTimeout(() => navigate(-1), 800);
  };

  return (
    <>
      <DashboardHeader title="Add Sub-Property" />

      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-indigo-600 shadow-md rounded-md px-3 py-1.5 hover:text-white font-medium mb-4"
        >
          ← Back
        </button>

        <div className="max-w-lg text-center mx-auto p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create Sub-Property</h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="unitName"
              placeholder="Unit Name"
              value={formData.unitName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded border-gray-400 focus:outline-none"
            />

            <input
              type="number"
              name="rentAmount"
              placeholder="Rent Amount"
              value={formData.rentAmount}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded border-gray-400 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {loading ? "Creating..." : "Create Sub-Property"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubPropertyForm;
