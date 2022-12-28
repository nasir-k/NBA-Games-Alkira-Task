import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import usePagination from "../../hooks/usePagination";
import TableHeading from "./TableHeading";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";
import { IColumn, IRow } from "./tableTypes";
import OffCanvas from "../OffCanvas/OffCanvas";

const Table = ({
  rows,
  sort,
  changeSort,
  isLoading,
}: {
  rows: IRow[];
  sort: { sort: "asc" | "dsc" | "none"; sortBy: string };
  changeSort: (sortBy: string, sort: "asc" | "dsc" | "none") => void;
  isLoading: boolean;
}) => {
  const [selectedRow, setSelectedRow] = useState<IRow>({
    id: 0,
    full_name: "",
    city: "",
    abbreviation: "",
    conference: "",
    division: "",
    name: "",
  });
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const {
    page,
    rowsPerPage,
    rowsCount,
    totalNumberOfPages,
    currentShowingMax,
    currentShowingMin,
    handleChangePage,
    handleChangeRowsPerPage,
    activeRows,
  } = usePagination(1, 5, rows);

  const columns: IColumn[] = [
    { name: "name", label: "Team Name" },
    { name: "city", label: "City" },
    { name: "abbreviation", label: "Abbreviation" },
    { name: "conference", label: "Conference" },
    { name: "division", label: "Division" },
  ];

  const openOffCanvas = () => {
    setShowOffCanvas(true);
  };

  const closeOffCanvas = () => {
    setShowOffCanvas(false);
  };

  return (
    <Container
      className="p-0 d-flex justify-content-end flex-column"
      style={{ minWidth: "44rem" }}
    >
      <Container
        className="p-0 d-flex justify-content-end"
        style={{ marginTop: "2rem", marginBottom: "-1.5rem" }}
      >
        Click on table headings to sort.
      </Container>
      <TableHeading columns={columns} sort={sort} changeSort={changeSort} />
      {isLoading ? (
        <Alert
          className="d-flex justify-content-center align-items-center text-uppercase text-truncate"
          variant="secondary"
          style={{ height: "3.5rem", cursor: "pointer", marginTop: "-1rem" }}
        >
          <Spinner animation="border" />
        </Alert>
      ) : rowsCount === 0 ? (
        <Alert
          className="d-flex justify-content-center align-items-center text-uppercase text-truncate"
          variant="secondary"
          style={{ height: "3.5rem", cursor: "pointer", marginTop: "-1rem" }}
        >
          No Record Found.
        </Alert>
      ) : (
        activeRows.map((row) => (
          <TableRow
            key={row.id}
            row={row}
            openOffCanvas={openOffCanvas}
            setSelectedRow={setSelectedRow}
          />
        ))
      )}
      <OffCanvas
        selectedRow={selectedRow}
        show={showOffCanvas}
        closeOffCanvas={closeOffCanvas}
      />
      <TablePagination
        page={page}
        rowsCount={rowsCount}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20]}
        totalNumberOfPages={totalNumberOfPages}
        currentShowingMax={currentShowingMax}
        currentShowingMin={currentShowingMin}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default Table;
