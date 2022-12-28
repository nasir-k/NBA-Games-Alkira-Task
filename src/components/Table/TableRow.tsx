import React, { useState } from "react";

import Alert from "react-bootstrap/Alert";
import { IRow } from "./tableTypes";

const TableRow = ({
  row,
  openOffCanvas,
  setSelectedRow,
}: {
  row: IRow;
  openOffCanvas: () => void;
  setSelectedRow: React.Dispatch<React.SetStateAction<IRow>>;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const fullHeighWidthClasses = "w-100 h-100";
  const minWidthStyle = { minWidth: "20%" };
  const flexCenterClasses = "d-flex justify-content-center align-items-center";

  const handleRowClick = () => {
    setSelectedRow(row);
    openOffCanvas();
  };

  return (
    <Alert
      className="d-flex justify-content-center align-items-center text-uppercase text-truncate"
      variant={isHovering ? "primary" : "light"}
      style={{ height: "3.5rem", cursor: "pointer", marginTop: "-1rem" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleRowClick}
    >
      <span
        className={fullHeighWidthClasses + " " + flexCenterClasses}
        style={minWidthStyle}
      >
        <span className={flexCenterClasses}>{row.name}</span>
      </span>
      <span
        className={fullHeighWidthClasses + " " + flexCenterClasses}
        style={minWidthStyle}
      >
        <span className={flexCenterClasses}>{row.city}</span>
      </span>
      <span
        className={fullHeighWidthClasses + " " + flexCenterClasses}
        style={minWidthStyle}
      >
        <span className={flexCenterClasses}>{row.abbreviation}</span>
      </span>
      <span
        className={fullHeighWidthClasses + " " + flexCenterClasses}
        style={minWidthStyle}
      >
        <span className={flexCenterClasses}>{row.conference}</span>
      </span>
      <span
        className={fullHeighWidthClasses + " " + flexCenterClasses}
        style={minWidthStyle}
      >
        <span className={flexCenterClasses}>{row.division}</span>
      </span>
    </Alert>
  );
};

export default TableRow;
