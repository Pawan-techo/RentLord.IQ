import { Wrench } from "lucide-react";

const MaintenanceCard = ({ requests, onRaiseRequest }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-50 text-blue-600 border-blue-300";
      case "IN_PROGRESS":
        return "bg-yellow-50 text-yellow-600 border-yellow-300";
      case "RESOLVED":
        return "bg-green-50 text-green-600 border-green-300";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-50 text-red-600 border-red-300";
      case "MEDIUM":
        return "bg-orange-50 text-orange-600 border-orange-300";
      case "LOW":
        return "bg-green-50 text-green-600 border-green-300";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-56 md:h-55 border border-gray-200 justify-between">
      <div className="flex items-center gap-2 text-orange-600">
        <Wrench className="w-5 h-5" />
        <span className="text-sm font-medium">Maintenance</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 overflow-y-auto">
        {requests?.length > 0 ? (
          requests.map((req) => (
            <div
              key={req._id}
              className="border-b border-gray-200 pb-2"
            >
              <p className="text-sm font-medium text-slate-800 truncate">
                {req.title}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {new Date(req.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-1 flex justify-between items-center">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityClass(
                    req.priority
                  )}`}
                >
                  {req.priority}
                </span>

                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusClass(
                    req.status
                  )}`}
                >
                  {req.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 text-center">
            No maintenance requests
          </p>
        )}
      </div>
      <button
        onClick={onRaiseRequest}
        className="mt-4 w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
      >
        Raise Maintenance Request
      </button>
    </div>
  );
};

export default MaintenanceCard;
