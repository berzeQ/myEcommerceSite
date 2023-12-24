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
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import TotalPrice from "./TotalPrice";
import {
  deleteProductFromCart,
  decrement,
  increment,
} from "../redux/reducerSlices/productSlice";
import axios from "axios";
import { setLoginDetails } from "@/redux/reducerSlices/userSlice";

const WishList = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let totalPrice = 0;

  const { wishList } = useSelector((state) => state.product);
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  const [wiggleAnimation, setWiggleAnimation] = useState(false);
  const [wishListChanged, setWisListChanged] = useState(false);

  console.log(userDetails, "hello");
  const wishToDB = async (cartItems) => {
    if (isLoggedIn) {
      const res = await axios.post(
        `http://localhost:3006/saveWish/${userDetails._id}`,
        cartItems
      );
      if (res) {
        console.log(res);
      }
    }
  };

  const wishAdd = wishList.map((item) => {
    return item._id;
  });
  console.log(wishAdd);
  useEffect(() => {
    setWisListChanged(!wishListChanged);

    if (userDetails?._id) {
      wishToDB(wishAdd);
    }

    if (wishList && wishList.length >= 0) {
      props.setWishItem(wishList.length);
    }
    setWiggleAnimation(true);

    const timeout = setTimeout(() => {
      setWiggleAnimation(false);
    }, 3000);

    // Clear the timeout on component unmount or when cartList changes
    return () => clearTimeout(timeout);
  }, [wishList]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <FontAwesomeIcon
        ref={btnRef}
        onClick={onOpen}
        icon={faHeart}
        size="2x"
        className={`p-3 hover:animate-wiggle ${
          wishListChanged && wiggleAnimation ? "animate-wiggle" : ""
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
            Your Shopping Cart ({wishList.length})
          </DrawerHeader>

          <DrawerBody>
            <div className="flex-col">
              {wishList &&
                wishList.map((product) => {
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

export default WishList;
