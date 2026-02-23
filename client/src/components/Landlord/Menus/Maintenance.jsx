import { useState, useEffect } from "react";
import DashboardHeader from "../DashboardHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getLandlordMaintenanceRequests,
  updateMaintenanceStatus,
} from "../../../state/Maintenance/Action";

const Maintenance = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { jwt } = useSelector((state) => state.auth);
  const { landlordRequests } = useSelector((state) => state.maintenance);

   // Fetch landlord maintenance requests when JWT becomes available.

  useEffect(() => {
    if (!jwt) return;
    dispatch(getLandlordMaintenanceRequests(jwt));
  }, [jwt]);

   // Updates request status and refreshes list to reflect latest state.
   
  const handleStatusChange = async (requestId, status) => {
    dispatch(updateMaintenanceStatus(requestId, status, jwt));
    dispatch(getLandlordMaintenanceRequests(jwt));
  };

  return (
    <>
      <DashboardHeader title="Maintenance Requests" />

      <div className="p-6">
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Property</th>
                <th className="px-6 py-4 text-left font-medium">Unit</th>
                <th className="px-6 py-4 text-left font-medium">Tenant</th>
                <th className="px-6 py-4 text-left font-medium">Issue</th>
                <th className="px-6 py-4 text-left font-medium">Priority</th>
                <th className="px-6 py-4 text-left font-medium">Created At</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-left font-medium">
                  Update Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {landlordRequests.map((req) => (
                <tr key={req._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">
                    {req.propertyId?.name}
                  </td>

                  <td className="px-6 py-4">
                    {req.subPropertyId?.unitName}
                  </td>

                  <td className="px-6 py-4">
                    {req.tenantId?.firstName} {req.tenantId?.lastName}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {req.title}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium border rounded
                        ${
                          req.priority === "HIGH"
                            ? "bg-red-50 text-red-600 border-red-300"
                            : req.priority === "MEDIUM"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-300"
                            : "bg-green-50 text-green-600 border-green-300"
                        }`}
                    >
                      {req.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {new Date(req?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium border rounded
                        ${
                          req.status === "OPEN"
                            ? "bg-blue-50 text-blue-600 border-blue-300"
                            : req.status === "IN_PROGRESS"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-300"
                            : "bg-green-50 text-green-600 border-green-300"
                        }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                      className="border border-gray-400 rounded-md px-3 py-1 text-sm focus:outline-none"
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {landlordRequests.length === 0 && (
            <div className="p-10 text-center text-slate-500">
              No maintenance requests found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Maintenance;  