import React, { Component, Fragment } from "react";
import { Button, Card, CardDeck, Modal, Navbar, Form , Nav, Dropdown, Container, ModalBody, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCartAlt, BiFoodMenu } from "react-icons/bi";
import { FaUserCircle, FaBook, FaSignOutAlt, FaMoneyCheckAlt } from 'react-icons/fa'
import { BsGrid3X3Gap } from 'react-icons/bs'
import cookies from "js-cookies";

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleExtendedNavigationToggle = this.handleExtendedNavigationToggle.bind(this)
  }

  state = {
    isExtendedNavigationOpened: false,
    user: null
  }

  componentDidMount() {

  }

  handleDropdownToggle() {

  }

  handleExtendedNavigationToggle() {
    this.setState({
      isExtendedNavigationOpened: !this.state.isExtendedNavigationOpened
    })
  }

  render() {
    return (
      <Fragment>
        <Navbar bg="dark" variant="dark" className="align-items-center">
          <Navbar.Brand className="ml-2" as={Link} to="/home">
            Restaurant POS
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Link to="/cart" className="text-warning">
                  <BiCartAlt /> Cart
              </Link>
              <Link to="/menu" className="text-light ml-3">
                Menu
              </Link>
              <Link to="/login">
                <FaUserCircle className="text-light ml-3"/>
              </Link>
              <BsGrid3X3Gap className="text-light ml-3" onClick={this.handleExtendedNavigationToggle}/>
          </Navbar.Collapse>
        </Navbar>
        <ExtendendNavigation show={this.state.isExtendedNavigationOpened} onHide={this.handleExtendedNavigationToggle}/> 
      </Fragment>
    );
  }
}

function ExtendendNavigation(props) {
  const variant = 'dark'
  return (
    <Modal show={props.show} onHide={props.onHide} centered="true">
      <Modal.Header closeButton className="bg-dark text-white">
      <div className="modal-title h5">Danh Mục</div>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col className="m-3 bg-dark" as={Link} to="/manager/foodmanagement" onClick={props.onHide}>
              <Button variant="dark" block="true">
                <div className="py-2"/>
                <p>Quản lý món ăn</p>
                <h4><FaBook/></h4>
              </Button>
            </Col>
            <Col className="m-3 bg-dark" as={Link} to="/manager/foodmanagement" onClick={props.onHide}>
              <Button variant="dark" block="true">
                <div className="py-2"/>
                <p>Quản lý doanh thu</p>
                <h4><FaBook/></h4>
              </Button>
            </Col>
          </Row>

          <Row>
            <Col className="my-3">
              <Button variant="primary" block="true">
                Test
                <hr/>
                Test
              </Button>
            </Col>
            <Col className="my-3">
              <Button variant="primary" block="true">
                Test
                <hr/>
                Test
              </Button>
            </Col>
          </Row>

          <Row>
          <Col className="my-3">
              <Button variant="primary" block="true">
                Test
                <hr/>
                Test
              </Button>
            </Col>
            <Col className="my-3">
              <Button variant="primary" block="true">
                Test
                <hr/>
                Test
              </Button>
            </Col>
            <Col className="my-3">
              <Button variant="primary" block="true">
                Test
                <hr/>
                Test
              </Button>
            </Col>
          </Row>

          <Row>
            <Col className="my-3">
              <Button variant="danger" block="true" as={Link} to="/manager/foodmanagement" onClick={props.onHide}>
                <div className="py-2"/>
                <p>Đăng Xuất</p>
                <h4><FaSignOutAlt/></h4>
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}
