import { useEffect, useState } from "react";
import AssignedPropertyCard from "./components/AssignedPropertyCard";
import MaintenanceCard from "./components/MaintenanceCard";
import NotificationCard from "./components/NotificationCard";
import RaiseMaintenanceRequest from "./components/RaiseMaintenanceRequest";
import RentStatusCard from "./components/RentStatusCard";
import TenantHeader from "./components/TenantHeader";
import TenantProfile from "./components/TenantProfile";
import TenantQuickActions from "./components/TenantQuickActions";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../state/Notification/Action";
import { getMyLandlord } from "../../state/Auth/Action";
import LandlordInfoCard from "./components/LandlordInfoCard";
import { getTenantMaintenanceRequests } from "../../state/Maintenance/Action";
import { getTenantDues } from "../../state/Due/Action";
import {
  createRentPayment,
  getMyPayments,
  verifyRentPayment,
} from "../../state/Payment/Action";

const TenantDashboard = () => {
  const dispatch = useDispatch();
  const { user, jwt, landlord } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const { tenantRequests } = useSelector((state) => state.maintenance);
  const { dues } = useSelector((state) => state.due);
  const { order, payments } = useSelector((state) => state.payment);
  const [showRaiseMaintanceRequest, setshowRaiseMaintanceRequest] =
    useState(false);

  const lastPaidRent = payments?.length
    ? payments
        .filter((p) => p.purpose === "RENT" && p.status === "SUCCESS")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
    : null;

  const activeDue = dues?.find((d) => d.status === "UNPAID");

  useEffect(() => {
    if (!jwt) return;
    dispatch(getNotifications(jwt));
  }, [jwt]);
  useEffect(() => {
    if (!jwt) return;
    dispatch(getMyPayments(jwt));
  }, [jwt, dispatch]);
  useEffect(() => {
    if (!jwt) return;
    dispatch(getTenantDues(jwt));
    dispatch(getMyLandlord(jwt));
    dispatch(getTenantMaintenanceRequests(jwt));
  }, [jwt]);

  const handlePayRent = () => {
    if (!activeDue) return;

    dispatch(
      createRentPayment({
        userId: user?._id,
        referenceId: activeDue._id,
        amount: activeDue.amount,
        rentMonth: `${activeDue.year}-${String(activeDue.month).padStart(2, "0")}`,
      }),
    );
  };

  useEffect(() => {
    if (!order) return;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "RentLord.AI",
      description: "Monthly Rent Payment",
      order_id: order.orderId,

      handler: function (response) {
        dispatch(
          verifyRentPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        );
      },
      theme: {
        color: "#059669",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }, [order, dispatch]);

  const unreadCount = notifications?.filter((n) => !n.isRead).length;
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <TenantHeader
        tenantName={`${user?.firstName}`}
        unreadNotifications={unreadCount}
        profilePic={user?.image}
      />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            {landlord && landlord?.propertyId ? (
              <AssignedPropertyCard
                unitName={landlord?.unitName}
                propertyName={landlord?.propertyId?.name}
                address={landlord?.propertyId?.address}
                agreementFrom={
                  landlord?.lease?.startDate
                    ? new Date(landlord.lease.startDate).toLocaleDateString(
                        "en-GB",
                      )
                    : "-"
                }
              />
            ) : (
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center text-gray-500">
                No property assigned
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <RentStatusCard
                activeDue={activeDue}
                lastPaidRent={lastPaidRent}
                onPayRent={handlePayRent}
              />

              <MaintenanceCard
                requests={tenantRequests}
                onRaiseRequest={() => setshowRaiseMaintanceRequest(true)}
              />
            </div>

            <TenantQuickActions />
          </div>

          <div className="lg:w-80 flex-shrink-0 space-y-6">
            <TenantProfile />
           {landlord ? ( <LandlordInfoCard
              firstName={landlord?.landlordId?.firstName}
              lastName={landlord?.landlordId?.lastName}
              email={landlord?.landlordId?.email}
              phone={landlord?.landlordId?.phone}
              image={landlord?.landlordId?.image}
            />) :(
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center text-gray-500">
                No property assigned
              </div>
            )}
            
            <NotificationCard notifications={notifications} />

            {showRaiseMaintanceRequest && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="w-full max-w-lg mx-4">
                  <RaiseMaintenanceRequest
                    tenantId={user._id}
                    landlordId={landlord?.landlordId._id}
                    propertyId={landlord?.propertyId._id}
                    subPropertyId={landlord._id}
                    onSuccess={() => setshowRaiseMaintanceRequest(false)}
                    onClose={() => setshowRaiseMaintanceRequest(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;
