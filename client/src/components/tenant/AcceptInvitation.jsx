import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/invitations/accept`,
        { token, password }
      );

      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invitation expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-100">
      <div className="w-full m-8 max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-slate-800">
          Accept Invitation
        </h2>

        <p className="text-center text-slate-500 mt-2 mb-6">
          Create your password to activate your tenant account
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Set Password"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400 mt-6">
          This invitation link is valid for 24 hours.
        </p>
      </div>
    </div>
  );
};

export default AcceptInvitation;
