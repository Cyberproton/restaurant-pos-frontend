<<<<<<< HEAD
import React, { Component, useState } from "react";
import { Alert, Card, Container, Toast, ToastHeader } from "react-bootstrap";
import axios from '../axios'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.setLoginSuccessPopup = this.setLoginSuccessPopup.bind(this)
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

  handleSignup(e) {
    e.preventDefault()
    console.log(this.state.user)
    axios
      .post('/api/user/register', this.state.user)
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
            failureMessage = 'Tên đăng nhập đã tồn tại'
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

  setLoginSuccessPopup(value) {
    this.setState(prev => ({
      loginSuccessPopup: value
    }))
  }

  /*
  <div className="form-group mt-3">
                <label>Nhập lại mật khẩu (*)</label>
                <input
                  required
                  type="password"
                  className="form-control"
                  placeholder="Enter re-password"
                  onChange={e => this.handleInputChange('repassword', e)}
                  pattern=".{6,}"
                />
              </div>
  */

  render() {
    return (
      <Container className="login-form">
        <Alert variant="success" onClose={() => this.setLoginSuccessPopup(false)} show={this.state.loginSuccessPopup} dismissible>
            <p>Đăng ký thành công!</p>
          </Alert>
          <Alert variant="danger" onClose={() => this.setState(prev => ({ loginFailurePopup: false }))} show={this.state.loginFailurePopup} dismissible>
            <p>Đăng ký thất bại!</p>
            <p>Lý do: {this.state.failureMessage}</p>
          </Alert>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              ĐĂNG KÝ TÀI KHOẢN
            </Card.Title>
            <form onSubmit={this.handleSignup}>
              <div className="form-group mt-3">
                <label>Tên đăng nhập (*)</label>
                <input required className="form-control" placeholder="Enter Username" pattern="[A-Za-z0-9]{6,}" onChange={e => this.handleInputChange('username', e)}/>
              </div>
              <div className="mt-2 ms-1 text-secondary" >
                * Ký tự phải là A-Z, a-z hoặc chữ số<br/>
                * Tối thiểu 6 ký tự
              </div>
              <div className="form-group mt-3">
                <label>Mật khẩu (*)</label>
                <input
                  required
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={e => this.handleInputChange('password', e)}
                  pattern=".{6,}"
                />
              </div>
              <div className="mt-2 ms-1">
                <text className="text-secondary">* Tối thiểu 6 ký tự</text>
              </div>
              <div className="form-group mt-3">
                <label>Họ và tên</label>
                <input className="form-control" placeholder="Enter fullname" />
              </div>
              <div className="form-group mt-3">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  placeholder="Enter phone number"
                  onChange={e => this.handleInputChange('phonenumber', e)}
=======
import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");

  function validateForm() {
    // Validate input
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    console.log(username, password, fullname);
    event.preventDefault();
  }

  return (
    <Container className="login-form">
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            ĐĂNG KÝ TÀI KHOẢN
          </Card.Title>
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
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label>Nhập lại mật khẩu</label>
              <input
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                className="form-control"
                placeholder="Enter re-password"
              />
            </div>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Enter fullname"
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                className="form-control"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group">
              <label>Ngày sinh</label>
              <input
                className="form-control"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Enter birthday"
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
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
                  Chấp nhận các{" "}
                  <a href="rules" target="_blank">
                    điều khoản
                  </a>
                </label>
              </div>
<<<<<<< HEAD
              <div className="form-group mt-3">
                <label>Ngày sinh</label>
                <input className="form-control" placeholder="Enter birthday" onChange={e => this.handleInputChange('dateofbirth', e)}/>
              </div>
              <div className="form-group mt-3">
                <label>Địa chỉ</label>
                <input className="form-control" placeholder="Enter address" onChange={e => this.handleInputChange('address', e)}/>
              </div>
              <div class="d-grid">
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Đăng ký
                </button>
              </div>
              <p className="text-secondary mt-3">Bằng việc nhấn đăng ký, bạn đã chấp nhận mọi điều khoản của chúng tôi</p>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

function Success(props) {
  return (
    <Toast onClose={() => { props.setLoginSuccessPopup(false) }} show={props.show} delay={3000} autohide>
      <ToastHeader closeButton={false}>
        <strong className="me-auto">Thông báo</strong>
      </ToastHeader>
      <Toast.Body>Đăng ký thành công!</Toast.Body>
    </Toast>
  );
}

export default Signup;
=======
            </div>
            <button
              type="submit"
              disabled={!validateForm()}
              className="btn btn-primary btn-block"
            >
              Đăng ký
            </button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
>>>>>>> 97d3c7692bb8811401f1076bb74c12b150564ebb
