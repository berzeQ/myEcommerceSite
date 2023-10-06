import React from "react";
import { useSelector } from "react-redux";
const shoppingCart = (props) => {
  const { cartList } = useSelector((state) => state.product);
  console.log(cartList, "hello");
  return (
    <div>
      <div
        className="absolute w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 z-10 right-3"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <button
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
          onClick={() => props.setShowCart(false)}
        >
          <span className="sr-only">Close cart</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-black">
          {cartList.map((product) => {
            console.log(product.productName);
            return <li>{product.productName}</li>;
          })}
        </div>
      </div>
    </div>
  );
};

export default shoppingCart;
