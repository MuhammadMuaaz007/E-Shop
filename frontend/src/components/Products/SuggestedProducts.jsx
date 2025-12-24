import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const SuggestedProducts = ({ data, allProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (allProducts && data) {
      let filtered = allProducts.filter(
        (product) =>
          product.category?.trim().toLowerCase() ===
            data.category?.trim().toLowerCase() &&
          product._id.toString() !== data._id.toString()
      );

      // fallback: if no suggestions in same category, pick any other products
      if (filtered.length === 0) {
        filtered = allProducts.filter(
          (product) => product._id.toString() !== data._id.toString()
        );
      }

      setProducts(filtered.slice(0, 5));

    }
  }, [data, allProducts]);

  if (!products || products.length === 0) return null;

  return (
    <div className={`${styles.section}`}>
      <h2 className={`${styles.heading} text-[25px] font-[500] mb-8 border-b`}>
        Related Products
      </h2>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
        {products.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
