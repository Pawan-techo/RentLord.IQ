import React from "react";
import { Home, Users, CreditCard, Wrench } from "lucide-react";
import { useRevealOnScroll } from "./useRevealOnScroll";

const features = [
  {
    icon: Home,
    title: "Property Management",
    desc: "Manage multiple properties, rooms, and units from one unified dashboard.",
  },
  {
    icon: Users,
    title: "Tenant Management",
    desc: "Track tenants, lease periods, documents, and communication easily.",
  },
  {
    icon: CreditCard,
    title: "Automated Rent Collection",
    desc: "Collect rent online, track payments, and send reminders automatically.",
  },
  {
    icon: Wrench,
    title: "Maintenance Requests",
    desc: "Tenants raise issues, landlords track and resolve them faster.",
  },
];

// Individual feature card with scroll reveal animation
const FeatureCard = ({ feature, index }) => {
  const { ref, visible } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className={`
        group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm
        transition-all duration-700 ease-out
        hover:shadow-lg hover:-translate-y-1
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className="flex items-center justify-center h-12 w-12 rounded-xl
                   bg-indigo-100 text-indigo-700
                   group-hover:bg-indigo-700 group-hover:text-white transition"
      >
        <feature.icon size={22} />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-gray-900">
        {feature.title}
      </h3>

      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
        {feature.desc}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-8 pt-30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
            Everything You Need
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Powerful Features Built for Landlords
          </h2>

          <p className="mt-4 text-gray-600">
            RentLordIQ gives you complete control over your properties with smart automation.
          </p>
        </div>

        {/* Render feature cards dynamically */}
        <div className="mt-16 grid gap-4 lg:gap-8 grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;