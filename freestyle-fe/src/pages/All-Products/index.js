import React, { useEffect, useState } from "react";
import styles from "../../styles/productCard.module.css";
import Image from "next/image";
import ProductDisplay from "../ProductDisplay/[productID]";
import Router, { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addCartList, addWishList } from "@/redux/reducerSlices/productSlice";
import axios from "axios";
import PaginationRounded from "@/components/pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps() {
  const res = await axios("http://localhost:3006/all-products");

  const productList = await res.data.productDetails;
  return { props: { productList } };
}

function Men(productList) {
  // const [productList, setProductList] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(null);
  const [products, setProducts] = useState([]); // Fetched products
  useEffect(() => {
    if (productList) {
      const totalProducts = productList.productList;
      const productsPerPage = 8; // Change this number based on your desired products per page
      const calculatedTotalPages = Math.ceil(totalProducts / productsPerPage);
      setTotalPages(calculatedTotalPages);
    }
  }, [productList.productList]);
  console.log(totalPages);

  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 4;

  // const onPageChange = (page) => {
  //   setCurrentPage(page);
  // };
  const [isWishlist, setIsWishlist] = useState(false);

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevents onClick event from propagating to the parent container
    setIsWishlist(!isWishlist);
    // Perform wishlist related operations here (add to wishlist, remove from wishlist, etc.)
  };

  const wishList = useSelector((state) => state.product); // Assuming this is your wishlist state from Redux

  // Function to check if an item is in the wishlist
  const isInWishlist = (productId) => {
    return wishList.wishList.some((item) => item._id === productId);
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
      <h1>BROWSE ALL PRODUCTS</h1>
      {products?.length > 0 ? (
        <div className="flex items-center justify-center my-10 ">
          <div className="grid grid-cols-4 gap-6 w-10/12">
            {products.map((item) => {
              const isItemInWishlist = isInWishlist(item._id);
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
                        isItemInWishlist ? "text-red-600" : "text-white"
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
        <PaginationRounded totalPages={totalPages} setProducts={setProducts} />
      </ThemeProvider>{" "}
    </div>
  );
}

export default Men;
