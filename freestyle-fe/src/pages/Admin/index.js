import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../../styles/register.module.css";
import { useToast } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
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
  const [imageFile, setImageFile] = useState([]);
  useEffect(() => {
    console.log(imageFile);
  }, [imageFile]);

  const toast = useToast();
  const addItem = async (values) => {
    console.log(values);
    const formData = new FormData();
    for (let item in values) {
      console.log(item);
      formData.append(item, values[item]);
    }
    formData.append("productImage", file);
    console.log(formData);

    const res = await fetch("http://localhost:3006/products", {
      method: "POST",
      body: formData,
    });
    console.log(res);
    const data = await res.json();
    console.log(data, data.status);
    toast({
      title: data.msg,
      // description: "We've created your account for you.",
      status: res.status === 409 ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className=" mx-9  my-5 relative max-h-none">
      <Heading>My Account</Heading>
      <Tabs isManual variant="enclosed">
        <HStack spacing={10} align="stretch" maxW="100%">
          <TabList w="20%">
            <VStack spacing={4}>
              <Tab fontSize="2xl" className={style.leftAlignedTab}>
                Profile
              </Tab>
              <Tab fontSize="2xl" style={{ textAlign: "left" }}>
                Payment Details
              </Tab>
              <Tab fontSize="2xl" style={{ textAlign: "left" }}>
                Edit Images
              </Tab>
            </VStack>
          </TabList>

          <TabPanels bg={"gray"} maxH="none" h="100%">
            <TabPanel>
              {/* <div className="flex gap-x-7">
                <div className="flex-col w-6/12">
                  <div>
                    <Card
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                      mb="2rem"
                    >
                      <Image
                        borderRadius="full"
                        m={10}
                        boxSize="200px"
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "200px" }}
                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Caffe Latte"
                      />

                      <Stack lineHeight={0.5}>
                        <CardBody>
                          <Heading size="lg" textAlign="left">
                            The perfect latte
                          </Heading>

                          <Text color="gray">{userDetails.email}</Text>
                        </CardBody>

                        <CardFooter>
                          <Button variant="outline" colorScheme="gray" top={-5}>
                            Edit User Image
                          </Button>
                        </CardFooter>
                      </Stack>
                    </Card>
                  </div>

                  <div className=" bg-white  max-h-none mt-10">
                    <Heading>Personal</Heading>{" "}
                    <Formik
                      initialValues={{
                        fullName: userDetails.fullName.toUpperCase(),
                        password: "",
                        email: "",
                        password: "",
                      }}
                      validationSchema={AddProductSchema}
                      onSubmit={(values) => {
                        // same shape as initial values
                        console.log(values);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="flex flex-col gap-4 mx-10 text-black">
                          <label htmlFor="fullName"> Full Name :</label>
                          <Field
                            name="fullName"
                            // placeholder={userDetails.fullName.toUpperCase()}
                          />
                          {errors.fullName && touched.fullName ? (
                            <div>{errors.fullName}</div>
                          ) : null}
                          <label htmlFor="password"> Password Change?:</label>
                          <Field name="password" />
                          {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                          ) : null}
                          <label htmlFor="email"> Email ID :</label>
                          <Field name="email" type="email" />
                          {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                          ) : null}
                          <Button
                            className="px-5 py-4 align-middle"
                            colorScheme="teal"
                            size="lg"
                            type="submit"
                            marginBottom={15}
                            w={40}
                          >
                            Submit
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="bg-white w-6/12 overflow-y-scroll max-h-full">
                  <Heading>Change Your KYC</Heading>
                </div>
              </div> */}
            </TabPanel>
            <TabPanel>
              <div className=" top-0 left-0 bg-gray-950">
                <div className="justify-center flex">
                  <div className="w-2/6  bg-[#183D3D] py-5 px-10 my-10">
                    <h1 className="">Add new Product</h1>
                    <Formik
                      initialValues={{
                        productName: "",
                        productPrice: "",
                        productDesc: "",
                      }}
                      validationSchema={AddProductSchema}
                      onSubmit={(values, { resetForm }) => {
                        // same shape as initial values
                        addItem(values);
                        resetForm();
                        console.log(values);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="">
                          <Field
                            className={styles.formInput}
                            name="productName"
                            placeholder="Enter product Name"
                          />
                          {errors.productName && touched.productName ? (
                            <div className={styles.errorMsg}>
                              {errors.productName}
                            </div>
                          ) : null}
                          <br />
                          <Field
                            className={styles.formInput}
                            name="productPrice"
                            placeholder="Enter Product Price"
                          />
                          {errors.productPrice && touched.productPrice ? (
                            <div className={styles.errorMsg}>
                              {errors.productPrice}
                            </div>
                          ) : null}
                          <br />
                          <Field
                            className={styles.formInput}
                            placeholder="Enter Product Description"
                            name="productDesc"
                            type="text"
                          />
                          {errors.productDesc && touched.productDesc ? (
                            <div className={styles.errorMsg}>
                              {errors.productDesc}
                            </div>
                          ) : null}
                          <br />
                          <input
                            className="mt-6 px-5 py-3"
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                          />

                          <br />

                          <button className={styles.submitBtn} type="submit">
                            ADD
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>{" "}
            </TabPanel>
            <TabPanel>
              <>
                <SimpleGrid
                  spacing={10}
                  templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                >
                  <Card>
                    <CardHeader>
                      <Heading size="md"> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        View a summary of all your customers over the last
                        month.
                      </Text>
                      <div>
                        <label htmlFor="HeroBanner">Hero Banner</label>
                        <input
                          type="file"
                          name="HeroBanner"
                          id="HeroBanner"
                          onChange={(e) => {
                            setImageFile((prevImageFile) => ({
                              ...prevImageFile,
                              [e.target.name]: e.target.files[0],
                            }));
                          }}
                        />
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button>View here</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Heading size="md"> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        View a summary of all your customers over the last
                        month.
                      </Text>
                      <input
                        type="file"
                        name="MainBanner"
                        id="MainBanner"
                        onChange={(e) => {
                          setImageFile((prevImageFile) => ({
                            ...prevImageFile,
                            [e.target.name]: e.target.files[0],
                          }));
                        }}
                      />
                    </CardBody>
                    <CardFooter>
                      <Button>View here</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Heading size="md"> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        View a summary of all your customers over the last
                        month.
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button>View here</Button>
                    </CardFooter>
                  </Card>
                </SimpleGrid>
              </>
            </TabPanel>
          </TabPanels>
        </HStack>
      </Tabs>
    </div>
  );
}

export default AdminPage;
