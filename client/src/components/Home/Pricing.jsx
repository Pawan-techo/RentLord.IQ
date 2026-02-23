import React, { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
const plans = [
  {
    name: "Basic",
    monthly: 0,
    yearly: 0 ,
    isFree: true,
    features: ["Add up to 5 properties", "Tenant tracking", "Manual rent collection"],
    popular: false,
    link:"/register/landlord"
  },
  {
    name: "Pro",
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
    name: "Premium",
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

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
const navigate = useNavigate(); 
  return (
    <section className="py-20 pt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          Choose the Plan That Fits You
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Simple, transparent pricing for property owners and managers.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center items-center gap-4 bg-white inline-flex rounded-full p-1 shadow-md">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              billing === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              billing === "yearly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="mt-12 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white border rounded-3xl shadow-lg p-8 flex flex-col overflow-hidden group transition transform duration-500 hover:scale-105 hover:shadow-2xl ${
              plan.popular ? "border-indigo-600 scale-105" : "border-gray-200"
            }`}
          >
            {/* Shining line */}
            <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 transition-transform duration-700 group-hover:translate-x-[300%] pointer-events-none"></span>

            {plan.popular && (
              <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              ₹{billing === "monthly" ? plan.monthly : Math.round(plan.yearly)}
              <span className="text-base font-medium text-gray-500">
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
            onClick={()=>navigate(plan.link)}
            className="mt-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition text-sm md:text-base cursor-pointer">
              {plan.isFree ? "Start Free" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
