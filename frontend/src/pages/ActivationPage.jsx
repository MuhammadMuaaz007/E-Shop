import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const activateEmail = async () => {
      if (!activation_token) {
        setError(true);
        setErrorMessage("Invalid activation link.");
        setLoading(false);
        return;
      }

      try {
        const decodedToken = decodeURIComponent(activation_token);

        const res = await axios.post(`${server}/user/activate`, {
          activationToken: decodedToken,
        });

        setSuccessMessage(
          res.data.message || "Your account has been activated successfully!"
        );
      } catch (err) {
        setError(true);
        const message =
          err.response?.data?.message || "Activation failed. Please try again.";
        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    };

    activateEmail();
  }, [activation_token]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="text-center p-6 rounded-xl bg-white shadow-md max-w-lg w-full">
        {loading ? (
          <p className="text-xl font-medium text-gray-700 animate-pulse">
            Activating your account...
          </p>
        ) : error ? (
          <p className="text-2xl font-semibold text-red-600">{errorMessage}</p>
        ) : (
          <p className="text-2xl font-semibold text-green-600">
            {successMessage}
          </p>
        )}
      </div>
      {error ? (
        <button
          onClick={() => navigate("/sign-up")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition duration-300 w-full max-w-sm text-center"
        >
          Go to Sign up
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition duration-300 w-full max-w-sm text-center"
        >
          Go to Sign In
        </button>
      )}
    </div>
  );
};

export default ActivationPage;
