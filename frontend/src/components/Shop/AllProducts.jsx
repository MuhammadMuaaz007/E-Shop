import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/Layout/Loader";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : products && products.length > 0 ? (
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">#</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Product ID
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Price (USD)
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Sold
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3 font-mono text-sm break-all">
                  {product._id}
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  {product.images?.[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span
                    className="truncate max-w-[200px]"
                    title={product.name}
                  >
                    {product.name}
                  </span>
                </td>

                <td className="px-4 py-3">${product.discountPrice}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.sold_out}</td>

                <td className="px-4 py-3 flex justify-center gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  >
                    Preview
                  </Link>
                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-10 text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default AllProducts;
