import React, { useEffect, useState } from "react";
import styles from "../../../styles/productCard.module.css";
import Image from "next/image";
import ProductDisplay from "../../ProductDisplay";
import Router, { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addCartList } from "@/redux/reducerSlices/productSlice";

function Men() {
  const [productList, setProductList] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:3006/products");
      const data = await res.json();
      console.log(data, data.status);
      console.log(JSON.stringify(data));
      const product = await data.productDetails;

      setProductList(product);
    };
    getProducts();
  }, []);
  console.log(productList);
  // const productDetail = () => {
  //   return router.push("/ProductDisplay");
  // };
  function handleCartList(values) {
    console.log(values);
    if (values) {
      dispatch(addCartList(values));
    }
  }

  return (
    <div className=" h-screen">
      <h1>Men</h1>
      <li>hello</li>
      {productList.length > 0 && (
        <div className="flex m-10 ">
          {productList.map((item) => {
            return (
              <div
                key={item._id}
                className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
                // onClick={() => router.push("/ProductDisplay")}
              >
                <img
                  className="h-48 w-full object-cover object-center"
                  src={
                    "http://localhost:3006/products-image/" +
                    item._id +
                    "?key=" +
                    Math.random()
                    // loading="lazy"
                  }
                  alt="Product Image"
                />
                <div className="p-4">
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
      )}
      {/* {productList.map((item) => {
            return (
              <div classNameName={styles.productCard} key={item._id}>
                <div classNameName={styles.productImg}>
                  <Image
                    src={
                      "http://localhost:3006/products-image/" +
                      item._id +
                      "?key=" +
                      Math.random()
                      // loading="lazy"
                    }
                    alt="Image Description"
                    width={400}
                    height={300}
                    // placeholder="blur"
                    onClick={() => productDetail()}
                  />
                </div>
                <FavoriteBorderIcon />
                <div classNameName={styles.productInfo}>
                  <div classNameName="productName" onClick={() => productDetail()}>
                    {item.productName}
                  </div>
                  <div classNameName="productPrice">
                    <em>$</em>
                    {item.productPrice}
                  </div>
                  <div classNameName="productDesc" onClick={() => productDetail()}>
                    {item.productDesc}
                  </div>
                </div>
              </div>
            );
          })} */}
      {/* </div> */}

      {/* <div classNameName="productCardContainer">
        <div classNameName="productCard">
          <div classNameName="productImage"></div>
          <div classNameName="productName"></div>
          <div classNameName="productPrice"></div>
          <div classNameName="productDesc"></div>
        </div>
      </div> */}
    </div>
  );
}

export default Men;
