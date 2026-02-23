import { useEffect, useMemo, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import { useDispatch, useSelector } from "react-redux";
import { getLandlordDues } from "../../../state/Due/Action";

const DueRent = () => {
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.auth);
  const { alldues = [] } = useSelector((state) => state.due);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [monthFilter, setMonthFilter] = useState("ALL");
  const [yearFilter, setYearFilter] = useState("ALL");

  // Fetch landlord dues when JWT becomes available
  useEffect(() => {
    if (!jwt) return;
    dispatch(getLandlordDues(jwt));
  }, [jwt]);

  // Memoized filtering to prevent unnecessary recalculations
  const filteredDues = useMemo(() => {
    return alldues.filter((due) => {
      const tenantName =
        `${due.tenantId?.firstName || ""} ${due.tenantId?.lastName || ""}`.toLowerCase();

      const matchesSearch = tenantName.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || due.status === statusFilter;

      const matchesMonth =
        monthFilter === "ALL" || String(due.month) === monthFilter;

      const matchesYear =
        yearFilter === "ALL" || String(due.year) === yearFilter;

      return matchesSearch && matchesStatus && matchesMonth && matchesYear;
    });
  }, [alldues, search, statusFilter, monthFilter, yearFilter]);

  // Total unpaid or partially paid amount
  const totalOutstanding = alldues
    .filter((d) => d.status === "UNPAID" || d.status === "PARTIAL")
    .reduce((sum, d) => sum + d.amount, 0);

  // Total fully paid amount
  const totalPaid = alldues
    .filter((d) => d.status === "PAID")
    .reduce((sum, d) => sum + d.amount, 0);

  // Revenue collected for the current month
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const revenueThisMonth = alldues
    .filter(
      (d) =>
        d.status === "PAID" &&
        d.month === currentMonth &&
        d.year === currentYear
    )
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <>
      <DashboardHeader title="Rent Dues" />

      <div className="p-6 space-y-5">
        <div className="bg-white p-4 rounded-lg shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by tenant name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="PAID">PAID</option>
            <option value="UNPAID">UNPAID</option>
            <option value="PARTIAL">PARTIAL</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="ALL">All Months</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="ALL">All Years</option>
            {[...new Set(alldues.map((d) => d.year))].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 shadow-sm">
            <p className="text-sm text-red-600 font-medium">
              Total Outstanding
            </p>
            <h2 className="text-xl font-bold text-red-700 mt-2">
              ₹{totalOutstanding.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-5 shadow-sm">
            <p className="text-sm text-green-600 font-medium">Total Paid</p>
            <h2 className="text-xl font-bold text-green-700 mt-2">
              ₹{totalPaid.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm">
            <p className="text-sm text-blue-600 font-medium">
              Month's Revenue
            </p>
            <h2 className="text-xl font-bold text-blue-700 mt-2">
              ₹{revenueThisMonth.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Tenant</th>
                <th className="px-6 py-4 text-left font-medium">Property</th>
                <th className="px-6 py-4 text-left font-medium">Unit</th>
                <th className="px-6 py-4 text-left font-medium">Amount</th>
                <th className="px-6 py-4 text-left font-medium">Month</th>
                <th className="px-6 py-4 text-left font-medium">Due Date</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filteredDues.map((due) => (
                <tr key={due._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">
                    {due.tenantId?.firstName} {due.tenantId?.lastName}
                  </td>

                  <td className="px-6 py-4">
                    {due.subPropertyId?.propertyId?.name}
                  </td>

                  <td className="px-6 py-4">
                    {due.subPropertyId?.unitName}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹{due.amount}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {due.month}/{due.year}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {new Date(due.dueDate).toLocaleDateString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium border rounded
                        ${
                          due.status === "PAID"
                            ? "bg-green-50 text-green-600 border-green-300"
                            : due.status === "PARTIAL"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-300"
                            : due.status === "CANCELLED"
                            ? "bg-gray-100 text-gray-600 border-gray-300"
                            : "bg-red-50 text-red-600 border-red-300"
                        }`}
                    >
                      {due.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDues.length === 0 && (
            <div className="p-10 text-center text-slate-500">
              No rent dues found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DueRent;