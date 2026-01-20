import React from "react";

const CheckoutSteps = ({ active = 1 }) => {
  const activeColor = "bg-[#f63b60]";
  const inactiveColor = "bg-[#FDE1E6]";
  const activeText = "text-white";
  const inactiveText = "text-[#f63b60]";

  const StepButton = ({ text, isActive }) => (
    <div
      className={`px-4 py-2 rounded-full ${
        isActive ? activeColor : inactiveColor
      }`}
    >
      <span
        className={`text-sm font-medium ${isActive ? activeText : inactiveText}`}
      >
        {text}
      </span>
    </div>
  );

  const Line = ({ isActive }) => (
    <div
      className={`w-[30px] md:w-[70px] h-[4px] ${
        isActive ? activeColor : inactiveColor
      }`}
    />
  );

  return (
    <div className="w-full flex justify-center my-6">
      <div className="w-[90%] md:w-[50%] flex items-center justify-center">
        <StepButton text="1. Shipping" isActive={active >= 1} />
        <Line isActive={active > 1} />

        <StepButton text="2. Payment" isActive={active >= 2} />
        <Line isActive={active > 2} />

        <StepButton text="3. Success" isActive={active >= 3} />
      </div>
    </div>
  );
};

export default CheckoutSteps;
