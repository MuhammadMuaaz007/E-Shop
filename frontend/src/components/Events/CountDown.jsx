import { useEffect, useState } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2025-11-30") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className="flex gap-3 justify-center md:justify-start">
      {Object.keys(timeLeft).length ? (
        <>
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="bg-white shadow-md  rounded-lg px-4 py-2 text-center"
            >
              <p className="text-xl font-bold text-purple-600">{value}</p>
              <p className="text-sm text-gray-500 capitalize">{label}</p>
            </div>
          ))}
        </>
      ) : (
        <span className="text-red-500 font-semibold">Time’s up! You are late.</span>
      )}
    </div>
  );
};

export default CountDown;
