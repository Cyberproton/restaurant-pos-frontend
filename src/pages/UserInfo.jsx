import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import axios from "../axios";

class UserInfo extends Component {
  state = {
    islogout: false,
    user: {},
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

  render() {
    if (this.state.islogout) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="user-info-container">
        <h1>Tran Long An</h1>
        <Row className="user-item-info">
          <Col>Tên đăng nhập :</Col>
          <Col>
            <input disabled placeholder={this.state.user.username} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Họ và Tên :</Col>
          <Col>
            <input disabled placeholder={this.state.user.fullname} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Số điện thoại :</Col>
          <Col>
            <input disabled placeholder={this.state.user.phonenumber} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Ngày sinh :</Col>
          <Col>
            <input disabled placeholder={this.state.user.birthday} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Địa chỉ :</Col>
          <Col>
            <input disabled placeholder={this.state.user.address} />
          </Col>
        </Row>
        <div vertical className="user-button d-flex flex-column">
          <Button className="btn btn-warning">Lịch sử giao dịch</Button>
          <Button className="btn btn-primary">
            <Link to="/setinfo">Cập nhật thông tin</Link>
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
      </Container>
    );
  }
}

export default UserInfo;
