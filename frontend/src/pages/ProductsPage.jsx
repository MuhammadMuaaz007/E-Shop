import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useEffect, useState } from "react";
import styles from "../styles/styles";
import ProductCard from "../components/ProductCard/ProductCard";
// import your Loader component
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import Loader from "../components/Layout/Loader";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // Get products and isLoading from Redux
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const allProd = allProducts ? [...allProducts] : [];

    if (categoryData === null) {
      const d = allProd && allProd.sort((a, b) => a.sold_out - b.sold_out); // Lowest sales to highest sales
      setData(d);
    } else {
      const d = allProd && allProd.filter((i) => i.category === categoryData);
      setData(d);
    }

    window.scrollTo(0, 0);
  }, [allProducts, categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />

      {isLoading ? (
        <Loader /> // Show loader while fetching products
      ) : (
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>

          {data && data.length === 0 && (
            <h1 className="text-center text-gray-700 font-bold text-[25px] pb-[100px]">
              Sorry! No products found!
            </h1>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsPage;
