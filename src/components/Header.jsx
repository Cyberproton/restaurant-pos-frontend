import React, { Component } from "react";
import { Button, Navbar, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";

class Header extends Component {
  render() {
    return (
      <Navbar bg="warning" variant="warning">
        <Navbar.Brand href="/home">POS Restaurant</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form inline>
            <Link to="cart">
              <Button variant="primary" className="mr-3">
                <BiCartAlt /> Cart
              </Button>
            </Link>
            <Link to="home">
              <Button variant="light" className="mr-3">
                Home
              </Button>
            </Link>
            <Link to="food-management">
              <Button variant="light" className="mr-3">
                Login
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;