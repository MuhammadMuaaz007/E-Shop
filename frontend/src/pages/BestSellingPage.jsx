import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // IMPORTANT: copy before sort (Redux state is immutable)
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

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BestSellingPage;
