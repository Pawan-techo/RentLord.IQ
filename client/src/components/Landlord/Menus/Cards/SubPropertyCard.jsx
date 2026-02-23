import { Trash2, User, Mail, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInvitationsBySubProperty } from "../../../../state/Invitation/Action";

const SubPropertyCard = ({ subProperty, onDelete, onVacant }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.auth);
  const { invitationsBySubProperty } = useSelector((state) => state.invitation);
  const invitation = invitationsBySubProperty[subProperty._id];

  const isOccupied = subProperty?.status === "OCCUPIED";
  const tenant = subProperty?.currentTenantId;

  useEffect(() => {
    if (!jwt || !subProperty?._id) return;

    dispatch(getInvitationsBySubProperty(subProperty._id, jwt));
  }, [jwt, subProperty?._id]);

  const pendingInvite = invitation && invitation.status === "PENDING";
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");

  const handleVacantSubmit = () => {
    if (!reason.trim()) return;

    onVacant(subProperty._id, reason.trim());
    setShowModal(false);
    setReason("");
  };
  return (
    <>
      <div className="bg-white min-h-[160px] border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-sm hover:scale-102 hover:shadow-md transition">
        <div className="space-y-2 min-w-0">
          <span
            className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
              isOccupied
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-600 border border-red-300"
            }`}
          >
            {isOccupied ? "Occupied" : "Vacant"}
          </span>

          <h3 className="text-base font-semibold text-slate-800">
            {subProperty?.unitName}
          </h3>

          <p className="text-sm text-slate-500">
            Rent: ₹{subProperty?.rentAmount}
          </p>
          {pendingInvite && (
            <p className="text-xs text-orange-600 font-medium">
              Invitation Pending ({invitation.email})
            </p>
          )}

          {isOccupied && tenant && (
            <div className="mt-2 text-sm text-slate-600 space-y-1 max-w-[250px]">
              <div className="flex items-center gap-2">
                <User size={14} />
                <span className="font-medium">
                  {tenant.firstName} {tenant.lastName}
                </span>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p className="flex items-center gap-1">
                  <Mail size={16} />
                  {tenant.email}
                </p>
                <p className="flex items-center gap-1">
                  <PhoneCall size={16} />
                  {tenant.phone}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:items-start">
          {!isOccupied && (
            <>
              <button
                onClick={() =>
                  navigate(
                    `/landlord/invite-tenant?subPropertyId=${subProperty._id}`,
                  )
                }
                className="text-sm px-3 py-1.5 border border-green-500 rounded-lg text-green-600 hover:bg-green-100 transition whitespace-nowrap"
              >
                Invite Tenant
              </button>

              <button
                onClick={() => onDelete(subProperty._id)}
                className="text-sm px-3 py-1.5 border border-red-500 rounded-lg text-red-600 hover:bg-red-100 transition flex items-center gap-1 whitespace-nowrap"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </>
          )}

          {isOccupied && (
            <>
              <button
                onClick={() =>
                  navigate(
                    `/landlord/tenant-details/${subProperty.currentTenantId._id}`,
                  )
                }
                className="text-sm px-3 py-1.5 border border-indigo-500 rounded-lg text-indigo-600 hover:bg-indigo-100 transition whitespace-nowrap"
              >
                View Details
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="text-sm px-3 py-1.5 border border-orange-500 rounded-lg text-orange-600 hover:bg-orange-100 transition whitespace-nowrap"
              >
                Vacant
              </button>
            </>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-[320px] rounded-xl p-5 shadow-lg">
            <h2 className="text-sm font-semibold mb-3 text-slate-800">
              Reason for leaving
            </h2>

            <input
              type="text"
              value={reason}
              maxLength={50}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Max 50 characters"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <p className="text-xs text-slate-400 mt-1">
              {reason.length}/50 characters
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-xs px-3 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                disabled={!reason.trim()}
                onClick={handleVacantSubmit}
                className="text-xs px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubPropertyCard;
