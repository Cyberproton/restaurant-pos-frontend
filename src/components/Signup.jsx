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
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Chấp nhận các{" "}
                  <a href="rules" target="_blank">
                    điều khoản
                  </a>
                </label>
              </div>
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
