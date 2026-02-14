import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersSeller } from "../../redux/actions/order";
// import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const dispatch = useDispatch();

  const { orders = [], isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersSeller(seller._id));
    }
  }, [dispatch, seller?._id]);

  const deliveredOrders = useMemo(() => {
    return orders.filter((order) => order.status === "Delivered");
  }, [orders]);

  const totalEarnings = useMemo(() => {
    return deliveredOrders.reduce(
      (acc, order) => acc + Number(order.totalPrice || 0),
      0,
    );
  }, [deliveredOrders]);

  const serviceCharge = totalEarnings * 0.1;
  const availableBalance = Math.max(totalEarnings - serviceCharge, 0).toFixed(
    2,
  );

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] font-semibold">
          Available Balance:{" "}
          <span className="text-green-600">${availableBalance}</span>
        </h5>

        {isLoading ? (
          <p className="mt-4 text-gray-500">Loading earnings...</p>
        ) : (
          <button
            disabled={Number(availableBalance) === 0}
            className="
    mt-5 h-[45px] px-6
    bg-black text-white text-lg font-large
    rounded-lg
    transition-all duration-200
    hover:bg-zinc-800 active:scale-[0.98]
    disabled:bg-zinc-300 disabled:text-zinc-500
    disabled:cursor-not-allowed
  "
          >
            Withdraw
          </button>
        )}
      </div>
    </div>
  );
};

export default WithdrawMoney;
