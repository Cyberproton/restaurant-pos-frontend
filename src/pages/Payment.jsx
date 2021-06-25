import React, { Component } from "react";
import {
  Card,
  Nav,
  Button,
  Container,
  ListGroup,
  Table,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "../axios";

class Payment extends Component {
  state = {
    isOrder: false,
    selectPayment: "cast",
  };

  handleSelectOrder = (typeOrder) => {
    this.setState({ selectPayment: typeOrder });
  };

  handleCancelOrder = () => {
    this.setState({ isOrder: true });
  };

  handlePayment = async () => {
    await axios.post(`/api/order/payment`, {
      _id: this.props.order._id,
      paymentMethod: this.state.selectPayment,
    });
    this.setState({ isOrder: true });
  };

  render() {
    if (this.state.isOrder) return <Redirect to="/" />;
    let selectPayment = this.state.selectPayment;
    let payment;
    if (selectPayment === "cast") {
      payment = (
        <Card.Body>
          <Card.Title>Thanh toán bằng tiền mặt</Card.Title>
          <Card.Text>
            Vui lòng chờ nhân viên cửa hàng đến và xác nhận thanh toán
          </Card.Text>
          <Button variant="danger" onClick={this.handleCancelOrder}>
            Hủy thanh toán
          </Button>
        </Card.Body>
      );
    } else if (selectPayment === "momo") {
      payment = (
        <Card.Body>
          <Card.Title>Thanh toán qua ví điện tử MOMO</Card.Title>
          <Card.Text>
            Kết nối đến ví Momo và thực hiện thanh toán nhanh chóng tại chỗ
          </Card.Text>
          <Button variant="success" onClick={this.handlePayment}>
            Thanh toán
          </Button>{" "}
          <Button variant="danger" onClick={this.handleCancelOrder}>
            Hủy thanh toán
          </Button>
        </Card.Body>
      );
    } else {
      payment = (
        <Card.Body>
          <Card.Title>Thanh toán qua Internet Banking</Card.Title>
          <Card.Text>
            Thanh toán trực tuyến qua tài khoản Internet Banking của bạn
          </Card.Text>
          <Button variant="success" onClick={this.handlePayment}>
            Thanh toán
          </Button>{" "}
          <Button variant="danger" onClick={this.handleCancelOrder}>
            Hủy thanh toán
          </Button>
        </Card.Body>
      );
    }

    return (
      <Container className="payment">
        <h2>THANH TOÁN ĐƠN HÀNG</h2>
        <ListGroup.Item>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tên món</th>
                <th>Giá</th>
                <th>SL</th>
              </tr>
            </thead>
            <tbody>
              {this.props.order.foods.map((food, index) => (
                <tr key={index}>
                  <td>{food.name}</td>
                  <td>{food.price}</td>
                  <td>{food.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p> Mã hóa đơn: {this.props.order._id}</p>
          <p> Số món: {this.props.order.quantity}</p>
          <p> Tổng tiền: {this.props.order.payment}</p>
          <p> Bàn số: {this.props.order.table}</p>
        </ListGroup.Item>
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link onClick={() => this.handleSelectOrder("cast")}>
                  Tiền mặt
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => this.handleSelectOrder("momo")}>
                  Momo
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => this.handleSelectOrder("banking")}>
                  Chuyển khoản
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          {payment}
        </Card>
      </Container>
    );
  }
}

export default Payment;
