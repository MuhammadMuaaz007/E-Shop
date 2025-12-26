import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { getAllProductsShop } from "../../redux/actions/product";
import Loader from "../../components/Layout/Loader";

const AllCoupons = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editCouponId, setEditCouponId] = useState("");
  const [couponLoading, setCouponLoading] = useState(true);

  const [coupons, setCoupons] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  /* ================= FETCH COUPONS ================= */
  useEffect(() => {
    if (!seller?._id) return;

    setCouponLoading(true);

    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCoupons(res.data.couponCodes);
        setCouponLoading(false);
      })
      .catch(() => setCouponLoading(false));
  }, [seller]);

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProduct: selectedProducts,
          shop: seller,
        },
        { withCredentials: true }
      );

      toast.success("Coupon created successfully");
      setCoupons((prev) => [...prev, res.data.couponCode]);
      setOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  /* ================= EDIT ================= */
  const editHandler = (coupon) => {
    setEditCouponId(coupon._id);
    setName(coupon.name);
    setValue(coupon.value);
    setMinAmount(coupon.minAmount);
    setMaxAmount(coupon.maxAmount);
    setSelectedProducts(coupon.selectedProduct);
    setEditOpen(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${server}/coupon/update-coupon/${editCouponId}`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProduct: selectedProducts,
        },
        { withCredentials: true }
      );

      toast.success("Coupon updated successfully");
      setCoupons((prev) =>
        prev.map((c) => (c._id === editCouponId ? res.data.coupon : c))
      );
      setEditOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  /* ================= DELETE ================= */
  const deleteHandler = (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Coupon deleted successfully");
        setCoupons((prev) => prev.filter((c) => c._id !== id));
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const resetForm = () => {
    setName("");
    setValue("");
    setMinAmount("");
    setMaxAmount("");
    setSelectedProducts("");
    setEditCouponId("");
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700 hidden md:block">
          All Coupons
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Create Coupon
        </button>
      </div>

      {couponLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader />
        </div>
      ) : coupons.length > 0 ? (
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Coupon ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Min</th>
              <th className="px-4 py-2">Max</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, i) => (
              <tr key={coupon._id}>
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{coupon._id}</td>
                <td className="px-4 py-3">{coupon.name}</td>
                <td className="px-4 py-3">{coupon.value}</td>
                <td className="px-4 py-3">{coupon.minAmount}</td>
                <td className="px-4 py-3">{coupon.maxAmount}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => editHandler(coupon)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHandler(coupon._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-10 text-gray-500">No coupons found</p>
      )}

      {(open || editOpen) && (
        <div className="fixed inset-0 bg-black/60 z-[20000] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-md p-6 relative">
            <RxCross1
              size={28}
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => {
                setOpen(false);
                setEditOpen(false);
                resetForm();
              }}
            />

            <h3 className="text-2xl font-semibold text-center mb-6">
              {editOpen ? "Edit Coupon Code" : "Create Coupon Code"}
            </h3>

            <form
              className="flex flex-col gap-4"
              onSubmit={editOpen ? handleSubmitEdit : handleSubmit}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Coupon Name"
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Discount"
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Min Amount"
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Max Amount"
                className="border px-3 py-2 rounded"
              />
              <select
                value={selectedProducts}
                onChange={(e) => setSelectedProducts(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="">Choose product</option>
                {products?.map((p) => (
                  <option key={p._id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              <button className="bg-blue-600 text-white py-2 rounded">
                {editOpen ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoupons;
