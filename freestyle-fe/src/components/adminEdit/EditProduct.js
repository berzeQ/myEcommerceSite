import axios from "axios";
import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import SearchBar from "../searchBar";
import AdminProductEdit from "./adminProductSearch";

const EditProduct = () => {
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  //   useEffect(() => {
  //     async function getProductList() {
  //       const res = await axios("http://localhost:3006/products");
  //       if (res) setProductList(res.data.productDetails);
  //     }
  //     getProductList();
  //   }, []);
  console.log("Product:", product);
  console.log("ProductList:", productList);
  return (
    <div>
      <div className="flex justify-center items-center">Product Details</div>
      <div className="grid grid-cols-2 gap-5 h-screen">
        <div className=" bg-white p-5 relative">
          <Heading>Product List</Heading>
          <AdminProductEdit
            setProduct={setProduct}
            setProductList={setProductList}
          />
          {product ? (
            <div>{product.productName}</div>
          ) : productList ? (
            productList.map((item) => {
              return <div key={item.id}>{item.productName}</div>;
            })
          ) : (
            <div>no result found</div>
          )}
        </div>
        <div className=" bg-white p-5">Product Edit</div>
      </div>
    </div>
  );
};

export default EditProduct;
