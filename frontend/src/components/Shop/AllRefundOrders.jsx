import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersSeller } from "../../redux/actions/order";
import { Link } from "react-router-dom";
import Loader from "../../components/Layout/Loader";

const AllRefundOrders = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersSeller(seller._id));
    }
  }, [dispatch, seller]);

  // helper to calculate total items
  const getTotalItems = (cart) => {
    return cart?.reduce((sum, item) => sum + (item.qty || 1), 0);
  };
  const refundOrders = orders?.filter(
    (item) => item.status === "Processing refund" || item.status === "Refund Success",
  );

  return (
    <div className="overflow-x-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : refundOrders && refundOrders.length > 0 ? (
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                #
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Customer
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-medium">
                Total Items
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Total Price
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Status
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Paid At
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {refundOrders.map((order, index) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3 font-mono text-sm break-all">
                  {order._id}
                </td>

                <td className="px-4 py-3">{order.user?.name || "N/A"}</td>

                <td className="px-4 py-3 text-center font-medium">
                  {getTotalItems(order.cart)}
                </td>

                <td className="px-4 py-3">${order.totalPrice?.toFixed(2)}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing Refund"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {order.paidAt
                    ? new Date(order.paidAt).toLocaleDateString()
                    : "Not Paid"}
                </td>

                <td className="px-4 py-3 flex justify-center">
                  <Link
                    to={`/order/${order._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  >
                    Preview
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-10 text-gray-500">No Refund orders found</p>
      )}
    </div>
  );
};

export default AllRefundOrders;
