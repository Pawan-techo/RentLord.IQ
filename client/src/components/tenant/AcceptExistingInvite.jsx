import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { acceptExistingTenant, resetInvitationState } from "../../state/Invitation/Action";

const AcceptExistingInvite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token = params.get("token");
  const [hasClicked, setHasClicked] = useState(false);

  const { loading, success, error } = useSelector(
    (state) => state.invitation
  );
  useEffect(() => {
    if (!token) {
      toast.error("Invalid invitation link");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (success) {
      toast.success("Invitation accepted successfully 🎉");

      dispatch(resetInvitationState());

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setHasClicked(false);
      dispatch(resetInvitationState());
    }
  }, [error, dispatch]);

  const handleAccept = () => {
    if (!token || loading) return;

    setHasClicked(true);
    dispatch(acceptExistingTenant(token));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">
          Accept Invitation
        </h2>

        <p className="text-gray-600 mb-6">
          You have been invited to join this property.
        </p>

        <button
          onClick={handleAccept}
          disabled={loading || hasClicked}
          className={`w-full py-2 rounded text-white font-medium transition ${
            loading || hasClicked
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Processing..." : "Accept Invitation"}
        </button>
      </div>
    </div>
  );
};

export default AcceptExistingInvite;
