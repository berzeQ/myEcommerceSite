import React from "react";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/react";
import TotalPrice from "@/components/TotalPrice";
import axios from "axios";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails } = useSelector((state) => state.user);

  const handleOrder = async () => {
    alert("hello");
    const orderDetails = {
      user: userDetails._id,
      address: "Kathmandu",
      payment: "On Delivery",
      subTotal: 990099,
      status: "pending",
    };

    const response = await axios.post(
      "http://localhost:3006/OrderConfirm",
      orderDetails
    );
    if (response) console.log(response.data.message);
  };

  return (
    <div className="h-screen">
      <header className="flex flex-row justify-around items-center mx-auto h-20">
        <div className="bg-zinc-100  w-2/4">
          <Heading>Order Confirmation</Heading>
        </div>
        <div className="flex justify-around items-center bg-zinc-100 w-2/4 ">
          <Heading>
            Order Total:{" "}
            <em>
              <TotalPrice />
            </em>
          </Heading>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => {
              handleOrder();
            }}
          >
            Place Order
          </Button>{" "}
        </div>
      </header>
      <main className=" grid grid-cols-2 gap-10 h-2/3 justify-center text-center mx-7 mt-10">
        <div>
          <div className="flex justify-between">
            <Text>Shipping Address</Text>

            <button onClick={onOpen}>Edit</button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>hello </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>

          <hr />
        </div>
        <div>
          <div className="flex justify-between">
            <Text>Payment</Text>
            <button>Edit</button>
          </div>
          <hr />
        </div>
        <div>
          <div className="flex justify-between">
            <Text>Billing Address</Text>
            <button>Edit</button>
          </div>
          <hr />
        </div>
        <div>
          <div className="flex justify-between">
            <Text>Your Information</Text>
            <button onClick={onOpen}>Edit</button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>hello </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>

          <hr />

          <div className="flex justify-center items-center ">
            <Card align="center" maxW="100%" className="px-10">
              <div className="flex flex-row justify-around items-center">
                <div>
                  <Wrap>
                    <WrapItem>
                      <Avatar
                        size="2xl"
                        name="Segun Adebayo"
                        src={
                          "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                        }
                      />{" "}
                    </WrapItem>
                  </Wrap>
                </div>

                <div>
                  {" "}
                  <CardHeader>
                    <Heading size="md"> User Details</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <strong>User Full Name:</strong>
                      {userDetails?.fullName.toUpperCase()}
                    </Text>
                    <Text>
                      <strong>Email: </strong>
                      {userDetails?.email}
                    </Text>
                    <Text>
                      <strong>Phone Number:</strong> {userDetails?.phoneNumber}
                    </Text>
                  </CardBody>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmOrder;
