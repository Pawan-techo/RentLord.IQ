import { useEffect, useState } from "react";
import DashboardHeader from "../../DashboardHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProperty, resetPropertyState } from "../../../../state/Property/Action";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    image: "",
  });

  const { jwt } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.property); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!jwt) return;

  dispatch(createProperty(formData, jwt));
};
useEffect(() => {
  if (success) {
    dispatch(resetPropertyState());
    navigate("/landlord/properties");
  }
}, [success, dispatch, navigate]);


  return (
    <>
      <DashboardHeader title="Add Properties" />
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-indigo-600 shadow-md rounded-md px-3 py-1.5 hover:text-white font-medium mb-4"
        >
          ← Back
        </button>
        <div className="max-w-lg text-center mx-auto p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create Property</h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Property Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded border border-gray-400 focus:outline-none"
            />

            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded border border-gray-400 focus:outline-none"
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-2 rounded border border-gray-400 focus:outline-none"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-2 rounded border border-gray-400 focus:outline-none"
              />
            </div>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border p-2 rounded border border-gray-400 focus:outline-none"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border p-2 rounded border border-gray-400 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {loading ? "Creating..." : "Create Property"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PropertyForm;
