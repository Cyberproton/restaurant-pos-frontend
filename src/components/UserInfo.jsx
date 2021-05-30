import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

class UserInfo extends Component {
  render() {
    return (
      <Container className="user-info-container">
        <h1>{this.props.fullname}</h1>
        <Row className="user-item-info">
          <Col>Tên đăng nhập :</Col>
          <Col>
            <input disabled placeholder={this.props.username} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Họ và Tên :</Col>
          <Col>
            <input disabled placeholder={this.props.fullname} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Số điện thoại :</Col>
          <Col>
            <input disabled placeholder={this.props.phonenumber} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Ngày sinh :</Col>
          <Col>
            <input disabled placeholder={this.props.birthday} />
          </Col>
        </Row>
        <Row className="user-item-info">
          <Col>Địa chỉ :</Col>
          <Col>
            <input disabled placeholder={this.props.address} />
          </Col>
        </Row>
        <Button className="btn btn-warning">Sửa đổi thông tin</Button>

        <Button className="btn btn-primary">Lịch sử giao dịch</Button>

        <Button className="btn btn-danger">Đăng xuất</Button>
      </Container>
    );
  }
}

export default UserInfo;
