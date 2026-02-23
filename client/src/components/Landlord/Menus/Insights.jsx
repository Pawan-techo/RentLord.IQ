import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee, Home, Clock, Wrench, Building2 } from "lucide-react";
import DashboardHeader from "../DashboardHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LabelList,
} from "recharts";

import { getLandlordDues } from "../../../state/Due/Action";
import { getLandlordProperties } from "../../../state/Property/Action";
import { getMyTenants } from "../../../state/Auth/Action";
import { getSubPropertiesByLandlord } from "../../../state/SubProperty/Action";
import { getLandlordMaintenanceRequests } from "../../../state/Maintenance/Action";

 // Reusable KPI card used for dashboard metrics.
 
const KpiCard = ({ title, value, trend, icon }) => (
  <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{title}</span>
      <div className="p-2 rounded-lg bg-slate-100 text-slate-700">{icon}</div>
    </div>

    <div className="mt-3 text-2xl font-semibold text-slate-800">{value}</div>
    <p className="text-xs text-slate-500 mt-1">{trend}</p>
  </div>
);

const Insights = () => {
  const dispatch = useDispatch();

  const { jwt } = useSelector((state) => state.auth);
  const { alldues = [] } = useSelector((state) => state.due);
  const { landlordRequests } = useSelector((state) => state.maintenance);
  const { subProperties = {} } = useSelector((state) => state.subproperty);
  const { properties = {} } = useSelector((state) => state.property);

   // Fetch landlord-related dashboard data once JWT is available.
 
   useEffect(() => {
    if (!jwt) return;

    dispatch(getLandlordDues(jwt));
    dispatch(getLandlordProperties(jwt));
    dispatch(getLandlordMaintenanceRequests(jwt));
    dispatch(getMyTenants(jwt));
    dispatch(getSubPropertiesByLandlord({}, jwt));
  }, [jwt]);

  const propertyList = properties.properties || [];
  const totalProperties = propertyList?.length;

  const subPropertyList = subProperties?.data || [];
  const totalUnits = subPropertyList.length;

  const occupiedUnits = subPropertyList.filter(
    (sp) => sp.status === "OCCUPIED"
  ).length;

  const vacantUnits = subPropertyList.filter(
    (sp) => sp.status === "VACANT"
  ).length;

   // Occupancy percentage calculated from unit distribution.
  const occupancyRate =
    totalUnits === 0 ? 0 : Math.round((occupiedUnits / totalUnits) * 100);

   // Financial aggregations derived from dues state.

  const totalPaid = alldues
    .filter((d) => d.status === "PAID")
    .reduce((sum, d) => sum + d.amount, 0);

  const totalDue = alldues
    .filter((d) => d.status === "UNPAID" || d.status === "PARTIAL")
    .reduce((sum, d) => sum + d.amount, 0);

  const pendingTenants = alldues.filter(
    (d) => d.status === "UNPAID" || d.status === "PARTIAL"
  ).length;

  const openMaintenance = landlordRequests.filter(
    (m) => m.status === "OPEN"
  ).length;

   // Groups paid rent by month/year for bar chart visualization.
   
  const rentData = useMemo(() => {
    const map = {};

    alldues
      .filter((d) => d.status === "PAID")
      .forEach((d) => {
        const key = `${d.month}/${d.year}`;
        if (!map[key]) map[key] = 0;
        map[key] += d.amount;
      });

    return Object.entries(map).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [alldues]);

  const occupancyData = [
    {
      name: "Occupied",
      value: occupiedUnits,
      fill: "#10b981",
    },
    {
      name: "Vacant",
      value: vacantUnits,
      fill: "#f43f5e",
    },
  ];

  return (
    <>
      <DashboardHeader title="Insights" />

      <div className="p-6 space-y-5 bg-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <KpiCard
            title="Total Properties"
            value={totalProperties}
            trend="All registered properties"
            icon={<Building2 size={18} />}
          />
          <KpiCard
            title="Occupancy"
            value={`${occupancyRate}%`}
            trend={`${occupiedUnits} / ${totalUnits} units`}
            icon={<Home size={18} />}
          />
          <KpiCard
            title="Total Rent Collected"
            value={`₹${totalPaid.toLocaleString("en-IN")}`}
            trend="All time collected"
            icon={<IndianRupee size={18} />}
          />
          <KpiCard
            title="Outstanding Rent"
            value={`₹${totalDue.toLocaleString("en-IN")}`}
            trend={`${pendingTenants} tenants pending`}
            icon={<Clock size={18} />}
          />
          <KpiCard
            title="Maintenance Open"
            value={`${openMaintenance}`}
            trend="Active issues"
            icon={<Wrench size={18} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white shadow-md rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-medium text-slate-700">
              Monthly Rent Collection
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={rentData}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) =>
                    `₹${value >= 1000 ? `${value / 1000}k` : value}`
                  }
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#324368"
                  radius={[10, 10, 0, 0]}
                  animationDuration={900}
                  barSize={35}
                >
                  <LabelList
                    dataKey="amount"
                    position="top"
                    formatter={(value) =>
                      `₹${
                        value >= 1000
                          ? `${(value / 1000).toFixed(1)}k`
                          : value
                      }`
                    }
                    style={{ fontSize: 11 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-4">
              Occupancy Status
            </h3>

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  paddingAngle={3}
                  isAnimationActive={true}
                  style={{ outline: "none" }}
                  label={({ cx, cy }) => (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-800 text-lg font-semibold"
                    >
                      {occupancyRate}%
                    </text>
                  )}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="text-center mt-2">
              <p className="text-xl font-semibold text-slate-800">
                {occupancyRate}%
              </p>
              <p className="text-xs text-slate-500">Occupied</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-md border border-slate-200 p-5">
          <h3 className="text-sm font-medium text-slate-700 mb-1">Alerts</h3>

          <div className="space-y-3 text-sm text-slate-600">
            {pendingTenants > 0 && (
              <p>• {pendingTenants} tenants haven’t paid rent</p>
            )}
            {openMaintenance > 0 && (
              <p>• {openMaintenance} maintenance requests open</p>
            )}
            {pendingTenants === 0 && openMaintenance === 0 && (
              <p>No alerts 🎉</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;