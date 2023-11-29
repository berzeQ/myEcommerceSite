import { Pagination } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const PaginationRounded = (props) => {
  const [page, setPage] = useState(1); // State to track current page

  console.log("Rendering PaginationRounded", props.totalPages, props.mainCat);
  useEffect(() => {
    // Fetch data for the current page when page changes
    fetchData(page, props.mainCat);
  }, [page]);
  const fetchData = async (pageNumber, mainCat) => {
    const res = await axios(
      `http://localhost:3006/products-cat/${mainCat}?page=${pageNumber}`
    );

    if (res && props.setProducts) {
      props.setProducts(res.data.products);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value); // Update the current page when pagination changes
  };

  return (
    <div className="flex justify-center my-10 font-bold">
      <Pagination
        count={props.totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
};
export default PaginationRounded;
