import SubPropertyCard from "./Cards/SubPropertyCard";
import { Plus, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubProperty,
  getSubPropertiesByLandlord,
  vacateSubProperty,
} from "../../../state/SubProperty/Action";
import { getLandlordProperties } from "../../../state/Property/Action";

const SubPropertiesOutlet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jwt } = useSelector((state) => state.auth);
  const { subProperties = [] } = useSelector((state) => state.subproperty);
  const { properties = [] } = useSelector((state) => state.property);

  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL query params
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "",
  );

  const [propertyFilter, setPropertyFilter] = useState(
    searchParams.get("propertyId") || "",
  );

  // Refetch sub-properties whenever filters change
  useEffect(() => {
    if (!jwt) return;

    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (propertyFilter) params.propertyId = propertyFilter;

    setSearchParams(params);
    dispatch(getSubPropertiesByLandlord(params, jwt));
  }, [statusFilter, propertyFilter, jwt]);

  // Fetch landlord properties for property filter dropdown
  useEffect(() => {
    if (!jwt) return;
    dispatch(getLandlordProperties(jwt));
  }, [jwt]);

  const handleDelete = (subPropertyId) => {
    if (!window.confirm("Are you sure you want to delete this sub-property?")) {
      return;
    }
    dispatch(deleteSubProperty(subPropertyId, jwt));
  };

  const handleVacant = (id, reason) => {
    if (window.confirm("Are you sure you want to mark this unit as vacant?")) {
      dispatch(vacateSubProperty(id, reason, jwt));
    }
  };

  // Frontend filtering as a safe fallback
  const filteredSubProperties = subProperties?.data?.filter((sp) => {
    const statusMatch = statusFilter ? sp.status === statusFilter : true;
    const propertyMatch = propertyFilter
      ? sp.propertyId?._id === propertyFilter
      : true;

    return statusMatch && propertyMatch;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader title="Sub Properties" />

      <div className="p-6 space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Manage Sub Properties
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-amber-700 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="OCCUPIED">Occupied</option>
              <option value="VACANT">Vacant</option>
            </select>

            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-amber-700 focus:outline-none"
            >
              <option value="">All Properties</option>

              {properties?.properties?.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.name}
                </option>
              ))}
            </select>

            <button
              disabled={!propertyFilter}
              onClick={() =>
                navigate(
                  `/landlord/add-sub-property?propertyId=${propertyFilter}`,
                )
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white
               ${
                 propertyFilter
                   ? "bg-indigo-600"
                   : "bg-gray-400 cursor-not-allowed"
               }`}
            >
              <Plus size={16} />
              Add SubProperty
            </button>
          </div>
        </div>

        {subProperties?.count === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center text-slate-500">
            No sub-properties found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubProperties?.map((sp) => (
              <SubPropertyCard
                key={sp._id}
                subProperty={sp}
                onDelete={handleDelete}
                onVacant={handleVacant}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubPropertiesOutlet;