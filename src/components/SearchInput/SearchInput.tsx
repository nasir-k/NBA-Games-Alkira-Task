import React from "react";
import { Form } from "react-bootstrap";

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Form.Group
      controlId="exampleForm.ControlInput1"
      style={{ marginTop: "6rem", marginBottom: "0.5rem" }}
    >
      <Form.Label style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
        Search
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Team name, city, division, etc, ... "
        size="lg"
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default SearchInput;
