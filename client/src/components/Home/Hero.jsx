import React, { useEffect, useState } from "react";
import dashboardMockup from "../../assets/dashboard.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroProgress = Math.min(scrollY / 300, 1);
  const heroScale = 1 - heroProgress * 0.15;
  const heroOpacity = 1 - heroProgress * 0.2;

  const dashProgress = Math.min(scrollY / 300, 1);
  const dashTranslate = 50 * (1 - dashProgress);
  const dashOpacity = 0.2 + dashProgress * 0.8;

  return (
    <div className="bottom-0 bg-gradient-to-r from-sky-200 via-white to-rose-200">
      <section
        style={{
          transform: `scale(${heroScale})`,
          opacity: heroOpacity,
          willChange: "transform, opacity",
        }}
        className="sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-6 py-26 md:pt-26 pt-16 pb-0 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
            Smart Property Management Platform
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Manage Rentals.
            <br />
            Automate Rent. Scale Faster.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            RentLordIQ helps landlords manage properties, tenants, rent collection,
            and maintenance from one powerful dashboard.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => navigate("/register/landlord")}
              className="bg-indigo-700 shadow-md flex-none hover:scale-102 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/book-demo")}
              className="border border-indigo-700 flex-none shadow-md hover:text-black hover:scale-102 text-indigo-700 px-8 py-3 rounded-lg font-semibold cursor-pointer"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      <section
        style={{
          transform: `translateY(${dashTranslate}px)`,
          opacity: isMobile ? 1 : dashOpacity,
          willChange: "transform, opacity",
          transition: "opacity 0.2s linear, transform 0.2s linear",
        }}
        className="relative z-10 py-24 md:pt-24 pt-0 pb-0"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <img
            src={dashboardMockup}
            alt="RentLordIQ Dashboard"
            className="w-full max-w-6xl mx-auto rounded-xl md:shadow-xl shadow-lg shadow-indigo-300 border border-indigo-200"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;