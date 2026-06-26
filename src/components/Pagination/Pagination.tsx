import ReactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";

const ReactPaginate =
  typeof ReactPaginateModule === "object" &&
  ReactPaginateModule !== null &&
  "default" in ReactPaginateModule
    ? ((ReactPaginateModule as Record<string, unknown>)
        .default as typeof ReactPaginateModule)
    : ReactPaginateModule;

interface PaginationProps {
  onChange: (page: number) => void;
  page: number;
}

const Pagination = ({ onChange, page }: PaginationProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={({ selected }) => onChange(selected + 1)}
      pageRangeDisplayed={5}
      pageCount={page}
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
