import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@chakra-ui/react";

const AddBrand = () => {
  const [brandImg, setBrandImg] = useState(null);
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const [allBrand, setAllBrand] = useState([]);
  const [signal, setSignal] = useState(false);
  const [viewBrand, setViewBrand] = useState(null);

  useEffect(() => {
    async function fetchBrandsData() {
      const response = await axios("http://localhost:3006/brands");
      if (response) {
        setAllBrand(response.data.BrandDetails);
      }
    }
    fetchBrandsData();
  }, [signal]);
  const formik = useFormik({
    initialValues: {
      BrandName: "",
      BrandDesc: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const formData = new FormData();
      for (let item in values) {
        formData.append(item, values[item]);
      }
      formData.append("brandImage", brandImg);

      const { data } = await axios.post(
        "http://localhost:3006/brands",
        formData
      );
      if (data) setSignal(!signal);
    },
  });
  const searchBrand = async (brandId) => {
    const res = await axios(`http://localhost:3006/brands/${brandId}`);
    if (res) {
      console.log(res);
      setViewBrand(res.data);
    }
  };
  const BrandEditSchema = Yup.object().shape({
    BrandName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    BrandDesc: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  });
  return (
    <div className="flex w-full justify-around">
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex-col my-5 justify-between w-full"
        >
          <div className="flex-row w-full justify-between">
            <label htmlFor="BrandName">Brand Name</label>
            <input
              id="BrandName"
              name="BrandName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.BrandName}
            />
          </div>
          <div className="flex-row">
            <label htmlFor="BrandDesc">Brand Description</label>
            <input
              id="BrandDesc"
              name="BrandDesc"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.BrandDesc}
            />
          </div>

          <div className="flex-row">
            {" "}
            <label htmlFor="bImage">Brand Image</label>
            <input
              id="bImage"
              name="bImage"
              type="file"
              onChange={(e) => {
                setBrandImg(e.target.files[0]);
              }}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {allBrand &&
          allBrand.length > 0 &&
          allBrand.map((brand) => {
            return (
              <li
                onClick={() => {
                  searchBrand(brand._id), console.log(viewBrand);
                }}
              >
                {brand.BrandName}
              </li>
            );
          })}
      </div>
      {viewBrand && (
        <div>
          {/* <form action="POST">
            <input type="text" />
            <p>{viewBrand.BrandName}</p>
          </form> */}
          <Formik
            initialValues={{
              BrandName: "jello",
              BrandDesc: viewBrand?.BrandDesc,
            }}
            validationSchema={BrandEditSchema}
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-4 mx-10 text-black">
                <label htmlFor="BrandName"> Brand Name :</label>
                <Field
                  name="BrandName"
                  type="text"
                  // placeholder={userDetails.fullName.toUpperCase()}
                />
                {errors.BrandName && touched.BrandName ? (
                  <div>{errors.BrandName}</div>
                ) : null}

                <label htmlFor="BrandDesc"> Brand Description:</label>
                <Field name="BrandDesc" type="text" />
                {errors.BrandDesc && touched.BrandDesc ? (
                  <div>{errors.BrandDesc}</div>
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
      )}
    </div>
  );
};
export default AddBrand;
