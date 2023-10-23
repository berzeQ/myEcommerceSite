import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

const Account = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const { userDetails } = useSelector((state) => state.user);
  const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };
  const fetchPendingOrders = async () => {
    const { data } = await axios.get(
      "http://localhost:3006/OrderConfirm?status=pending"
    );
    if (data) setPendingOrders(data.orderList);
  };
  useEffect(() => {
    fetchPendingOrders();
  }, []);
  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Please enter a password")
      // check minimum characters
      .min(8, "Password must have at least 8 characters")
      // different error messages for different requirements
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirmPassword: Yup.string()
      .required("Please re-type your password")
      // use oneOf to match one of the values inside the array.
      // use "ref" to get the value of passwrod.
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  return (
    <div className=" mx-9  my-5 relative max-h-none">
      <Heading>My Account</Heading>
      <Tabs>
        <HStack spacing={10} align="stretch" maxW="100%">
          <TabList>
            <VStack spacing={1} align="stretch" maxW="30%">
              <Tab>Profile</Tab>
              <Tab>Payment Details</Tab>
              <Tab>My orders</Tab>
            </VStack>
          </TabList>

          <TabPanels bg={"gray"} maxH="none" h="100%">
            <TabPanel>
              <div className="flex gap-x-7">
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
                      validationSchema={SignupSchema}
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
              </div>
            </TabPanel>
            <TabPanel>
              <div></div>
            </TabPanel>
            <TabPanel>
              <div>
                {pendingOrders &&
                  pendingOrders.length > 0 &&
                  pendingOrders.map((order) => {
                    return <li>{order.user}</li>;
                  })}
              </div>
            </TabPanel>
          </TabPanels>
        </HStack>
      </Tabs>
    </div>
  );
};

export default Account;
