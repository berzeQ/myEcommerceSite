import React, { useState } from "react";
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

// import Marquee from "react-fast-marquee";
const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const [token, setToken] = useState(null);

  const { token } = useSelector((state) => state.user);

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
            {/* <Image src= "" width= {50} height = {50} alt = "logo pic"/> */}
            LOGO
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
                        <Avatar
                          size="lg"
                          name="Segun Adebayo"
                          src="https://bit.ly/sage-adebayo"
                        />{" "}
                      </WrapItem>
                    </Wrap>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <MenuItem onClick={() => router.push("/Account")}>
                        My Account
                      </MenuItem>
                      <MenuItem onClick={() => dispatch(logout())}>
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
            <div className={`${styles.navCart} `}>
              <ShoppingCart />
            </div>
          </div>
        </div>

        <div className={styles.midNav}>
          {catList.map((category) => (
            <div onClick={() => router.push("/ProductCat/Men")}>{category}</div>
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
