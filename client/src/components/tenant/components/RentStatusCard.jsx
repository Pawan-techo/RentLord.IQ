const RentStatusCard = ({ activeDue, lastPaidRent, onPayRent }) => {
  const isPaidThisMonth =
    lastPaidRent &&
    lastPaidRent.rentMonth ===
      `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-56 md:h-55 border border-gray-200 justify-between">
      <div className="text-emerald-600 font-medium flex items-center gap-2">
        Rent Status
      </div>
      {isPaidThisMonth ? (
        <>
          <div>
            <h2 className="text-xl font-semibold text-green-600">
              Rent Paid 🎉
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Paid for {lastPaidRent.rentMonth}
            </p>
          </div>

          <p className="text-sm text-gray-400">
            Next rent due on{" "}
            {new Date(activeDue?.dueDate).toLocaleDateString("en-GB")}
          </p>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              ₹{activeDue?.amount}
            </h2>
            <p className="text-sm text-slate-500">
              Due in{" "}
              <span className="font-medium text-red-500">
                {Math.ceil(
                  (new Date(activeDue?.dueDate) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </span>
            </p>
          </div>

          <button
            onClick={onPayRent}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Pay Rent Now
          </button>
        </>
      )}
    </div>
  );
};
export default RentStatusCard