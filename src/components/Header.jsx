import React, { Component, useState } from "react";
import { Button, Navbar, Nav, NavDropdown, Form, Dropdown, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { FaBars } from 'react-icons/fa'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
  }

  state = {
    isExtendedNavigationOpened: false
  }

  handleDropdownToggle() {
    this.setState(prev => ({
      isDropdownOpened: !prev.isDropdownOpened
    }))
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
              
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function ExtendedNaviagtion(props) {
  const [show, setShow] = useState(false)

  const toggle = () => {

  }

  return (
    <Modal
        show="true"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
  )
}