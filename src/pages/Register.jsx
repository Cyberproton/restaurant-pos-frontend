import React, { Component, useState } from "react";
import { Alert, Card, Container, Toast, ToastHeader } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from '../axios'
import { checkLogin, getDate, formatDate } from "../untils/functions";

class Register extends Component {
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

  dateInputChange(date) {
    const user = this.state.user;
    user.birthday = formatDate(date);

    this.setState({
      user: user
    });
  }

  clearPasswordInputs() {
    document.getElementById("register-password-input").value = "";
    document.getElementById("register-repassword-input").value = "";
  }

  handleSignup(e) {
    e.preventDefault()
    
    if (checkLogin()) {
      this.setState({
        isLoggedIn: true
      });
    }

    const user = this.state.user;
    const body = {};
    const username = user.username;
    const password = user.password;
    const repassword = user.repassword;

    if (!username || !username.match("[A-Za-z0-9]{6,}")) {
      if (password) {
        delete user.password;
      }
      if (repassword) {
        delete user.repassword;
      }
      this.setState({
        loginFailurePopup: true,
        failureMessage: "Tên đăng nhập không hợp lệ",
        user: user,
      });
      this.clearPasswordInputs();
      return;
    }

    if (!password || !password.match(".{6,}")) {
      if (password) {
        delete user.password;
      }
      if (repassword) {
        delete user.repassword;
      }
      this.setState({
        loginFailurePopup: true,
        failureMessage: "Mật khẩu không hợp lệ",
        user: user,
      });
      this.clearPasswordInputs();
      return;
    }

    if (password !== repassword) {
      if (password) {
        delete user.password;
      }
      if (repassword) {
        delete user.repassword;
      }
      this.setState({
        loginFailurePopup: true,
        failureMessage: "Mật khẩu và nhập lại mật khẩu không trùng nhau",
        user: user,
      });
      this.clearPasswordInputs();
      return;
    }

    const fullname = this.state.user.fullname;
    if (fullname && fullname.trim()) {
      body.fullname = fullname;
    }
    const phonenumber = this.state.user.phonenumber;
    if (phonenumber && phonenumber.trim()) {
      body.phonenumber = phonenumber;
    }
    const birthday = this.state.user.birthday;
    if (birthday && birthday.trim()) {
      body.birthday = birthday;
    }
    const address = this.state.user.address;
    if (address && address.trim()) {
      body.address = address;
    }

    body.username = username;
    body.password = password;
    body.repassword = repassword;

    axios
      .post('/api/user/register', body)
      .then(res => {
        this.setState(prev => ({
          loginSuccessPopup: true,
          user: {}
        }));
        this.clearPasswordInputs();
      })
      .catch(err => {
        let failureMessage = ''
        if (!err.response) {
          failureMessage = 'Lỗi hệ thống'
        } else if (err.response.message && err.response.message.includes("Username already")) {
          failureMessage = 'Tên đăng nhập đã tồn tại'
        } else {
          failureMessage = err.response.message;
        }

        this.setState(prev => ({
          loginFailurePopup: true,
          failureMessage: failureMessage,
          user: {}
        }));

        this.clearPasswordInputs();
      })
  }

  setLoginSuccessPopup(value) {
    this.setState(prev => ({
      loginSuccessPopup: value
    }))
  }

  render() {
    if (checkLogin()) {
      return <Redirect to="/user"/>
    }

    const user = this.state.user;

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
                <input 
                  className="form-control" 
                  placeholder="Nhập tên đăng nhập" 
                  onChange={e => this.handleInputChange('username', e)}/>
              </div>
              <div className="mt-2 ms-1 text-secondary" >
                * Ký tự phải là A-Z, a-z hoặc chữ số<br/>
                * Tối thiểu 6 ký tự
              </div>
              <div className="form-group mt-3">
                <label>Mật khẩu (*)</label>
                <input
                  id="register-password-input"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={e => this.handleInputChange('password', e)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Nhập lại mật khẩu (*)</label>
                <input
                  id="register-repassword-input"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={e => this.handleInputChange('repassword', e)}
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
                <ReactDatePicker 
                  selected={getDate(user.birthday)} 
                  onChange={(date) => this.dateInputChange(date)}
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày sinh"
                />
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

export default Register;
