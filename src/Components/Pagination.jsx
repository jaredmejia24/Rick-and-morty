import React from "react";

const Pagination = ({ page, setPage }) => {
  return (
    <li>
      <a
        href="#pageBody"
        onClick={() => {
          setPage(page);
        }}
      >
        {page}
      </a>
    </li>
  );
};

export default Pagination;
