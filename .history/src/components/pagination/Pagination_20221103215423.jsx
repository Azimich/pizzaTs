import React from 'react';
import ReactPaginate from 'react-paginate';
import Styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage }) => {

  return (
    <div className={Styles.pagination__container}>
      <ReactPaginate
        className={Styles.paginations}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event)}
        pageRangeDisplayed={5}
        pageCount={5}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination;