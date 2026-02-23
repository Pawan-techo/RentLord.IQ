import { CreditCard } from "lucide-react";

const TenantRentPayment = ({
  tenantName = "Pawan Bhuyar",
  rentAmount = 8000,
  unitName = "A-102",
  propertyName = "GreenView Residency",
}) => {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
    const options = {
      key: "rzp_test_XXXXXXXXXX",
      amount: rentAmount * 100,
      currency: "INR",
      name: "Rent Payment",
      description: `Rent for ${unitName}`,
      image: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
      handler: function (response) {
        console.log("Payment Success:", response);

        alert("Payment successful 🎉");
      },
      prefill: {
        name: tenantName,
        email: "tenant@email.com",
        contact: "9999999999",
      },
      notes: {
        unit: unitName,
        property: propertyName,
      },
      theme: {
        color: "#4f46e5",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-emerald-600">
        <CreditCard className="w-5 h-5" />
        <span className="text-sm font-medium">Rent Payment</span>
      </div>

      {/* Rent Details */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">
          ₹{rentAmount}
        </h2>
        <p className="text-sm text-slate-500">
          {unitName}, {propertyName}
        </p>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        className="w-full mt-4 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
      >
        Pay Rent via Razorpay
      </button>

      {/* Footer Info */}
      <p className="text-xs text-slate-400 text-center">
        Secure payment powered by Razorpay
      </p>
    </div>
  );
};

export default TenantRentPayment;
