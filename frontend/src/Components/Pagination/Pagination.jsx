import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
const Pagination = ({
  onPageChange,
  page,
  siblingCount = 1,
  totalPageCount,
}) => {
  const paginationRange = usePagination({ page, siblingCount, totalPageCount });
  if (page === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(page + 1);
  };
  const onPrev = () => {
    onPageChange(page - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
      <div className="flex items-center">
        <button
          onClick={onPrev}
          disabled={page === 1}
          type="button"
          className="w-full p-4 text-base  bg-purple-600 border rounded-l-xl hover:bg-purple-950  disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <button className="cursor-default w-full px-4 py-2 text-base bg-white">
                {DOTS}
              </button>
            );
          } else {
            <button
              type="button"
              className={`w-full px-4 py-2 text-black bg-white border-t border-b ${
                pageNumber === page ? "text-white bg-blue-500" : "bg-white"
              } hover:bg-gray-100 `}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>;
          }
        })}

        <button
          disabled={page === lastPage}
          type="button"
          className="w-full p-4 text-base text-white bg-purple-600 border-t border-b border-r rounded-r-xl hover:bg-purple-950 disabled:cursor-not-allowed"
          onClick={onNext}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
