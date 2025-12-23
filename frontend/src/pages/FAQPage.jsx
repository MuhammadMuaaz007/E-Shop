import React, { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiTruck,
  FiCreditCard,
  FiPackage,
  FiHeadphones,
} from "react-icons/fi";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("Shipping");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const categories = [
    { name: "Shipping", icon: <FiTruck /> },
    { name: "Payments", icon: <FiCreditCard /> },
    { name: "Orders", icon: <FiPackage /> },
    { name: "Support", icon: <FiHeadphones /> },
  ];

  const allFaqs = {
    Shipping: [
      {
        question: "How long does shipping take?",
        answer:
          "Shipping usually takes 3–5 business days depending on your location and courier availability.",
      },
      {
        question: "Do you offer free delivery?",
        answer:
          "Yes! Free delivery is available on orders above Rs 2000 nationwide.",
      },
    ],
    Payments: [
      {
        question: "Which payment methods are accepted?",
        answer:
          "You can pay using Cash on Delivery (COD), debit/credit cards, Easypaisa, and JazzCash.",
      },
      {
        question: "Is online payment secure?",
        answer:
          "Yes, we use 256-bit encrypted SSL payment gateways to keep your information safe.",
      },
    ],
    Orders: [
      {
        question: "How can I track my order?",
        answer:
          "Once shipped, we send your tracking code via SMS and email so you can track it anytime.",
      },
      {
        question: "Can I cancel an order?",
        answer:
          "Orders can be cancelled before they are shipped. Once shipped, cancellation is not possible.",
      },
    ],
    Support: [
      {
        question: "How can I contact customer support?",
        answer:
          "You can contact us at support@example.com or call our helpline at 0300-1234567.",
      },
      {
        question: "What are your support hours?",
        answer: "Our support is available 9 AM – 11 PM, Monday to Sunday.",
      },
    ],
  };

  const faqs = allFaqs[activeCategory].filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header activeHeading={5} />

      {/* HERO SECTION */}
      <div className="flex justify-center mt-16 px-4">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-center text-white max-w-4xl w-full relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-3 left-3 w-20 h-20 bg-white opacity-10 rounded-full blur-2xl" />
          <div className="absolute bottom-3 right-3 w-28 h-28 bg-white opacity-10 rounded-full blur-3xl" />

          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
            How Can We Help You?
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg opacity-90">
            Find quick answers to the most common questions.
          </p>

          {/* SEARCH INPUT */}
          <div className="mt-6">
            <div className="bg-white rounded-xl flex items-center px-4 py-2 sm:py-3 shadow-lg">
              <FiSearch className="text-gray-600 text-xl sm:text-2xl mr-3" />
              <input
                type="text"
                placeholder="Search your question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-lg"
              />
              <button className="bg-indigo-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-indigo-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="max-w-4xl mx-auto px-5 mt-10 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setActiveCategory(cat.name);
              setOpenIndex(null);
            }}
            className={`flex items-center gap-2 px-6 py-2 rounded-full border shadow-sm transition 
              ${
                activeCategory === cat.name
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto px-5 py-12">
        {faqs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No results found for "{search}"
          </p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 transition"
              >
                {/* Question */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <FiChevronUp className="text-2xl text-indigo-600" />
                  ) : (
                    <FiChevronDown className="text-2xl text-gray-500" />
                  )}
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;
