import React from "react";
import { ArrowRight } from "lucide-react";
import heroBg from "../../assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-indigo-400 via-blue-600 to-indigo-400">
      
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="RentLordIQ Hero"
          className="w-full h-full object-cover md:block hidden"
        />
        <div
          className="absolute md:inset-0"
          style={{
            background:
              "linear-gradient(to right, rgb(70, 150, 229) 0%, rgb(89, 139, 189) 30%, rgba(150, 200, 212, 0.6) 60%, transparent 100%)",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-stretch gap-8">
        <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Start Managing Your Properties <br />
            Smarter Today
          </h2>

          <p className="mt-5 text-base md:text-lg text-white max-w-xl">
            Join property owners who are saving time, reducing stress, and growing
            faster with a modern rental management system.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start gap-4">
            <button
              onClick={() => navigate("/register/landlord")}
              className="group relative px-8 py-4 rounded-xl bg-white text-indigo-700 font-semibold shadow-xl overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight size={18} />
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent"></span>
            </button>

            <button
              onClick={() => navigate("/book-demo")}
              className="px-8 py-4 rounded-xl border border-white/40 text-white font-medium hover:bg-white/10 transition cursor-pointer"
            >
              Book a Demo
            </button>
          </div>

          <p className="mt-6 text-sm text-indigo-200">
            No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;