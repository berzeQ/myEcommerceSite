import React, { useEffect, useState } from "react";
import styles from "../../../styles/productCard.module.css";
import Image from "next/image";
import ProductDisplay from "../../ProductDisplay";
import Router, { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
function Men() {
  const [productList, setProductList] = useState([]);
  const router = useRouter();

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
  const productDetail = () => {
    return router.push("/ProductDisplay");
  };

  return (
    <div>
      <h1>Men</h1>
      <li>hello</li>
      {productList.length > 0 && (
        <div className={styles.productCardGridContainer}>
          {productList.map((item) => {
            return (
              <div className={styles.productCard} key={item._id}>
                <div className={styles.productImg}>
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
                <div className={styles.productInfo}>
                  <div className="productName" onClick={() => productDetail()}>
                    {item.productName}
                  </div>
                  <div className="productPrice">
                    <em>$</em>
                    {item.productPrice}
                  </div>
                  <div className="productDesc" onClick={() => productDetail()}>
                    {item.productDesc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="productCardContainer">
        <div className="productCard">
          <div className="productImage"></div>
          <div className="productName"></div>
          <div className="productPrice"></div>
          <div className="productDesc"></div>
        </div>
      </div>
    </div>
  );
}

export default Men;
