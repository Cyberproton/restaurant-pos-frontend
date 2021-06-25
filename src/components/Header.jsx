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
        <Navbar bg="dark" variant="dark" className="align-items-center py-3 d-flex justify-content-between">
          <Navbar.Brand className="ml-2" as={Link} to="/home" 
            style={{
              color: "white",
              textShadow:
                "1px 1px 2px black, 0 0 1em rgb(229, 255, 0), 0 0 0.2em rgb(100, 109, 20)",
              fontFamily: "Apple Chancery, cursive",
              fontSize: "16pt"
            }}
          >
            POS
          </Navbar.Brand>
          <Link to="/" className="mr-4">
            <FcHome style={{ fontSize: "20pt" }} />
          </Link>
          <Link to="/cart">
            <FcPaid style={{ fontSize: "20pt" }} />
              {this.props.count === 0 || this.props.count == null ? null : (
                <span className="count-item">{this.props.count}</span>
              )}
          </Link>
          <Link to="/progress">
            <FcInTransit style={{ fontSize: "20pt" }} />
          </Link>
          <Link to="/user" style={{ fontSize: "24px" }} className="mr-1">
            <FcPortraitMode style={{ fontSize: "20pt" }} />
          </Link>
      </Navbar>
    );
  }
}

export default Header;
