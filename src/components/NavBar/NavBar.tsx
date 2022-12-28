import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import NBALogo from "../../assets/NBA.png";

const NavBar = () => {
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <span style={{ marginRight: " 1rem" }}>
            <img
              src={NBALogo}
              alt="NBA Logo"
              height={50}
              style={{ mixBlendMode: "multiply" }}
            />
          </span>
          <span>NBA Teams</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
