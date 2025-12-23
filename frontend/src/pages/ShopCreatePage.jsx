import { useSelector } from "react-redux";
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ShopCreatePage = () => {
  const { isSeller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate("/dashboard"); // replace ensures the login URL is
    }
  }, [isSeller]);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
