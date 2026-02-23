import { useSelector } from "react-redux";
import { User, Mail, Phone, Calendar } from "lucide-react";

const TenantProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const formattedDate = new Date(user?.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white h-74 rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex flex-col items-center gap-3">
        {user?.image ? (
          <img
            src={user?.image}
            alt="Tenant Profile"
            className="w-24 h-24 p-1 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-semibold">
            {user?.firstName?.charAt(0)}
          </div>
        )}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-slate-800">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="text-slate-600 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            {user?.email}
          </p>

          <p className="text-slate-600 flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            {user?.phone}
          </p>

          <p className="text-slate-500 flex items-center justify-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            Account Created: {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;
