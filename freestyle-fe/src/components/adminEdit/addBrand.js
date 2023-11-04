import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

const AddBrand = () => {
  const [brandImg, setBrandImg] = useState(null);
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const [allBrand, setAllBrand] = useState([]);
  const [signal, setSignal] = useState(false);

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
  return (
    <div className="flex w-full">
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
            return <li>{brand.BrandName}</li>;
          })}
      </div>
    </div>
  );
};
export default AddBrand;
