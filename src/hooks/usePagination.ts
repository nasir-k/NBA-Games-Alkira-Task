import React, { useEffect, useMemo, useState } from "react";

const usePagination = (
  initialPage: number,
  initialRowsPerPage: number,
  rows: any[]
) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const rowsCount = useMemo(() => rows.length, [rows.length]);

  const totalNumberOfPages = useMemo(
    () => Math.ceil(rowsCount / rowsPerPage),
    [rowsCount, rowsPerPage]
  );

  const currentShowingMax = useMemo(
    () => rowsPerPage * page,
    [page, rowsPerPage]
  );

  const currentShowingMin = useMemo(
    () => currentShowingMax - rowsPerPage + 1,
    [currentShowingMax, rowsPerPage]
  );

  useEffect(() => {
    if (totalNumberOfPages < page && totalNumberOfPages > 1) {
      setPage(totalNumberOfPages);
    }
  }, [page, totalNumberOfPages]);

  const activeRows = rows.slice(
    rowsPerPage * page - rowsPerPage,
    rowsPerPage * page
  );

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  return {
    page,
    rowsPerPage,
    rowsCount,
    totalNumberOfPages,
    currentShowingMax,
    currentShowingMin,
    handleChangePage,
    handleChangeRowsPerPage,
    activeRows,
  };
};

export default usePagination;
