import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    console.log(username, password);
    event.preventDefault();
  }

  return (
    <Container className="login-form">
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>ĐĂNG NHẬP</Card.Title>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <label className="custom-control-label" htmlFor="customCheck1">
                  Lưu thông tin đăng nhập
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={!validateForm()}
              className="btn btn-primary btn-block"
            >
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
