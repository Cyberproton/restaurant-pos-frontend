import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <Container className="login-form">
        <Card>
          {/* <Card.Img variant="top" src=""/> */}
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>ĐĂNG NHẬP</Card.Title>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input className="form-control" placeholder="Enter Username" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Lưu thông tin đăng nhập
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Đăng nhập
              </button>
              <Link to="signup" className="btn btn-warning btn-block">
                Đăng ký tài khoản mới
              </Link>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Login;
