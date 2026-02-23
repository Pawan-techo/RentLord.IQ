import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../../assets/logo.png";

const faqs = [
  {
    question: "How does RentLordIQ automate rent collection?",
    answer:
      "RentLordIQ allows you to set up recurring payments for tenants. You get instant notifications when payments are received, and receipts are generated automatically.",
  },
  {
    question: "Can I manage multiple properties?",
    answer:
      "Yes! You can add unlimited properties and units. Each property can have its own tenants, rent schedule, and maintenance tracking.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support bank transfers, credit/debit cards, and UPI payments. All transactions are secure and encrypted.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Absolutely! You can try RentLordIQ free for 14 days with full access to all features before deciding to subscribe.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle FAQ accordion state
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 pt-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-gray-600 max-w-md text-sm md:text-base">
            Answers to the most common questions from our users.
          </p>

          <div className="w-[400px] m-5 object-cover">
            <img
              src={logo}
              className="hidden md:block scale-150"
              alt="RentLordIQ Logo"
            />
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-4 border border-gray-200 cursor-pointer transition"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-900 font-semibold text-lg md:text-xl">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`text-indigo-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    size={20}
                  />
                </div>

                <div
                  className="overflow-hidden transition-all duration-300 mt-4"
                  style={{ maxHeight: isOpen ? "200px" : "0px" }}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;