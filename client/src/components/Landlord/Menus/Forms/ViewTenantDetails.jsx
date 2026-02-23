import { useEffect } from "react";
import DashboardHeader from "../../DashboardHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubPropertyByCurrentTenant } from "../../../../state/SubProperty/Action";
import { getTenantMaintenanceByIdRequests } from "../../../../state/Maintenance/Action";
import { getTenantDuesById } from "../../../../state/Due/Action";

const ViewTenantDetails = () => {
  const { tenantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt } = useSelector((state) => state.auth);
  const { tenantSubProperty } = useSelector((state) => state.subproperty);
  const { tenantRequests = {} } = useSelector((state) => state.maintenance);
  const { dues } = useSelector((state) => state.due);
  useEffect(() => {
    if (jwt && tenantId) {
      dispatch(getSubPropertyByCurrentTenant(tenantId, jwt));
      dispatch(getTenantMaintenanceByIdRequests(tenantId, jwt));
      dispatch(getTenantDuesById(tenantId, jwt));
    }
  }, [tenantId, jwt, dispatch]);
  const subProperty = tenantSubProperty;
  const tenant = subProperty?.currentTenantId;
  const property = subProperty?.propertyId;

  const totalMaintenance = tenantRequests?.count || 0;
  const totalDues = dues?.filter((p) => p.status !== "PAID").length;
  const totalPaid = dues?.filter((p) => p.status === "PAID").length;

  return (
    <>
      <DashboardHeader
        title={`${tenant?.firstName || ""} ${tenant?.lastName || ""}`}
      />

      <div className="p-4 sm:p-5 space-y-5">
        
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src={tenant?.image || "https://ui-avatars.com/api/?name=Tenant"}
              alt="tenant"
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {tenant?.firstName} {tenant?.lastName}
              </h2>
              <p className="text-sm text-slate-500">{tenant?.email}</p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm hover:bg-indigo-200 transition text-indigo-800 px-4 py-2 rounded-lg border shadow-md shadow-indigo-300 border-indigo-700"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500 uppercase">Tenant Since</p>
            <h3 className="text-lg font-semibold mt-1 text-slate-800">
              {subProperty?.lease?.startDate?.slice(0, 10) || "N/A"}
            </h3>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500 uppercase">Maintenance</p>
            <h3 className="text-lg font-semibold mt-1">{totalMaintenance}</h3>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500 uppercase">Outstanding Dues</p>
            <h3 className="text-lg font-semibold mt-1 text-red-600">
              {totalDues}
            </h3>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500 uppercase">Payments Done</p>
            <h3 className="text-lg font-semibold mt-1 text-green-600">
              {totalPaid}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Tenant Info */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Tenant Information
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Name</span>
                <span className="font-medium text-gray-800">
                  {tenant?.firstName} {tenant?.lastName}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Email</span>
                <span className="font-medium">{tenant?.email}</span>
              </div>

              <div className="flex justify-between">
                <span>Phone</span>
                <span className="font-medium">{tenant?.phone}</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-green-50 text-green-600 border border-green-300">
                  {subProperty?.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white lg:col-span-2 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Maintenance Requests
            </h3>

            <div className="max-h-36 overflow-y-auto space-y-3 pr-1">
              {tenantRequests?.data?.length > 0 ? (
                tenantRequests.data.map((m) => (
                  <div
                    key={m._id}
                    className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 text-sm"
                  >
                    <span>{m.title}</span>
                    <span
                      className={`text-xs px-2 py-0.5 font-medium ${
                        m.status === "RESOLVED"
                          ? "bg-green-50 text-green-600 border border-green-300"
                          : "bg-yellow-50 border border-yellow-300 text-yellow-600"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">
                  No maintenance requests by tenant
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 ">
            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Property Details
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Property</span>
                <span className="font-medium text-gray-800">
                  {property?.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Unit</span>
                <span className="font-medium">{subProperty?.unitName}</span>
              </div>

              <div className="flex justify-between">
                <span>Rent</span>
                <span className="font-semibold text-gray-800">
                  ₹{subProperty?.rentAmount}
                </span>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                {property?.address}, {property?.city}, {property?.state} -{" "}
                {property?.pincode}
              </div>
            </div>
          </div>

          <div className="bg-white lg:col-span-2 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Payment History
            </h3>

            <div className="max-h-36 overflow-y-auto">
              <table className="w-full text-sm min-w-[400px]">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dues.map((due) => (
                    <tr key={due._id} className="border-t border-gray-200">
                      <td className="p-2 font-medium">₹{due.amount}</td>
                      <td className="p-2">
                        <span
                          className={`text-xs px-2 font-medium py-0.5 ${
                            due.status === "PAID"
                              ? "bg-green-50 border border-green-300 text-green-600"
                              : "bg-red-50 border border-red-300 text-red-600"
                          }`}
                        >
                          {due.status}
                        </span>
                      </td>
                      <td className="p-2 text-gray-500">
                        {new Date(due.dueDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTenantDetails;
