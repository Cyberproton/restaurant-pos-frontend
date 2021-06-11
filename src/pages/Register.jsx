import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "../axios";

class Register extends Component {
  state = {
    isRegisted: false,
    username: "",
    password: "",
    repassword: "",
    fullname: "",
    phonenumber: "",
    birthday: "",
    address: "",
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      password,
      repassword,
      fullname,
      phonenumber,
      birthday,
      address,
    } = this.state;
    if (username.length === 0) alert("Bạn phải nhập tên đăng nhập!");
    else if (username.length < 6) alert("Tên đăng nhập phải dài hơn 5 ký tự!");
    else if (password.length === 0) alert("Bạn phải nhập mật khẩu!");
    else if (password.length < 6) alert("Mật khẩu phải dài hơn 5 ký tự!");
    else if (password !== repassword) alert("Nhập lại mật khẩu không khớp!");
    else {
      axios
        .post(`/api/user/register`, {
          username,
          password,
          repassword,
          fullname,
          phonenumber,
          birthday,
          address,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          this.setState({
            isRegisted: true,
          });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    }
  };

  render() {
    if (this.state.isRegisted) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="login-form">
        <Card>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              ĐĂNG KÝ TÀI KHOẢN
            </Card.Title>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group mt-3">
                <label>Tên đăng nhập</label>
                <input
                  className="form-control"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Nhập lại mật khẩu</label>
                <input
                  type="password"
                  name="repassword"
                  className="form-control"
                  placeholder="Enter re-password"
                  value={this.state.repassword}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Họ và tên</label>
                <input
                  className="form-control"
                  name="fullname"
                  placeholder="Enter fullname"
                  value={this.state.fullname}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  name="phonenumber"
                  placeholder="Enter phone number"
                  value={this.state.phonenumber}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Ngày sinh</label>
                <input
                  className="form-control"
                  name="birthday"
                  placeholder="Enter birthday"
                  value={this.state.birthday}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  name="address"
                  placeholder="Enter address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="d-grid btn btn-primary mt-3 signup-button"
              >
                Đăng ký
              </button>
              <p className="text-secondary mt-3">
                Bằng việc nhấn đăng ký, bạn đã chấp nhận mọi{" "}
                <Link to="/rules" target="_blank">
                  điều khoản
                </Link>{" "}
                của chúng tôi
              </p>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Register;
