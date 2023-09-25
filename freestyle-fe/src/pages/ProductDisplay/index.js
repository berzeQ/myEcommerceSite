import React from "react";
import styles from "../../styles/productDisplay.module.css";
import { useState } from "react";

function ProductDisplay() {
  const [selectedKey, setSelectedKey] = useState("Features");

  const changeTab = (key) => {
    console.log(key);
    setSelectedKey(key);
  };
  return (
    <div>
      <div className={styles.path}>
        <p>Home</p> <span> &gt; </span> <p>Men</p>
        <span> &gt; </span>
        <p>ProductName</p>
      </div>
      <div className={styles.gridProductContainer}>
        <div className={styles.productImage}></div>
        <div className={styles.productDetails}></div>

        <div className={styles.productSpec}>
          <ul>
            <li>Features</li>
            <li>Specification</li>
            <li>Seller</li>
          </ul>

          <div className={styles.productSpecInfo}>
            {selectedKey === "Features" ? (
              <div className={styles.prodSpecInfo}> hello feature</div>
            ) : selectedKey === "Specification" ? (
              <div className={styles.prodSpecInfo}> hello spec</div>
            ) : selectedKey === "Seller" ? (
              <div className={styles.prodSpecInfo}> hello seller</div>
            ) : (
              <div className={styles.prodSpecInfo}> hello feature</div>
            )}
          </div>
        </div>

        <div className={styles.productOption}></div>
      </div>
    </div>
  );
}

export default ProductDisplay;
