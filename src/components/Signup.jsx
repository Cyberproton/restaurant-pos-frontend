import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";

class Signup extends Component {
  state = {};
  render() {
    return (
      <Container className="login-form">
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              ĐĂNG KÝ TÀI KHOẢN
            </Card.Title>
            <form>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input className="form-control" placeholder="Enter Username" />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter re-password"
                />
              </div>
              <div className="form-group">
                <label>Họ và tên</label>
                <input className="form-control" placeholder="Enter fullname" />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Ngày sinh</label>
                <input className="form-control" placeholder="Enter birthday" />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input className="form-control" placeholder="Enter address" />
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
                    Chấp nhận các{" "}
                    <a href="rules" target="_blank">
                      điều khoản
                    </a>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Đăng ký
              </button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Signup;
