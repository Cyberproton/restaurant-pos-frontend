import React, { Component } from "react";
import { Button, Navbar, Form , Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { FaUserCircle } from 'react-icons/fa'
import cookies from "js-cookies";

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
  }

  state = {
    isExtendedNavigationOpened: false,
    user: null
  }

  componentDidMount() {

  }

  handleDropdownToggle() {

  }

  render() {
    const dropdown = this.state.isDropdownOpened ? (
      <Dropdown.Menu show>
        <Dropdown.Header>Dropdown header</Dropdown.Header>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
      </Dropdown.Menu>
    ) : <div/>
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="ms-4" href="/home">Restaurant POS</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Link to="/cart" className="nav-link text-warning mt-1 me-1">
                  <h5><BiCartAlt /> Cart</h5>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/menu" className="nav-link text-light mt-1 me-2">
                <h5>Menu</h5>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/login" className="nav-link text-light mt-1 me-2">
                <h5><FaUserCircle /></h5>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
