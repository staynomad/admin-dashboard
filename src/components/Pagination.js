import React from "react";
import PaginationUI from "@material-ui/lab/Pagination";

const Pagination = ({ itemsPerPage, totalItems, paginate, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (e, value) => {
    paginate(value);
  };

  return (
    <div className="pagination-container">
      <PaginationUI
        count={pageNumbers.length}
        page={pageNumber}
        onChange={handleChange}
      />
    </div>
  );
};

export default Pagination;
