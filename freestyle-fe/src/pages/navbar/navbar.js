import React, { useState, useEffect } from "react";
import styles from "../../styles/navStyles.module.css";
import { Router, useRouter } from "next/router";
import SearchBar from "@/components/searchBar";
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
import { AiOutlineUser } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from "../../components/shoppingCart";
import { logout } from "@/redux/reducerSlices/userSlice";
import WishList from "@/components/wishList";
import { logoutRemove } from "@/redux/reducerSlices/productSlice";

// import Marquee from "react-fast-marquee";
const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const [token, setToken] = useState(null);

  const { token, userDetails } = useSelector((state) => state.user);
  const [cartItem, setCartItem] = useState(null);
  const [wishItem, setWishItem] = useState(null);

  const catList = [
    "men",
    "women",
    "kids",
    "upperwear",
    "bottomwear",
    "3XL",
    "accessories",
  ];

  const productPage = () => {
    router.push("/ProductCat/Men");
  };
  const goToHome = () => {
    router.push("/");
  };
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (userDetails) {
      setImageUrl(
        `http://res.cloudinary.com/ddaaysabq/image/upload/v1701277551/${
          userDetails.avatar
        }.jpg?${Date.now()}` || ""
      );
    }
  }, [userDetails]);

  return (
    <nav className={styles.mainNav}>
      <div className={styles.gridContainer}>
        <div className={styles.topNav}>
          <div
            className={styles.logoMain}
            onClick={() => {
              goToHome();
            }}
          >
            <Image
              src="/logo.PNG"
              width={250}
              height={70}
              alt="logo pic"
              className="cursor-pointer"
            />
          </div>
          <div className={styles.searchBar}>
            <SearchBar />
          </div>
          <div className={styles.mainUserNav} tabIndex={0}>
            <div className={styles.userNav}>
              {token ? (
                <Menu>
                  <MenuButton>
                    <Wrap>
                      <WrapItem>
                        <Avatar size="lg" name="Segun Adebayo" src={imageUrl} />{" "}
                      </WrapItem>
                    </Wrap>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <MenuItem onClick={() => router.push("/Account")}>
                        My Account
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          dispatch(logout());
                          dispatch(logoutRemove());
                        }}
                      >
                        Logout{" "}
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                      <MenuItem>Docs</MenuItem>
                      <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              ) : (
                <Menu>
                  <MenuButton>
                    <Wrap>
                      <WrapItem>
                        <Avatar
                          bg="red.500"
                          // icon={<AiOutlineUser fontSize="1.5rem" />}
                        />
                      </WrapItem>
                    </Wrap>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <MenuItem onClick={() => router.push("/Login")}>
                        Login
                      </MenuItem>
                      <MenuItem onClick={() => router.push("/Register")}>
                        Register{" "}
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                      <MenuItem>Docs</MenuItem>
                      <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}
            </div>

            <div className="relative">
              {/* ShoppingCart component or icon */}

              <ShoppingCart setCartItem={setCartItem} />
              <p className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-lg font-semibold">
                {/* Display the number of items in the cart */}
                {/* Replace 'cartItem' with the actual variable holding the cart count */}
                {cartItem}
              </p>
            </div>
            <div className="relative">
              {/* ShoppingCart component or icon */}

              <WishList setWishItem={setWishItem} />
              <p className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-lg font-semibold">
                {/* Display the number of items in the cart */}
                {/* Replace 'wishItem' with the actual variable holding the cart count */}
                {wishItem}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.midNav}>
          {catList.map((category) => (
            <div
              className="cursor-pointer text-lg bg-white"
              onClick={() => {
                router.push(`/productCategory/${category.toLowerCase()}`);
              }}
            >
              {category}
            </div>
          ))}
        </div>

        <div className={styles.botNav}>
          <div className={styles.notify1}>hello</div>
          <div className={styles.notify2}>bye</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
