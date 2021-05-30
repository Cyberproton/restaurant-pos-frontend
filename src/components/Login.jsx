<<<<<<< HEAD
import React, { Component } from "react";
import { Card, Container, Alert } from "react-bootstrap";
=======
import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
>>>>>>> 97d3c7692bb8811401f1076bb74c12b150564ebb
import { Link } from "react-router-dom";
import axios from '../axios'

<<<<<<< HEAD
class Login extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  state = {
    user: {},
    loginSuccessPopup: false,
    loginFailurePopup: false,
    failureMessage: ''
  };

  handleInputChange(name, e) {
    const target = e.target
    const value = target.value
    const user = this.state.user
    user[name] = value

    this.setState(prev => ({
      user: user
    }))
  }

  handleLogin(e) {
    e.preventDefault()
    console.log(this.state.user)
    axios
      .post('/api/user/login', this.state.user)
      .then(res => {
        if (res.status / 200 === 1) {
          this.setState(prev => ({
            loginSuccessPopup: true,
            user: {}
          }))
        } 
        else {
        }
      })
      .catch(err => {
        let failureMessage = ''
        if (err.response.status / 400 === 1) {
          failureMessage = 'Tên đăng nhập hoặc mật khẩu không tồn tại'
        } else {
          failureMessage = 'Lỗi hệ thống'
        }

        this.setState(prev => ({
          loginFailurePopup: true,
          failureMessage: failureMessage,
          user: {}
        }))
      })
  }

  render() {
    return (
      <Container className="login-form">
        <Card>
          {/* <Card.Img variant="top" src=""/> */}
          <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>ĐĂNG NHẬP</Card.Title>
            <form onSubmit={this.handleLogin}>
              <div className="form-group mt-3">
                <label>Tên đăng nhập</label>
                <input className="form-control" placeholder="Enter Username" 
                  onChange={e => this.handleInputChange('username', e)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={e => this.handleInputChange('password', e)}
=======
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
>>>>>>> 97d3c7692bb8811401f1076bb74c12b150564ebb
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Lưu thông tin đăng nhập
                </label>
              </div>
<<<<<<< HEAD
              <div className="form-group mt-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input me-2"
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
              <div class="d-grid">
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Đăng nhập
                </button>
                <Link to="signup" className="btn btn-warning btn-block mt-3">
                  Đăng ký tài khoản mới
                </Link>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
=======
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
>>>>>>> 97d3c7692bb8811401f1076bb74c12b150564ebb
}
