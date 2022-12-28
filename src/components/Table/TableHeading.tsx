import React from "react";

import Container from "react-bootstrap/Container";
import { IColumn } from "./tableTypes";

import ArrowUpIcon from "../../assets/arrow-up.svg";
import ArrowDownIcon from "../../assets/arrow-down.svg";

const TableHeading = ({
  columns,
  sort,
  changeSort,
}: {
  columns: IColumn[];
  sort: { sort: "asc" | "dsc" | "none"; sortBy: string };
  changeSort: (sortBy: string, sort: "asc" | "dsc" | "none") => void;
}) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center text-uppercase text-truncate text-white my-4 rounded"
      style={{ height: "3.5rem", background: "#004589" }}
    >
      {columns.map((column) => (
        <span
          key={column.name}
          className="w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            minWidth: "20%",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() =>
            changeSort(
              sort.sort === "dsc" ? "none" : column.name,
              sort.sort === "none"
                ? "asc"
                : sort.sort === "asc"
                ? "dsc"
                : "none"
            )
          }
        >
          <span
            className="d-flex justify-content-center align-items-center"
            style={{ fontWeight: "bold" }}
          >
            {column.label}
          </span>
          {sort.sortBy === column.name && sort.sortBy !== "none" && (
            <img
              src={sort.sort === "asc" ? ArrowUpIcon : ArrowDownIcon}
              alt="Arrow Down/Up"
              height={15}
              style={{ marginLeft: "0.5rem", filter: "invert(100%)" }}
            />
          )}
        </span>
      ))}
    </Container>
  );
};

export default TableHeading;
