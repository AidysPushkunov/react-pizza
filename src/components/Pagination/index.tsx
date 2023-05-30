import { current } from '@reduxjs/toolkit';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  // const {currentPage} = useSelector(state => state.filter);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => { onChangePage(e.selected + 1) }}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;