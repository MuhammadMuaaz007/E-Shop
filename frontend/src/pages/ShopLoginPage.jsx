import { useSelector } from "react-redux";
import ShopLogin from "../components/Shop/ShopLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ShopLoginPage = () => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller == true) {
      navigate(`/dashboard`); // replace ensures the login URL is
    }
  }, [isSeller, isLoading, navigate]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
