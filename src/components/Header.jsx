import React, { Component, Fragment } from "react";
import { Button, Card, CardDeck, Modal, Navbar, Form , Nav, Dropdown, Container, ModalBody, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCartAlt, BiFoodMenu } from "react-icons/bi";
import { FaUserCircle, FaBook, FaSignOutAlt, FaMoneyCheckAlt, FaQrcode } from 'react-icons/fa';
import { FcHome, FcPaid, FcPortraitMode, FcViewDetails } from "react-icons/fc";

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
        <Navbar bg="dark" variant="dark" className="align-items-center py-3">
          <Navbar.Brand className="ml-2" as={Link} to="/home" 
            style={{
              color: "white",
              textShadow:
                "1px 1px 2px black, 0 0 1em rgb(229, 255, 0), 0 0 0.2em rgb(100, 109, 20)",
              fontFamily: "Apple Chancery, cursive",
              fontSize: "16pt"
            }}
          >
            Restaurant POS
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
            <Link to="/" className="mr-4">
              <FcHome style={{ fontSize: "20pt" }} />
            </Link>
            <Link to="/menu" className="mr-4" style={{ fontSize: "24px" }}>
              <FcViewDetails style={{ fontSize: "20pt" }} />
            </Link>
            <Link to="/cart" className="mr-4" style={{ fontSize: "24px" }}>
              <FcPaid style={{ fontSize: "20pt" }} />
            </Link>
            <Link to="/user" style={{ fontSize: "24px" }} className="mr-1">
              <FcPortraitMode style={{ fontSize: "20pt" }} />
            </Link>
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
            <Col className="m-3 bg-dark" as={Link} to="/manager/qrcodemanagement" onClick={props.onHide}>
              <Button variant="dark" block="true">
                <div className="py-2"/>
                <p>Quản lý mã QR</p>
                <h4><FaQrcode/></h4>
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
