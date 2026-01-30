import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const OrderSuccessPage = () => {
  return (
    <>
      <Header />

      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        {/* Animation */}
        <div className="success-circle">
          <span className="checkmark">✓</span>
        </div>

        <h5 className="text-center mt-6 text-[25px] text-[#000000a1]">
          Your order is successful 😍
        </h5>
      </div>

      <Footer />

      {/* CSS INSIDE SAME FILE */}
      <style>
        {`
          .success-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #22c55e;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pop 0.6s ease-out;
          }

          .checkmark {
            color: white;
            font-size: 70px;
            font-weight: bold;
            animation: draw 0.4s ease-in;
          }

          @keyframes pop {
            0% {
              transform: scale(0);
            }
            80% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes draw {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default OrderSuccessPage;
