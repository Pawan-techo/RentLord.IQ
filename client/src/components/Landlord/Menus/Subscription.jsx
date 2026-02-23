import React, { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSubscription } from "../../../state/Auth/Action";

const plans = [
  {
    name: "BASIC",
    monthly: 0,
    yearly: 0,
    isFree: true,
    features: [
      "Add up to 5 properties",
      "Tenant tracking",
      "Manual rent collection",
    ],
    popular: false,
  },
  {
    name: "PRO",
    monthly: 999,
    yearly: 999 * 12 * 0.9,
    features: [
      "Unlimited properties",
      "Automated rent collection",
      "Maintenance management",
      "Reports & Analytics",
    ],
    popular: true,
  },
  {
    name: "PREMIUM",
    monthly: 1999,
    yearly: 1999 * 12 * 0.9,
    features: [
      "All Pro features",
      "Priority support",
      "Team management",
      "Advanced insights",
    ],
    popular: false,
  },
];

const Subscription = () => {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, jwt } = useSelector((state) => state.auth);

  const handlePlanSelect = (plan) => {
    if (plan.isFree) {
      navigate(plan.link);
      return;
    }
    setSelectedPlan(plan);
  };

  // Update subscription after successful payment
  const handlePaymentSuccess = () => {
    dispatch(
      updateSubscription(
        {
          plan: selectedPlan.name,
          billingCycle: billing,
        },
        jwt
      )
    );

    setSelectedPlan(null);
  };

  return (
    <section className="py-20 pt-10 relative">
      <div className="md:ml-10 ml-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-indigo-600 shadow-md rounded-md px-3 py-1.5 hover:text-white font-medium mb-4"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          Choose the Plan That Fits You
        </h2>

        {/* Billing cycle toggle */}
        <div className="mt-8 flex justify-center items-center gap-4 bg-white inline-flex rounded-full p-1 shadow-md">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              billing === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              billing === "yearly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="mt-12 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {plans.map((plan, index) => {
          const isActive = user?.subscription?.plan === plan.name;

          return (
            <div
              key={index}
              className={`relative bg-white border rounded-3xl shadow-lg p-8 flex flex-col transition transform duration-300 hover:scale-105 ${
                isActive
                  ? "border-green-500 ring-2 ring-green-400"
                  : plan.popular
                  ? "border-indigo-600"
                  : "border-gray-200"
              }`}
            >
              {isActive && (
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Active Plan
                </span>
              )}

              {plan.popular && !isActive && (
                <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {plan.name}
              </h3>

              <p className="text-3xl font-bold text-gray-900 mb-6">
                ₹
                {billing === "monthly"
                  ? plan.monthly
                  : Math.round(plan.yearly)}
                <span className="text-base text-gray-500">
                  /{billing === "monthly" ? "mo" : "yr"}
                </span>
              </p>

              <ul className="mb-6 space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <Check size={18} className="text-indigo-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled={isActive}
                onClick={() => handlePlanSelect(plan)}
                className={`mt-auto px-6 py-3 rounded-xl font-medium transition ${
                  isActive
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isActive
                  ? "Current Plan"
                  : plan.isFree
                  ? "Start Free"
                  : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              Complete Payment
            </h3>

            <p className="mb-6 text-gray-600">
              You are upgrading to <strong>{selectedPlan.name}</strong> ({billing})
            </p>

            <button
              onClick={handlePaymentSuccess}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Simulate Payment Success
            </button>

            <button
              onClick={() => setSelectedPlan(null)}
              className="w-full mt-3 text-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Subscription;