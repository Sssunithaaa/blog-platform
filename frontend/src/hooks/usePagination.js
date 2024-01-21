import { useMemo } from "react";
export const DOTS = "...";
export const usePagination = ({ siblingCount = 1, page, totalPageCount }) => {
  const paginationRange = useMemo(() => {
    //core logic
    const totalPageNumbers = siblingCount + 5;

    // State 1: if number of pages is less than the page numbers
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    // calculate the left and right sibling index
    const lSiblingIndex = Math.max(page - siblingCount, 1);
    const rSiblingIndex = Math.min(page + siblingCount, totalPageCount);
    //calculate left dots or right dots
    const shouldShowLeftDots = lSiblingIndex > 2;
    const shouldShowRightDots = rSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    //no left dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(lSiblingIndex, rSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [siblingCount, page, totalPageCount]);
  return paginationRange;
};

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (x, index) => index + start);
}
