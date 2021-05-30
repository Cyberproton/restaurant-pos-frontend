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

  validateForm() {
    // Validate input
    return this.state.user.username && this.state.user.username.length > 0 && this.state.user.password && this.state.user.password.length > 0;
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
                />
              </div>
              <div className="form-group mt-3">
                <label>Ngày sinh</label>
                <input className="form-control" placeholder="Enter birthday" onChange={e => this.handleInputChange('dateofbirth', e)}/>
              </div>
              <div className="form-group mt-3">
                <label>Địa chỉ</label>
                <input className="form-control" placeholder="Enter address" onChange={e => this.handleInputChange('address', e)}/>
              </div>
              <div class="d-grid">
                <button type="submit" className="btn btn-primary btn-block mt-3" disabled={!this.validateForm()}>
                  Đăng ký
                </button>
              </div>
              <p className="text-secondary mt-3">Bằng việc nhấn đăng ký, bạn đã chấp nhận mọi <a href="rules" target="_blank">
                    điều khoản
                  </a> của chúng tôi</p>
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
