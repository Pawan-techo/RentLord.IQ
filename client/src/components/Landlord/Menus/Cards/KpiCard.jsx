export const KpiCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white rounded-xl border shadow-sm p-5">
    <div className="flex justify-between">
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <h2 className="text-2xl font-bold text-slate-800 mt-1">
          {value}
        </h2>
        <p className={`text-xs mt-1 text-${color}-600`}>
          {trend}
        </p>
      </div>
      <div
        className={`h-10 w-10 rounded-lg bg-${color}-50 text-${color}-600 flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export const Alert = ({ text, color }) => (
  <div
    className={`px-4 py-3 rounded-lg bg-${color}-50 text-${color}-700`}
  >
    ⚠️ {text}
  </div>
);

export const ActionBtn = ({ icon, text }) => (
  <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border hover:bg-slate-50 transition">
    {icon}
    {text}
  </button>
);
