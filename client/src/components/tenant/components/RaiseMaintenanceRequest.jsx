import { useEffect, useState } from "react";
import axios from "axios";
import { Wrench, X } from "lucide-react";
import { createMaintenanceRequest } from "../../../state/Maintenance/Action";
import { useDispatch, useSelector } from "react-redux";

const RaiseMaintenanceRequest = ({
  tenantId,
  landlordId,
  propertyId,
  subPropertyId,
  onSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "LOW",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const dispatch = useDispatch();
const { jwt } = useSelector((state) => state.auth);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const payload = {
    tenantId,
    landlordId,
    propertyId,
    subPropertyId,
    ...formData,
  };

  const success = await dispatch(
    createMaintenanceRequest(payload, jwt)
  );

  if (success) {
    setFormData({
      title: "",
      description: "",
      priority: "LOW",
    });
    onSuccess?.();
    onClose?.(); 
  }
};

 useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100"
      >
        <X className="w-5 h-5 text-slate-500" />
      </button>
      <div className="flex items-center gap-2 mb-4 text-orange-600">
        <Wrench className="w-5 h-5" />
        <h2 className="text-lg font-semibold text-slate-800">
          Raise Maintenance Request
        </h2>
      </div>
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Issue Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Water leakage in bathroom"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe the issue in detail"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RaiseMaintenanceRequest;
