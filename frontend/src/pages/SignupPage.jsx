import React, { useEffect } from "react";
import Signup from "../components/Signup/Signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true }); // replace ensures the login URL is removed from history
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignupPage;
