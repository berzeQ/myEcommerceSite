import React from "react";
import { Text, Heading, Button } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import TotalPrice from "@/components/TotalPrice";

const ConfirmOrder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Button colorScheme="blue" size="lg">
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
            <button>Edit</button>
          </div>
          <hr />
        </div>
      </main>
    </div>
  );
};

export default ConfirmOrder;
