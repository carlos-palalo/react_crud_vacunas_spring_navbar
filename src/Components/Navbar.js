import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="App">
      <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bg-custom" variant="dark">
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
            <Link to="/Home">
              <ReactBootStrap.Nav.Link href="#Home">Home</ReactBootStrap.Nav.Link>
            </Link>
            <Link to="/CRUD">
              <ReactBootStrap.Nav.Link href="#CRUD">CRUD</ReactBootStrap.Nav.Link>
            </Link>
            <Link to="/DatosGlobales">
              <ReactBootStrap.Nav.Link href="#DatosGlobales">Datos Globales</ReactBootStrap.Nav.Link>
            </Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  )
}

export default NavBar;