import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../../styles/register.module.css";
import { useToast } from "@chakra-ui/react";

import Link from "next/link";
import axios from "axios";

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

function AddProduct() {
  const [optionsList, setOptionList] = useState([]);
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3006/add-category");
        if (res.data) {
          setOptionList(res.data.CategoryDetails);
        }
      } catch (error) {
        // Handle error if the request fails
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const addItem = async (values) => {
    console.log(values);
    debugger;
    const formData = new FormData();
    for (let item in values) {
      formData.append(item, values[item]);
    }
    formData.append("productCat", cat);
    formData.append("productImage", file);

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
    <div>
      <div className="addProductContainer">
        <div className={`${styles.container} `}>
          <div className={styles.form}>
            <h1 className={styles.formHeader}>Add new Product</h1>
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
                <Form>
                  <Field
                    className={styles.formInput}
                    name="productName"
                    placeholder="Enter product Name"
                  />
                  {errors.productName && touched.productName ? (
                    <div className={styles.errorMsg}>{errors.productName}</div>
                  ) : null}
                  <br />
                  <Field
                    className={styles.formInput}
                    name="productPrice"
                    placeholder="Enter Product Price"
                  />
                  {errors.productPrice && touched.productPrice ? (
                    <div className={styles.errorMsg}>{errors.productPrice}</div>
                  ) : null}
                  <br />
                  <Field
                    className={styles.formInput}
                    placeholder="Enter Product Description"
                    name="productDesc"
                    type="text"
                  />
                  {errors.productDesc && touched.productDesc ? (
                    <div className={styles.errorMsg}>{errors.productDesc}</div>
                  ) : null}
                  <br />
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                  />

                  <br />
                  <hr />
                  <div className="flex justify-between mt-6">
                    <div>category: </div>
                    <div className="flex-col gap-5">
                      {cat.map((catItem) => {
                        return (
                          <div className="flex justify-bet  ween items-center gap-10">
                            <div className="w-4/6">
                              {" "}
                              <p>{catItem}</p>{" "}
                            </div>
                            <div>
                              {" "}
                              <button
                                onClick={() => {
                                  let tempCat = cat.filter((item) => {
                                    if (item !== catItem) return item;
                                  });
                                  setCat(tempCat);
                                }}
                              >
                                del
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Field
                      as="select"
                      name="productCat"
                      multiple // Enable multiple selection
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );

                        if (
                          selectedOptions.every((option) =>
                            cat.includes(option)
                          )
                        ) {
                          // If all selected options are already in the cat array, remove them
                          const tempCat = cat.filter(
                            (item) => !selectedOptions.includes(item)
                          );
                          setCat(tempCat);
                        } else {
                          // Add the selected options that are not already in cat
                          setCat([
                            ...cat,
                            ...selectedOptions.filter(
                              (option) => !cat.includes(option)
                            ),
                          ]);
                        }
                      }}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {optionsList.map((option, index) => (
                        <option key={index} value={option.CatName} onClic>
                          {option.CatName}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <br />

                  <button className={styles.submitBtn} type="submit">
                    ADD
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
