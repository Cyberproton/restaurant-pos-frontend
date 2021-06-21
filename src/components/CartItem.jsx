import React, { Component } from "react";
import { ListGroup, Container, Button, Row, Col } from "react-bootstrap";

class CartItem extends Component {
  state = {};
  render() {
    return (
      <Container className="cart-order">
        <h2>Giỏ hàng</h2>
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>
            <Row>
              <Col xs={6}>Tên món</Col>
              <Col xs={1}>SL</Col>
              <Col xs={2}>Giá</Col>
              <Col></Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <Row>
              <Col xs={6}>Gà chiên nước mắm</Col>
              <Col xs={1}>2</Col>
              <Col xs={2}>123.000</Col>
              <Col xs={3}>
                <Button variant="warning">-</Button>
                <Button variant="warning">+</Button>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <Row>
              <Col xs={6}>Gà chiên nước mắm</Col>
              <Col xs={1}>2</Col>
              <Col xs={2}>123.000</Col>
              <Col xs={3}>
                <Button variant="warning">-</Button>
                <Button variant="warning">+</Button>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <Row>
              <Col xs={6}>Gà chiên nước mắm</Col>
              <Col xs={1}>2</Col>
              <Col xs={2}>123.000</Col>
              <Col xs={3}>
                <Button variant="warning">-</Button>
                <Button variant="warning">+</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <h6>Số loại món ăn: 12</h6>
        <h6>Tổng số lượng món ăn: 12</h6>
        <h6>Tổng giá tiền: 12.000.000 VND</h6>

        <div className="d-flex justify-content-around">
          <Button variant="danger">Đặt ngay</Button>
          <Button variant="info">Hủy đặt</Button>
        </div>
      </Container>
    );
  }
}

export default CartItem;
