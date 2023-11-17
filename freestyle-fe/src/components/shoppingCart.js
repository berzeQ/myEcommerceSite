import React, { useState } from "react";
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
import { deleteProductFromCart } from "../redux/reducerSlices/productSlice";

const shoppingCart = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let totalPrice = 0;

  const { cartList } = useSelector((state) => state.product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    // <Menu>
    //   <MenuButton>
    //     <Wrap>
    //       <WrapItem>
    //         <FontAwesomeIcon
    //           icon={faCartShopping}
    //           size="2x"
    //           className="hover:animate-wiggle p-3"
    //         />
    //       </WrapItem>
    //     </Wrap>
    //   </MenuButton>
    //   {cartList.length > 0 && (
    //     <MenuList
    //       w="lg"
    //       maxH="lg"
    //       className=" overflow-y-scroll bg-slate-300  mx-auto"
    //     >
    //       {cartList.map((product) => {
    //         return (
    //           <MenuItem minH="48px" key={product._id + Math.random() * 4}>
    //             <Image
    //               src={
    //                 "http://localhost:3006/products-image/" +
    //                 product._id +
    //                 "?key=" +
    //                 Math.random()
    //                 // loading="lazy"
    //               }
    //               alt={product.productName}
    //               mr="12px"
    //               width={0}
    //               height={0}
    //               style={{
    //                 width: "5rem", // Maintain aspect ratio
    //                 maxHeight: "6rem", // Set your desired height
    //               }}
    //             />
    //             {product.productName}
    //           </MenuItem>
    //         );
    //       })}
    //       <MenuItem onClick={() => router.push("/Checkout")}>
    //         Go To Checkout
    //       </MenuItem>
    //     </MenuList>
    //   )}
    // </Menu>

    <>
      <FontAwesomeIcon
        ref={btnRef}
        onClick={onOpen}
        icon={faCartShopping}
        size="2x"
        className="hover:animate-wiggle p-3"
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
              {cartList.map((product) => {
                totalPrice += product.productPrice;
                //         return (
                //           <MenuItem minH="48px" key={product._id + Math.random() * 4}>
                //             <Image
                //               src={
                //                 "http://localhost:3006/products-image/" +
                //                 product._id +
                //                 "?key=" +
                //                 Math.random()
                //                 // loading="lazy"
                //               }
                //               alt={product.productName}
                //               mr="12px"
                //               width={0}
                //               height={0}
                //               style={{
                //                 width: "5rem", // Maintain aspect ratio
                //                 maxHeight: "6rem", // Set your desired height
                //               }}
                //             />
                //             {product.productName}
                //           </MenuItem>
                //         );
                //       })}
                //       <MenuItem onClick={() => router.push("/Checkout")}>
                //         Go To Checkout
                //       </MenuItem>

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
                    <div>Quantity</div>
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
