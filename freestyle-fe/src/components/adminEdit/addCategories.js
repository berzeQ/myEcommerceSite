import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

const AddCat = () => {
  const [catImg, setCatImg] = useState(null);
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      CatName: "",
      CatDesc: "",
      CatSales: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const formData = new FormData();
      console.log(values);
      for (let item in values) {
        formData.append(item, values[item]);
      }
      formData.append("catImage", catImg);

      axios.post("http://localhost:3006/add-category", formData);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex-col my-5 justify-between w-full"
    >
      <div className="flex-row w-full justify-between">
        <label htmlFor="CatName">Category Name</label>
        <input
          id="CatName"
          name="CatName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.CatName}
        />
      </div>
      <div className="flex-row">
        <label htmlFor="CatDesc">Category Description</label>
        <input
          id="CatDesc"
          name="CatDesc"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.CatDesc}
        />
      </div>
      <div className="flex-row">
        <label htmlFor="CatSales">Category Discount</label>
        <input
          id="CatSales"
          name="CatSales"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.CatSales}
        />
      </div>

      <div className="flex-row">
        {" "}
        <label htmlFor="CatImage">Category Image</label>
        <input
          id="CatImage"
          name="CatImage"
          type="file"
          onChange={(e) => {
            setCatImg(e.target.files[0]);
          }}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
export default AddCat;
