import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../DashboardHeader";
import {
  getTenantHistory,
  deleteTenantHistory,
} from "../../../state/TenantHistory/Action";

const TenantHistory = () => {
  const dispatch = useDispatch();

  const { jwt } = useSelector((state) => state.auth);
  const { histories, loading, error } = useSelector(
    (state) => state.tenanthistory,
  );

  // Fetch tenant history when JWT is available
  useEffect(() => {
    if (jwt) {
      dispatch(getTenantHistory(jwt));
    }
  }, [dispatch, jwt]);

  // Confirm before deleting tenant history
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this history?")) {
      dispatch(deleteTenantHistory(id, jwt));
    }
  };

  return (
    <>
      <DashboardHeader title="Tenant History" />

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm overflow-scroll md:overflow-hidden">
          {loading && (
            <div className="p-10 text-center text-slate-500">
              Loading tenant history...
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-red-500">{error}</div>
          )}

          {!loading && histories?.length > 0 && (
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-4 py-4 text-left font-medium">Property</th>
                  <th className="px-4 py-4 text-left font-medium">Unit</th>
                  <th className="px-4 py-4 text-left font-medium">Tenant</th>
                  <th className="px-4 py-4 font-medium">Contact</th>
                  <th className="px-4 py-4 font-medium">Rent</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-4 py-4 text-left font-medium">
                    Move In Date
                  </th>
                  <th className="px-4 py-4 text-left font-medium">
                    Move Out Date
                  </th>
                  <th className="px-4 py-4 text-left font-medium">
                    Leaving Reason
                  </th>
                  <th className="px-4 py-4 text-left font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {histories.map((item) => (
                  <tr key={item._id || index}  className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-800">
                        {item.propertyId?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.propertyId?.address}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      {item.subPropertyId?.unitName}
                    </td>

                    <td className="px-4 py-4">
                      {item.tenantId ? (
                        <p className="font-medium">
                          {item.tenantId.firstName} {item.tenantId.lastName}
                        </p>
                      ) : (
                        <span className="italic text-slate-400">
                          No Tenant
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {item.tenantId ? (
                        <>
                          <p>{item.tenantId.email}</p>
                          <p>{item.tenantId.phone}</p>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-3 py-1">
                        {item.rentAmount}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded border ${
                          item.subPropertyId?.status === "OCCUPIED"
                            ? "bg-green-50 text-green-600 border-green-300"
                            : "bg-yellow-50 text-yellow-600 border-yellow-300"
                        }`}
                      >
                        {item.subPropertyId?.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {new Date(item.moveInDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {item.moveOutDate
                        ? new Date(item.moveOutDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )
                        : "------"}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {item.reasonForLeaving ? (
                        <p className="w-30 break-words">
                          {item.reasonForLeaving}
                        </p>
                      ) : (
                        "------"
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1.5 border border-red-800 text-red-800 rounded hover:bg-red-600 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && histories?.length === 0 && (
            <div className="p-10 text-center text-slate-500">
              No tenant history found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TenantHistory;