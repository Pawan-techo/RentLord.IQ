import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardHeader from "../../DashboardHeader.jsx";
import {
  inviteExistingTenant,
  inviteTenant,
  resetInvitationState,
} from "../../../../state/Invitation/Action.js";
import { toast } from "react-toastify";

const InviteTenantForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subPropertyId = params.get("subPropertyId");
  const { jwt, user } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.invitation);
  const [isExistingTenant, setIsExistingTenant] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleNewTenantSubmit = (e) => {
    e.preventDefault();

    if (loading || isSubmitted || !subPropertyId) return;

    setIsSubmitted(true);

    dispatch(
      inviteTenant(
        {
          landlordId: user._id,
          subPropertyId,
          ...formData,
        },
        jwt,
      ),
    );
  };

  const handleExistingTenantSubmit = (e) => {
  e.preventDefault();

  if (loading || isSubmitted || !subPropertyId) return;

  setIsSubmitted(true);

  dispatch(
    inviteExistingTenant(
      {
        email: formData.email,
        subPropertyId,
      },
      jwt
    )
  );
};
useEffect(() => {
  if (isExistingTenant) {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
  }
}, [isExistingTenant]);


  useEffect(() => {
    dispatch(resetInvitationState());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { toastId: "invite-error" });
      setIsSubmitted(false);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Invitation sent successfully ✅", {
        toastId: "invite-success",
      });

      dispatch(resetInvitationState());

      setTimeout(() => {
        navigate(-1);
      }, 800);
    }
  }, [success, dispatch, navigate]);

  return (
    <>
      <DashboardHeader title="Invite Tenant" />

      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-indigo-600 shadow-md rounded-md px-3 py-1.5 hover:text-white font-medium mb-4 cursor-pointer"
        >
          ← Back
        </button>

        <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Send Tenant Invitation
          </h2>

          {/* 🔹 Toggle Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsExistingTenant(false)}
              className={`flex-1 py-2 text-sm hover:text-indigo-600 rounded-md transition cursor-pointer ${
                !isExistingTenant
                  ? "bg-white shadow text-indigo-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              New Tenant
            </button>

            <button
              type="button"
              onClick={() => setIsExistingTenant(true)}
              className={`flex-1 py-2 text-sm hover:text-indigo-600 rounded-md transition cursor-pointer ${
                isExistingTenant
                  ? "bg-white shadow text-indigo-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              Existing Tenant
            </button>
          </div>

          {/* 🔹 Form */}
          <form
            onSubmit={
              isExistingTenant
                ? handleExistingTenantSubmit
                : handleNewTenantSubmit
            }
            className="space-y-3"
          >
            {!isExistingTenant && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded border-gray-400"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded border-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded border-gray-400"
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded border-gray-400"
            />

            <button
              type="submit"
              disabled={loading || isSubmitted}
              className={`w-full py-2 rounded text-white ${
                loading || isSubmitted
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading
                ? "Sending..."
                : isExistingTenant
                  ? "Invite Existing Tenant"
                  : "Send Invitation"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InviteTenantForm;
