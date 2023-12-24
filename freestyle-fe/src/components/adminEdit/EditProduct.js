import axios from "axios";
import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import SearchBar from "../searchBar";
import AdminProductEdit from "./adminProductSearch";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@chakra-ui/react";
import { Category } from "@mui/icons-material";

const EditProduct = () => {
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  const [clickedProduct, setClickedProduct] = useState(null);
  //   useEffect(() => {
  //     async function getProductList() {
  //       const res = await axios("http://localhost:3006/products");
  //       if (res) setProductList(res.data.productDetails);
  //     }
  //     getProductList();
  //   }, []);
  console.log("Product:", product);
  console.log("ProductList:", productList);
  console.log("productCat:", clickedProduct?.productCat);
  const ProductEditSchema = Yup.object().shape({
    productName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    productDesc: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
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
            <div onClick={() => setClickedProduct(product)}>
              {product.productName}
            </div>
          ) : productList ? (
            productList.map((item) => {
              return (
                <div key={item._id} onClick={() => setClickedProduct(item)}>
                  {item.productName}
                </div>
              );
            })
          ) : (
            <div>no result found</div>
          )}
        </div>
        <div className=" bg-white p-5">
          <h1>Product Edit</h1>
          {clickedProduct && (
            <div>
              <Formik
                initialValues={{
                  productName: clickedProduct?.productName,
                  productDesc: clickedProduct?.productDesc,
                  productPrice: clickedProduct?.productPrice,
                }}
                validationSchema={ProductEditSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="flex flex-col gap-4 mx-10 text-black">
                    <label htmlFor="productName"> Product Name :</label>
                    <Field
                      name="productName"
                      type="text"
                      // placeholder={userDetails.fullName.toUpperCase()}
                    />
                    {errors.productName && touched.productName ? (
                      <div>{errors.productName}</div>
                    ) : null}

                    <label htmlFor="productDesc"> Product Description:</label>
                    <Field name="productDesc" type="text" />
                    {errors.productDesc && touched.productDesc ? (
                      <div>{errors.productDesc}</div>
                    ) : null}
                    <label htmlFor="productPrice"> Product Price:</label>
                    <Field name="productPrice" type="number" />
                    <label htmlFor="productCat"> Product Categories:</label>
                    <Field
                      as="select"
                      name="productCat"
                      multiple
                      value={selectedCategories}
                      onChange={(e) => {
                        setSelectedCategories(
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        );
                      }}
                    >
                      {clickedProduct &&
                        clickedProduct.productCat.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                    </Field>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
