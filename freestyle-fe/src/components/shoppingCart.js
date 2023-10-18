import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Wrap,
  WrapItem,
  Avatar,
  Icon,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const shoppingCart = (props) => {
  const router = useRouter();

  const { cartList } = useSelector((state) => state.product);
  return (
    // <div>
    //   <div
    //     className="absolute w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 z-10 right-3"
    //     aria-modal="true"
    //     role="dialog"
    //     tabIndex="-1"
    //   >
    //     <button
    //       className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
    //       onClick={() => props.setShowCart(false)}
    //     >
    //       <span className="sr-only">Close cart</span>

    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth="1.5"
    //         stroke="currentColor"
    //         className="h-5 w-5"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M6 18L18 6M6 6l12 12"
    //         />
    //       </svg>
    //     </button>
    //     <div className="text-black">
    //       {cartList.map((product) => {
    //         console.log(product.productName);
    //         return <li>{product.productName}</li>;
    //       })}
    //     </div>

    //     <button onClick={() => router.push("/Checkout")}>Go to Checkout</button>
    //   </div>
    // </div>

    <Menu>
      <MenuButton>
        <Wrap>
          <WrapItem>
            <FontAwesomeIcon
              icon={faCartShopping}
              size="2x"
              className="hover:animate-wiggle p-3"
            />
          </WrapItem>
        </Wrap>
      </MenuButton>
      {cartList.length > 0 && (
        <MenuList
          w="lg"
          maxH="lg"
          className=" overflow-y-scroll bg-slate-300  mx-auto"
        >
          {cartList.map((product) => {
            return (
              <MenuItem minH="48px">
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={
                    "http://localhost:3006/products-image/" +
                    product._id +
                    "?key=" +
                    Math.random()
                    // loading="lazy"
                  }
                  alt={product.productName}
                  mr="12px"
                  width={70}
                  height={40}
                />
                {product.productName}
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </Menu>
  );
};

export default shoppingCart;
