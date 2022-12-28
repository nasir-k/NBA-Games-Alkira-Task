import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const TablePagination = ({
  page,
  rowsCount,
  rowsPerPage,
  rowsPerPageOptions,
  totalNumberOfPages,
  currentShowingMax,
  currentShowingMin,
  onPageChange,
  onRowsPerPageChange,
}: {
  page: number;
  rowsCount: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  totalNumberOfPages: number;
  currentShowingMax: number;
  currentShowingMin: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <Container
      className="p-0 d-flex justify-content-end align-items-center"
      style={{ marginBottom: "2rem" }}
    >
      <span style={{ marginRight: "0.75rem", fontSize: "1rem" }}>
        Rows per page:
      </span>
      <Form.Select
        value={rowsPerPage}
        onChange={onRowsPerPageChange}
        style={{ width: "5rem", cursor: "pointer" }}
      >
        {rowsPerPageOptions.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Form.Select>
      <span
        style={{
          marginLeft: "2rem",
          marginRight: "2rem",
          fontSize: "1rem",
        }}
      >{`${rowsCount === 0 ? 0 : currentShowingMin} - ${
        currentShowingMax < rowsCount ? currentShowingMax : rowsCount
      } of ${rowsCount}`}</span>
      <Button
        disabled={page === 1 || rowsCount === 0}
        style={{ marginRight: "1rem" }}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>
      <Button
        disabled={page === totalNumberOfPages || rowsCount === 0}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </Container>
  );
};

export default TablePagination;
