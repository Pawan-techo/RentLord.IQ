import React, { useState, useEffect } from "react";
import { Star, User } from "lucide-react";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Property Owner",
    gender: "male",
    rating: 5,
    quote:
      "Easy Move has completely transformed how I manage my rental properties. Automated rent collection is a game-changer!",
  },
  {
    name: "Priya Verma",
    role: "Tenant Manager",
    gender: "female",
    rating: 4,
    quote:
      "Tracking tenants and maintenance requests has never been easier. The dashboard is intuitive and saves me hours every week.",
  },
  {
    name: "Ankit Joshi",
    role: "Real Estate Investor",
    gender: "male",
    rating: 5,
    quote:
      "I love the analytics and property insights. I can make better decisions quickly and efficiently.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 pt-10 px-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          What Our Users Say
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Trusted by property owners and managers to simplify their workflow.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto mt-12">
        {/* Testimonial Cards */}
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ease-in-out transform ${
              index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 absolute top-0 left-0 w-full"
            } bg-white p-8 rounded-2xl border border-gray-200 shadow-md`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full mb-4 ${
                  t.gender === "male"
                    ? "bg-blue-200 text-blue-700"
                    : "bg-pink-200 text-pink-700"
                }`}
              >
                <User size={40} />
              </div>

              <p className="text-gray-700 text-base md:text-lg mb-4">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < t.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <h4 className="font-semibold text-gray-900">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-indigo-600 scale-125"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
