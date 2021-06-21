import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FcHome, FcPaid, FcPortraitMode, FcInTransit } from "react-icons/fc";
import { Link } from "react-router-dom";

class Header extends React.Component {
  handleUser() {
    if (localStorage.getItem("token") === null) return "/login";
    return "/user";
  }

  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="d-flex justify-content-between header-side"
      >
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={{
                color: "white",
                textShadow:
                  "1px 1px 2px black, 0 0 1em rgb(229, 255, 0), 0 0 0.2em rgb(100, 109, 20)",
                fontFamily: "Apple Chancery, cursive",
              }}
            >
              POS
            </Link>
          </Navbar.Brand>
          <Link to="/">
            <FcHome style={{ fontSize: "20pt" }} />
          </Link>
          <Link to="/cart">
            <FcPaid style={{ fontSize: "20pt" }} />
            {this.props.count === 0 ? null : (
              <span className="count-item">{this.props.count}</span>
            )}
          </Link>
          <Link to="/progress">
            <FcInTransit style={{ fontSize: "20pt" }} />
          </Link>
          <Link to={this.handleUser}>
            <FcPortraitMode style={{ fontSize: "20pt" }} />
          </Link>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
