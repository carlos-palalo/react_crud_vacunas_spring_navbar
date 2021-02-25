import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { HouseFill } from 'react-bootstrap-icons';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import "../assets/css/Navbar.css";

const NavBar = () => {
  return (
    <div className="App">
      <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bg-custom" variant="dark">
        <ReactBootStrap.Nav className="mr-auto custom-align" style={{ fontSize: 24 }}>
          <Link to="/Home">
            <ReactBootStrap.Nav.Link href="#Home"><HouseFill style={{ fontSize: 35 }} /></ReactBootStrap.Nav.Link>
          </Link>
          <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <Link to="/CRUD">
              <ReactBootStrap.Nav.Link href="#CRUD">CRUD</ReactBootStrap.Nav.Link>
            </Link>
            <Link to="/DatosGlobales">
              <ReactBootStrap.Nav.Link href="#DatosGlobales">Datos Globales</ReactBootStrap.Nav.Link>
            </Link>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Nav>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </ReactBootStrap.Navbar>
    </div>
  )
}

export default NavBar;