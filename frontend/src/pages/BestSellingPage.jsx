import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../components/ProductCard/ProductCard";
// import your Loader component
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Copy before sort to avoid mutating Redux state
      const sortedProducts = [...allProducts].sort(
        (a, b) => b.total_sell - a.total_sell
      );
      setData(sortedProducts);
    }
  }, [allProducts]);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />

      {isLoading ? (
        <Loader /> // Show loader while fetching products
      ) : (
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data && data.map((item) => <ProductCard data={item} key={item._id} />)}
          </div>
          {data.length === 0 && (
            <h1 className="text-center text-gray-700 font-bold text-[25px] pb-[100px]">
              No best-selling products found!
            </h1>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BestSellingPage;
