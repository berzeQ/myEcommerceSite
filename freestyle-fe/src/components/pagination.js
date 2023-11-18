import { Pagination } from "@mui/material";
import * as React from "react";

const PaginationRounded = () => {
  console.log("Rendering PaginationRounded");
  return (
    <div className="flex justify-center my-10 font-bold">
      <Pagination count={10} shape="rounded" size="large" />
    </div>
  );
};
export default PaginationRounded;
