import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../../styles/register.module.css";
import { useToast } from "@chakra-ui/react";
import { handleLogin } from "../index";
import Link from "next/link";
import {
  Button,
  VStack,
  StackDivider,
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  HStack,
  Heading,
  Card,
  Stack,
  Text,
  Image,
  CardBody,
  CardFooter,
  SimpleGrid,
  CardHeader,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import style from "../../styles/adminPage.module.css";
import AddBrand from "@/components/adminEdit/addBrand";
import AddProduct from "@/components/adminEdit/addProduct";
import AddCat from "@/components/adminEdit/addCategories";

const AddProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  productPrice: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function AdminPage() {
  const { userDetails } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [heroImageSrc, setHeroImageSrc] = useState(null);
  const [mainImageSrc, setMainImageSrc] = useState(null);
  const cardData = [
    { name: "HeroBanner", title: "Hero Banner" },
    { name: "MainBanner", title: "Main Banner" },
    // Add more cards as needed
  ];

  const toast = useToast();

  const addItem = async (values) => {
    // Your existing code for adding products
  };

  const addImage = async (imageName) => {
    const formData = new FormData();
    formData.append("imageName", imageName);
    formData.append("imagePath", imageFile);

    const res = await fetch(
      "http://localhost:3006/admin?imageName=" + imageName,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (res.status === 200) {
      if (imageName === "HeroBanner") {
        setHeroImageSrc(
          `http://localhost:3006/admin?imageName=${imageName}&key=${Math.random()}`
        );
      } else if (imageName === "MainBanner") {
        setMainImageSrc(
          `http://localhost:3006/admin?imageName=${imageName}&key=${Math.random()}`
        );
      }
    }

    toast({
      title: data.msg,
      status: res.status === 409 ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className="mx-9 my-5 relative max-h-none">
      <Heading>My Account</Heading>
      <Tabs isManual variant="enclosed">
        <HStack spacing={10} align="stretch" maxW="100%">
          <TabList w="20%">
            <VStack spacing={4}>
              <Tab fontSize="2xl" className={style.leftAlignedTab}>
                Profile
              </Tab>
              <Tab fontSize="2xl" className={style.leftAlignedTab}>
                Add Product
              </Tab>
              <Tab fontSize="2xl" style={{ textAlign: "left" }}>
                Payment Details
              </Tab>
              <Tab fontSize="2xl" style={{ textAlign: "left" }}>
                Edit Images
              </Tab>
              <Tab fontSize="2xl" style={{ textAlign: "left" }}>
                Add Brands
              </Tab>
              <Tab fontSize="2xl" style={{ textAlign: "left" }}>
                Add Categories
              </Tab>
            </VStack>
          </TabList>

          <TabPanels bg={"gray"} maxH="none" h="100%">
            <TabPanel>{/* Profile tab content */}1</TabPanel>
            <TabPanel>
              <AddProduct />
            </TabPanel>
            <TabPanel>{/* Add new product tab content */}2</TabPanel>
            <TabPanel>
              <SimpleGrid
                spacing={10}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              >
                <Card>
                  <CardHeader>
                    <Heading size="md">Hero Banner</Heading>
                  </CardHeader>
                  <CardBody>
                    <Image
                      className="h-48 w-full object-cover object-center"
                      src={
                        heroImageSrc ||
                        `http://localhost:3006/admin?imageName=HeroBanner&key=${Math.random()}`
                      }
                      alt="Hero Banner"
                    />
                    <div>
                      <label htmlFor="HeroBanner">Hero Banner</label>
                      <input
                        type="file"
                        name="HeroBanner"
                        id="HeroBanner"
                        onChange={(e) => {
                          setImageFile(e.target.files[0]);
                        }}
                      />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={() => addImage("HeroBanner")}>
                      View here
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Heading size="md">Main Banner</Heading>
                  </CardHeader>
                  <CardBody>
                    <Image
                      className="h-48 w-full object-cover object-center"
                      src={
                        mainImageSrc ||
                        `http://localhost:3006/admin?imageName=MainBanner&key=${Math.random()}`
                      }
                      alt="Main Banner"
                    />
                    <div>
                      <label htmlFor="MainBanner">Main Banner</label>
                      <input
                        type="file"
                        name="MainBanner"
                        id="MainBanner"
                        onChange={(e) => {
                          setImageFile(e.target.files[0]);
                        }}
                      />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={() => addImage("MainBanner")}>
                      View here
                    </Button>
                  </CardFooter>
                </Card>
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <AddBrand />
            </TabPanel>
            <TabPanel>
              <AddCat />
            </TabPanel>
          </TabPanels>
        </HStack>
      </Tabs>
    </div>
  );
}

export default AdminPage;
