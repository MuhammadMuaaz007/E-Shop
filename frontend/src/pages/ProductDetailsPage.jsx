import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import Loader from "../components/Layout/Loader"; // import your Loader component
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);
  const [product, setProduct] = useState(null);

  // Fetch all products from Redux/API
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  // Find the product by ID
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const selectedProduct = allProducts.find((p) => p._id === id);
      setProduct(selectedProduct);
    }
  }, [allProducts, id]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader /> // Show loader while fetching products
      ) : product ? (
        <>
          <ProductDetails data={product} />
          <SuggestedProducts data={product} allProducts={allProducts} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">Product not found!</p>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
