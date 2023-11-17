import React, { useEffect, useState } from "react";
import styles from "../../../styles/productCard.module.css";
import Image from "next/image";
import ProductDisplay from "../../ProductDisplay/[productID]";
import Router, { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addCartList } from "@/redux/reducerSlices/productSlice";
import axios from "axios";
import PaginationRounded from "@/components/pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export async function getServerSideProps() {
  const res = await axios("http://localhost:3006/products");

  const productList = await res.data.productDetails;
  return { props: { productList } };
}

function Men(productList) {
  // const [productList, setProductList] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 4;

  // const onPageChange = (page) => {
  //   setCurrentPage(page);
  // };

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
  console.log(productList);
  return (
    <div className=" h-max">
      <h1>Men</h1>
      <li>hello</li>
      {productList.productList.length > 0 && (
        <div className="flex items-center justify-center my-10 ">
          <div className="grid grid-cols-4 gap-6 w-10/12">
            {productList.productList.map((item) => {
              return (
                <div
                  key={item._id}
                  className="   transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg w-11/12"
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
                        $20.00
                      </p>
                      <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                        {item.productPrice}
                      </p>
                      <p className="ml-auto text-base font-medium text-green-500">
                        20% off
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={() => handleCartList(item)}
                    className="text-white text-center"
                  >
                    Add to cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ThemeProvider theme={theme}>
        {/* Other components and routes */}
        <PaginationRounded />
      </ThemeProvider>{" "}
    </div>
  );
}

export default Men;
