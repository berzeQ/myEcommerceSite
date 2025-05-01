import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import TotalPrice from "./TotalPrice";
import {
  deleteProductFromCart,
  decrement,
  increment,
} from "../redux/reducerSlices/productSlice";
import axios from "axios";
import { setLoginDetails } from "@/redux/reducerSlices/userSlice";

const shoppingCart = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let totalPrice = 0;

  const { cartList } = useSelector((state) => state.product);
  const { userDetails } = useSelector((state) => state.user);
  const [wiggleAnimation, setWiggleAnimation] = useState(false);
  const [cartListChanged, setCartListChanged] = useState(false);

  console.log(userDetails);
  const cartToDB = async (cartItems) => {
    const res = await axios.post(
      "http://localhost:3006/saveCart/655370308002391b385d418c",
      cartItems
    );
    if (res) {
      console.log(res);
    }
  };

  const cartAdd = cartList.map((item) => {
    return { itemId: item._id, quantity: item.quantity };
  });
  console.log(cartAdd);
  useEffect(() => {
    if (userDetails?._id) {
      cartToDB(cartAdd);
    }
    setCartListChanged(!cartListChanged);
    if (cartList) {
      props.setCartItem(cartList.length);
    }
    setWiggleAnimation(true);

    const timeout = setTimeout(() => {
      setWiggleAnimation(false);
    }, 3000);

    // Clear the timeout on component unmount or when cartList changes
    return () => clearTimeout(timeout);
  }, [cartList]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <FontAwesomeIcon
        ref={btnRef}
        onClick={onOpen}
        icon={faCartShopping}
        size="2x"
        className={`p-3 hover:animate-wiggle ${
          cartListChanged && wiggleAnimation ? "animate-wiggle" : ""
        }`}
        cursor="pointer"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className=" bg-neutral-700 text-white">
            Your Shopping Cart ({cartList.length})
          </DrawerHeader>

          <DrawerBody>
            <div className="flex-col">
              {cartList &&
                cartList.map((product) => {
                  totalPrice += product.productPrice;

                  return (
                    <div className="flex gap-4 w-full py-6 justify-between items-center">
                      <div>
                        <Image
                          src={
                            "http://localhost:3006/products-image/" +
                            product._id +
                            "?key=" +
                            Math.random()
                            // loading="lazy"
                          }
                          alt={product.productName}
                          mr="12px"
                          width={500}
                          height={500}
                          style={{
                            width: "7rem", // Maintain aspect ratio
                            height: "8rem",
                            maxHeight: "10rem", // Set your desired height
                          }}
                        />
                      </div>
                      <div className="flex-col justify-between">
                        <div>
                          <Heading>{product.productName}</Heading>
                        </div>
                        <div>Rs.{product.productPrice}</div>
                      </div>
                      <div className="flex-col justify-between">
                        <div>Quantity</div>
                        <div className="flex flex-row justify-between text-center">
                          <div>
                            <button
                              onClick={() => dispatch(decrement(product))}
                              className=" bg-slate-400 "
                            >
                              -
                            </button>
                          </div>
                          <div>{product.quantity}</div>
                          <div>
                            <button
                              onClick={() => dispatch(increment(product))}
                              className=" bg-slate-400 "
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            dispatch(deleteProductFromCart(product));
                          }}
                        >
                          <DeleteIcon boxSize={6} />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </DrawerBody>

          <DrawerFooter className="flex-row align-middle justify-between gap-14 py-5 bg-neutral-700">
            <div className="flex-col justify-around text-white">
              <div>Subtotal:</div>
              <div className="text-2xl font-extrabold">
                <TotalPrice />
              </div>
            </div>
            <div>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => router.push("/Checkout")}
              >
                Go to checkout
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default shoppingCart;
