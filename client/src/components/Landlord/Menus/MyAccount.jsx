import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Phone,
  Calendar,
  CreditCard,
  TrendingUp,
  Landmark,
  Camera,
  Crown,
  Sparkles,
} from "lucide-react";
import { getLandlordDues } from "../../../state/Due/Action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../DashboardHeader";
import { getUser, updateProfileImage } from "../../../state/Auth/Action";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, jwt } = useSelector((state) => state.auth);
  const { alldues = [] } = useSelector((state) => state.due);

  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState("");

  const plan = user?.subscription?.plan || "BASIC";

  /**
   * Formats account creation date for display.
   */
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

   // Fetch landlord dues once JWT is available.
  useEffect(() => {
    if (!jwt) return;
    dispatch(getLandlordDues(jwt));
  }, [jwt, dispatch]);


   // Updates profile image and refreshes user state.
  
  const handleImageSave = () => {
    if (!jwt) return;

    dispatch(updateProfileImage(imageLink, jwt));
    dispatch(getUser(jwt));

    setImageLink("");
    setShowModal(false);

    window.location.reload();
  };

   // Calculates total rent collected from paid dues.
  const totalCollected = alldues
    .filter((d) => d.status === "PAID")
    .reduce((sum, d) => sum + Number(d.amount || 0), 0);

  const totalPayout = 15000;

   // Dynamic UI styling based on subscription plan.

  const planStyles = {
    BASIC: {
      container: "bg-white border-gray-200 shadow-lg shadow-gray-200",
      avatar: "bg-gray-700 text-white border-gray-300",
      button: "bg-gray-800 hover:bg-gray-900 text-white",
      badge: null,
    },
    PRO: {
      container:
        "bg-gradient-to-br from-blue-200 to-indigo-200 border-blue-400 shadow-xl shadow-blue-200",
      avatar:
        "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      badge: (
        <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm shadow-md">
          <Sparkles size={14} />
          Pro Member
        </div>
      ),
    },
    PREMIUM: {
      container:
        "bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300 shadow-xl shadow-amber-200",
      avatar:
        "bg-gradient-to-br from-yellow-400 to-amber-600 text-white border-amber-400",
      button: "bg-amber-500 hover:bg-amber-600 text-white",
      badge: (
        <div className="flex items-center gap-2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm shadow-md">
          <Crown size={14} />
          Premium Member
        </div>
      ),
    },
  };

  const currentStyle = planStyles[plan];

  return (
    <div className="min-h-screen">
      <DashboardHeader title="My Account" />

      <div className="md:h-[90vh] m-5 md:m-0 flex justify-center items-center relative">
        <div
          className={`md:max-w-5xl w-full p-10 rounded-2xl border space-y-10 transition ${currentStyle.container}`}
        >
          <div className="flex flex-col items-center gap-4 relative">
            {user?.image ? (
              <img
                src={user?.image}
                alt="Landlord"
                className={`w-24 h-24 rounded-full object-cover border-4 ${currentStyle.avatar}`}
              />
            ) : (
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-semibold border-4 ${currentStyle.avatar}`}
              >
                {user?.firstName?.charAt(0)}
              </div>
            )}

            {currentStyle.badge}

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              <Camera size={16} />
              Change Profile Picture
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-semibold text-slate-800">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="text-slate-600 flex items-center justify-center gap-2">
                <Mail size={16} className="text-slate-400" />
                {user?.email}
              </p>

              <p className="text-slate-600 flex items-center justify-center gap-2">
                <Phone size={16} className="text-slate-400" />
                {user?.phone}
              </p>

              <p className="text-slate-500 flex items-center justify-center gap-2 text-sm">
                <Calendar size={16} className="text-slate-400" />
                Account Created: {formattedDate}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-600">
                  <CreditCard size={18} />
                  <h3 className="font-semibold">Subscription</h3>
                </div>

                <p className="text-sm mt-3">
                  Plan: <span className="font-medium">{plan}</span>
                </p>

                <p className="text-sm">
                  Status:{" "}
                  <span className="text-green-600 font-medium">
                    {user?.subscription?.status}
                  </span>
                </p>

                <p className="text-sm">
                  End Date:{" "}
                  <span className="text-green-600 font-medium">
                    {user?.subscription?.plan === "BASIC"
                      ? "Lifetime (BASIC Plan)"
                      : user?.subscription?.endDate
                      ? new Date(
                          user.subscription.endDate
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate("/landlord/subscription")}
                className={`mt-6 w-full py-2 rounded-md text-sm transition ${currentStyle.button}`}
              >
                {plan === "PREMIUM"
                  ? "Manage Plan"
                  : plan === "PRO"
                  ? "Upgrade to Premium"
                  : "Upgrade Plan"}
              </button>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp size={18} />
                <h3 className="font-semibold">Total Collected</h3>
              </div>

              <p className="text-2xl font-bold mt-4">
                ₹{totalCollected.toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-gray-500">
                Total rent collected from tenants
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Landmark size={18} />
                  <h3 className="font-semibold">Total Payout</h3>
                </div>

                <p className="text-2xl font-bold mt-4">
                  ₹{totalPayout.toLocaleString("en-IN")}
                </p>

                <p className="text-xs text-gray-500">
                  Amount transferred to your bank
                </p>
              </div>

              <button
                onClick={() => alert("Feature under development")}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-xl">
              <h3 className="text-lg font-semibold">
                Update Profile Picture
              </h3>

              <input
                type="text"
                placeholder="Paste image URL here..."
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm border rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={handleImageSave}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;