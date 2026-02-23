import { CreditCard, Wrench, FileText, Clock } from "lucide-react";

const TenantQuickActions = ({
  actions = [
    { label: "Pay Rent", icon: <CreditCard className="w-5 h-5" />, onClick: () => alert("Pay Rent clicked") },
    { label: "Maintenance Request", icon: <Wrench className="w-5 h-5" />, onClick: () => alert("Maintenance Request clicked") },
    { label: "View Agreement", icon: <FileText className="w-5 h-5" />, onClick: () => alert("View Agreement clicked") },
    { label: "Payment History", icon: <Clock className="w-5 h-5" />, onClick: () => alert("Payment History clicked") },
  ]
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4  border border-gray-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Quick Actions</h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition text-sm font-medium text-slate-700 justify-center"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TenantQuickActions;
