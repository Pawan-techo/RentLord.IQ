import React, { useEffect, useRef, useState } from "react";
import { Home, UserPlus, Building2, CreditCard } from "lucide-react";
import img1 from "../../assets/properties.png";
import img2 from "../../assets/subproperties.png";
import img3 from "../../assets/invitetenant.png";
import img4 from "../../assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    icon: Home,
    image: img1,
    title: "Add Your Properties",
    desc: "Start by adding your properties to the system. Organize them by location and type, and keep everything structured in one powerful dashboard. Track occupancy, performance, and growth from a single place.",
    side: "left",
  },
  {
    icon: Building2,
    image: img2,
    title: "Create Sub-Properties (Units)",
    desc: "Divide each property into sub-units like apartments, rooms, or commercial spaces. Manage availability, assign tenants, and monitor individual unit performance with complete control.",
    side: "right",
  },
  {
    icon: UserPlus,
    image: img3,
    title: "Invite Tenants (New or Existing)",
    desc: "Invite tenants via secure email links. Existing users can instantly accept invitations, while new tenants can create accounts. Everything is verified and managed with secure token-based invitations.",
    side: "left",
  },
  {
    icon: CreditCard,
    image: img4,
    title: "Automated Rent & Dues",
    desc: "Tenants pay rent online and receive instant confirmation. Generate monthly dues automatically, track payment history, and get notified of late payments without manual follow-ups.",
    side: "right",
  },
];

const STEP_SCROLL = 300;

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const StepCard = ({ step, index, activeIndex }) => {
  const isActive = index === activeIndex;
  const isVisible = index <= activeIndex;
  const navigate = useNavigate();
  const x = !isVisible ? (step.side === "left" ? -300 : 300) : 0;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-4"
      style={{
        transform: `translateX(${x}px)`,
        opacity: isActive ? 1 : 0,
        transition: "transform 0.4s ease, opacity 0.3s ease",
        zIndex: index + 1,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6 md:p-10 max-w-5xl w-full md:min-h-[500px]">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center mt-10">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-60 md:h-72 object-fit rounded-2xl border border-gray-200 hover:scale-110"
          />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <step.icon size={18} />
              </div>
              <span className="text-xs md:text-sm font-semibold text-indigo-600 uppercase">
                Step {index + 1}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-lg mb-6">{step.desc}</p>

            <button
              onClick={()=>navigate("/book-demo")}
              className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition text-sm md:text-base"
            >
              Book Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const top = sectionRef.current.offsetTop;
      const y = window.scrollY - top;

      const index = clamp(Math.floor(y / STEP_SCROLL), 0, steps.length - 1);

      setActiveIndex(index);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: `calc(100vh + ${STEP_SCROLL * steps.length - 80}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          Simple. Powerful. Automated.
        </h2>
        <p className="mt-3 md:mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Built like a real SaaS workflow — not a static website.
        </p>
      </div>

      <div className="sticky top-24 md:top-35 h-[760px] md:h-[560px] overflow-hidden px-4">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            step={step}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
