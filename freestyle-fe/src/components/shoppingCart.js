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
  Text,
  Heading,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const shoppingCart = (props) => {
  const router = useRouter();

  const { cartList } = useSelector((state) => state.product);
  return (
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
              <MenuItem minH="48px" key={product._id + Math.random() * 4}>
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
                  width={0}
                  height={0}
                  style={{
                    width: "5rem", // Maintain aspect ratio
                    maxHeight: "6rem", // Set your desired height
                  }}
                />
                {product.productName}
              </MenuItem>
            );
          })}
          <MenuItem onClick={() => router.push("/Checkout")}>
            Go To Checkout
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default shoppingCart;
