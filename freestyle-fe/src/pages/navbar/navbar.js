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

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from "../../components/shoppingCart";

// import Marquee from "react-fast-marquee";
const Navbar = () => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [token, setToken] = useState(null);

  const catList = [
    "men",
    "women",
    "kids",
    "upperwear",
    "bottomwear",
    "3XL",
    "accessories",
  ];
  const handleMouseEnter = (category) => {
    // Set the hovered item to the current category
    setHoveredItem(category);
  };
  const handleMouseLeave = () => {
    // Reset the hovered item when leaving
    setHoveredItem(null);
  };

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
                      <MenuItem>My Account</MenuItem>
                      <MenuItem>Payments </MenuItem>
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
                      <MenuItem>Login</MenuItem>
                      <MenuItem>Register </MenuItem>
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
            <div
              className={styles.gridItem}
              key={category}
              onClick={() => productPage()}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              {category.toUpperCase()}

              {hoveredItem === category && (
                <div className={styles.navCatList}>
                  <ul>
                    <li>hello</li>
                    <li>no</li>
                    <li>yamete</li>
                    <li>uWu</li>
                    <li>heil</li>
                  </ul>
                </div>
              )}
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
