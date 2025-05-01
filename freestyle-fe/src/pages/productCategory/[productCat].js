import React, { useEffect, useState } from "react";
import styles from "../../styles/productCard.module.css";
import Image from "next/image";
import ProductDisplay from "../../pages/ProductDisplay/[productID]";
import Router, { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addCartList, addWishList } from "@/redux/reducerSlices/productSlice";
import axios from "axios";
import PaginationRounded from "@/components/pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from "@mui/icons-material/Favorite";

export async function getServerSideProps(context) {
  console.log(context.query.productCat);
  const cat = context.query.productCat;

  const res = await axios(`http://localhost:3006/countByProductsCat/${cat}`);

  console.log(res.data);
  const productCount = await res.data;
  return { props: { productCount, cat } };
}

function productCat({ productCount, cat }) {
  // const [productList, setProductList] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [mainCat, setMainCat] = useState(cat);
  const [totalPages, setTotalPages] = useState(null);
  const [products, setProducts] = useState([]); // Fetched products
  const [oldCat, setOldCat] = useState(null);
  useEffect(() => {
    if (router.query.productCat !== mainCat) {
      setMainCat(router.query.productCat);
      setOldCat(mainCat);
      setCurrentPage(1); // Reset to page 1 when category changes
    }
  }, [router.query.productCat, mainCat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3006/countByProductsCat/${mainCat}`
        );
        const productCount = res.data;
        if (productCount && mainCat) {
          const totalProducts = productCount;
          const productsPerPage = 8;
          const calculatedTotalPages = Math.ceil(
            totalProducts / productsPerPage
          );
          setTotalPages(calculatedTotalPages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mainCat]);

  console.log(totalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [isWishlist, setIsWishlist] = useState(false);

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevents onClick event from propagating to the parent container
    setIsWishlist(!isWishlist);
    // Perform wishlist related operations here (add to wishlist, remove from wishlist, etc.)
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  function handleRoute(id) {
    router.push(`/ProductDisplay/${id}`);
  }
  function handleCartList(values) {
    console.log(values);

    if (values) {
      dispatch(addCartList(values));
    }
  }

  const theme = createTheme({
    // Define your Material UI theme here
  });

  return (
    <div className=" h-max">
      <h1>{mainCat}</h1>
      <li>hello</li>
      {products?.length > 0 ? (
        <div className="flex items-center justify-center my-10 ">
          <div className="grid grid-cols-4 gap-6 w-10/12">
            {products.map((item) => {
              return (
                <div
                  onClick={() => handleRoute(item._id)}
                  key={item._id}
                  className="   transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg w-11/12 relative"
                >
                  <img
                    className="h-4/6 w-full object-cover object-center"
                    src={
                      "http://localhost:3006/products-image/" +
                      item._id +
                      "?key=" +
                      Math.random()
                      // loading="lazy"
                    }
                    alt="Product Image"
                    onClick={() => handleRoute(item._id)}
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={(e) => {
                        toggleWishlist(e);
                        dispatch(addWishList(item));
                      }}
                      className={`cursor-pointer stroke-current text-2xl ${
                        isWishlist ? "text-red-600" : "text-white"
                      }`}
                    />
                    {/* <FavoriteIcon /> */}
                  </div>

                  <div
                    className="p-4"
                    onClick={() => router.push("/ProductDisplay")}
                  >
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                      {" "}
                      {item.productName}
                    </h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                      {" "}
                      {item.productDesc}
                    </p>
                    <div className="flex items-center">
                      <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {item.productPrice}
                      </p>
                      <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                        Rs. 200000
                      </p>
                      <p className="ml-auto text-base font-medium text-green-500">
                        20% off
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => (e.stopPropagation(), handleCartList(item))}
                    className="text-white text-center"
                  >
                    Add to cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>No Result Found...</h1>
      )}
      <ThemeProvider theme={theme}>
        {/* Other components and routes */}
        <PaginationRounded
          totalPages={totalPages}
          setProducts={setProducts}
          mainCat={mainCat}
          currentPage={currentPage}
          oldCat={oldCat}
        />
      </ThemeProvider>{" "}
    </div>
  );
}

export default productCat;
