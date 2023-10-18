import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TotalPrice = (props) => {
  const { cartList } = useSelector((state) => state.product);

  const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice state

  useEffect(() => {
    // Calculate the total price whenever the cartList changes
    const newTotalPrice = cartList.reduce(
      (total, item) => total + Number(item.productPrice),
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartList]);
  return <>Rs. {totalPrice}</>;
};

export default TotalPrice;
