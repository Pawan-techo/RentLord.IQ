import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardHeader from "../DashboardHeader";
import PropertyCard from "./Cards/PropertyCard";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProperty, getLandlordProperties } from "../../../state/Property/Action";

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt } = useSelector((state) => state.auth);
  const { properties } = useSelector((state) => state.property);

  // Fetch landlord properties when JWT becomes available
  useEffect(() => {
    if (!jwt) return;
    dispatch(getLandlordProperties(jwt));
  }, [jwt]);

  // Handle property deletion with confirmation and error feedback
  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await dispatch(deleteProperty(propertyId, jwt));
      toast.success("Property deleted successfully ✅", { toastId: "success" });
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error("Delete all subproperties first ❌", { toastId: "invite-error" });
      } else {
        toast.error("Something went wrong. Please try again.", { toastId: "invite-error" });
      }
    }
  };

  return (
    <>
      <DashboardHeader title="Properties" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Manage all your properties
          </h2>

          <button
            onClick={() => navigate("/landlord/add-property")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow hover:bg-indigo-700 transition"
          >
            <Plus size={16} />
            Add Property
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties?.properties?.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Properties;