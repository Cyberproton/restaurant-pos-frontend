import React, { Component } from "react";
import { Card, Container, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from '../axios'
import { checkLogin } from "../untils/functions";

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
    failureMessage: '',
    isLoggedIn: false,
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
    
    const username = this.state.user.username;
    const password = this.state.user.password;

    if (!username) {
      this.setState({
        loginFailurePopup: true,
        failureMessage: "Bạn cần nhập tên tài khoản",
        user: {}
      });
      return;
    }

    if (!password) {
      this.setState(prev => ({
        loginFailurePopup: true,
        failureMessage: "Bạn cần nhập mật khẩu",
        user: { username: prev.user.username }
      }));
      return;
    }

    axios
      .post('/api/user/login', this.state.user)
      .then(res => {
        localStorage.setItem("token", res.data)
        this.setState(prev => ({
          loginSuccessPopup: true,
          user: {},
          isLoggedIn: true,
        }))
      })
      .catch(err => {
        let failureMessage = ''
        if (!err.response) {
          failureMessage = 'Lỗi hệ thống'
        } else if (err.response.status / 400 === 1) {
          failureMessage = 'Tên đăng nhập hoặc mật khẩu không tồn tại'
        } else {
          failureMessage = err.response.message;
        }

        this.setState(prev => ({
          loginFailurePopup: true,
          failureMessage: failureMessage,
          user: {
            username: prev.user.username
          }
        }))
      })

    document.getElementById("input-login-password").value = "";
  }

  render() {
    if (checkLogin()) {
      return <Redirect to="/user"/>
    }

    return (
      <Container fluid>
      <Container className="mt-5">
        <Alert variant="success" onClose={() => this.setState(prev => ({ loginSuccessPopup: false }))} show={this.state.loginSuccessPopup} dismissible>
          <p>Đăng nhập thành công!</p>
        </Alert>
        <Alert variant="danger" onClose={() => this.setState(prev => ({ loginFailurePopup: false }))} show={this.state.loginFailurePopup} dismissible>
          <p>Đăng nhập thất bại!</p>
          <p>Lý do: {this.state.failureMessage}</p>
        </Alert>
      </Container>
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
                  id="input-login-password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={e => this.handleInputChange('password', e)}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Đăng nhập
                </button>
                <Link to="register" className="btn btn-warning btn-block mt-3 text-dark">
                  Đăng ký tài khoản mới
                </Link>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Container>
      </Container>
    );
  }
}

export default Login
