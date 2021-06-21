import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "../axios";

class UserInfo extends Component {
  state = {
    islogout: false,
    isModify: false,
    user: {},
    username: "",
    password: "",
    newpassword: "",
    renewpassword: "",
    fullname: "",
    phonenumber: "",
    birthday: "",
    address: "",
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true,
    });
  };

  UNSAFE_componentWillMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/api/user`, {
      headers: { token: token },
    });
    this.setState({
      user: {
        username: res.data.username,
        fullname: res.data.fullname,
        phonenumber: res.data.phonenumber,
        birthday: res.data.birthday,
        address: res.data.address,
      },
    });
  };

  deleteAccount = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .delete(`/api/user`, {
        headers: { token: token },
      })
      .then((res) => {
        localStorage.clear();
        this.setState({
          islogout: true,
        });
      });
  };

  handleModify = () => {
    this.setState({ isModify: !this.state.isModify });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  handleUpdates = () => {
    const token = localStorage.getItem("token");
    const {
      username,
      password,
      newpassword,
      renewpassword,
      fullname,
      phonenumber,
      birthday,
      address,
    } = this.state;
    if (username.length === 0) alert("Bạn phải nhập tên đăng nhập!");
    else if (username.length < 6) alert("Tên đăng nhập phải dài hơn 5 ký tự!");
    else if (newpassword !== renewpassword)
      alert("Nhập lại mật khẩu mới không khớp!");
    else {
      axios
        .put(
          `/api/user`,
          {
            username,
            password,
            newpassword,
            fullname,
            phonenumber,
            birthday,
            address,
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          alert("Thay đổi thành công !");
          this.setState({
            username: "",
            password: "",
            newpassword: "",
            renewpassword: "",
            fullname: "",
            phonenumber: "",
            birthday: "",
            address: "",
          });
          this.handleModify();
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    }
  };

  render() {
    if (this.state.islogout) {
      return <Redirect to="/" />;
    }

    const isModify = this.state.isModify;

    const showButton = isModify ? (
      <div>
        <div className="user-button d-flex flex-column">
          <Button className="btn btn-primary" onClick={this.handleUpdates}>
            Cập nhật
          </Button>
          <Button className="btn btn-danger" onClick={this.handleModify}>
            Hủy bỏ
          </Button>
        </div>
      </div>
    ) : (
      <div>
        <div className="user-button d-flex flex-column">
          <Button className="btn btn-primary" onClick={this.handleModify}>
            Cập nhật thông tin
          </Button>
          <Button className="btn btn-danger" onClick={this.handleLogout}>
            Đăng xuất
          </Button>
        </div>
        <Button
          className="btn btn-danger delete-button-account"
          onClick={this.deleteAccount}
        >
          Xoá bỏ tài khoản
        </Button>
      </div>
    );

    return (
      <Container className="user-info-container">
        <h1>Tran Long An</h1>
        <Row className="user-item-info">
          <Col>Tên đăng nhập :</Col>
          <Col>
            <input
              name="username"
              disabled={!isModify}
              placeholder={this.state.user.username}
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        {isModify && (
          <div>
            <Row className="user-item-info">
              <Col>Mật khẩu cũ :</Col>
              <Col>
                <input
                  type="password"
                  name="password"
                  disabled={!isModify}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row className="user-item-info">
              <Col>Mật khẩu mới :</Col>
              <Col>
                <input
                  type="password"
                  name="newpassword"
                  disabled={!isModify}
                  value={this.state.newpassword}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row className="user-item-info">
              <Col>Xác nhận mật khẩu :</Col>
              <Col>
                <input
                  type="password"
                  name="renewpassword"
                  disabled={!isModify}
                  value={this.state.renewpassword}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
          </div>
        )}

        <Row className="user-item-info">
          <Col>Họ và Tên :</Col>
          <Col>
            <input
              disabled={!isModify}
              name="fullname"
              placeholder={this.state.user.fullname}
              value={this.state.fullname}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Số điện thoại :</Col>
          <Col>
            <input
              disabled={!isModify}
              name="phonenumber"
              placeholder={this.state.user.phonenumber}
              value={this.state.phonenumber}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Ngày sinh :</Col>
          <Col>
            <input
              disabled={!isModify}
              name="birthday"
              placeholder={this.state.user.birthday}
              value={this.state.birthday}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Địa chỉ :</Col>
          <Col>
            <input
              disabled={!isModify}
              name="address"
              placeholder={this.state.user.address}
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        {showButton}
      </Container>
    );
  }
}

export default UserInfo;
