import React, { useState, useEffect } from "react";
import Hero from "../components/Home/Hero.jsx";
import FeaturesSection from "../components/Home/FeaturesSection.jsx";
import HowItWorks from "../components/Home/HowItWorks.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import Pricing from "../components/Home/Pricing.jsx";
import FAQ from "../components/Home/FAQ.jsx";
import FinalCTA from "../components/Home/FinalCTA.jsx";
import Footer from "../components/Home/Footer.jsx";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 const location = useLocation();

  useEffect(() => {
  if (location.state?.scrollTo) {
    const section = document.getElementById(location.state.scrollTo);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    window.history.replaceState({}, document.title);
  }
}, [location]);
  
  return (
    <div className="bg-gradient-to-r from-sky-200 via-white to-rose-200">
      <section id="hero">
         <Hero scrollY={scrollY} />
      </section>
     <section id="features">
      <FeaturesSection/>
     </section>
      <section id="solutions">
        <HowItWorks />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="resources">
        <Testimonials />
      </section>
        <FAQ />
       <section id="finalcta">
      <FinalCTA/>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
