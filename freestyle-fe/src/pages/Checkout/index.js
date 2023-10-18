import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteProductFromCart } from "../../redux/reducerSlices/productSlice";
import { useRouter } from "next/router";
import ConfirmOrder from "../ConfirmOrder";
import TotalPrice from "@/components/TotalPrice";

export const Checkout = () => {
  const router = useRouter();
  const { cartList } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  return (
    <div className="flex max-h-screen h-screen justify-around mx-10 align-middle p-8 ">
      <div className="bg-gray-500 w-4/6 flex-col p-8">
        <div className="my-6">Shopping Cart({cartList.length})</div>
        <div className=" overflow-y-scroll bg-slate-300 h-5/6  mx-auto">
          {cartList.length > 0 &&
            cartList.map((item) => {
              return (
                <div className="flex-col items-center my-5 px-5 justify-center">
                  <Card
                    direction={{ base: "column", lg: "row" }}
                    overflow="hidden"
                    variant="outline"
                    maxW="100%"
                  >
                    <div className=" flex justify-between items-center w-full">
                      <div>
                        <Wrap>
                          <WrapItem>
                            <Image
                              objectFit="cover"
                              maxW={{ base: "100%", sm: "200px" }}
                              src={
                                "http://localhost:3006/products-image/" +
                                item._id +
                                "?key=" +
                                Math.random()
                                // loading="lazy"
                              }
                              alt={item.productName}
                            />
                          </WrapItem>
                        </Wrap>
                      </div>
                      <div>
                        <CardHeader>
                          <Heading size="2xl"> {item.productName}</Heading>
                          <CardBody>
                            <Text>
                              <strong>{item.productDesc}</strong>
                            </Text>
                          </CardBody>
                        </CardHeader>
                      </div>

                      <div className="flex justify-between ">
                        <CardHeader>
                          <Heading size="xl">
                            {" "}
                            <strong>Rs.{item.productPrice}</strong>
                          </Heading>
                        </CardHeader>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            console.log(item.type, item);

                            dispatch(deleteProductFromCart(item));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
      <div className="">
        <div>Order Summary</div>
        <div>
          <Heading size="xl">
            <TotalPrice />
          </Heading>
          <button
            onClick={() => {
              router.push("../ConfirmOrder"), (<ConfirmOrder />);
            }}
          >
            Confirm Your Order ?{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
