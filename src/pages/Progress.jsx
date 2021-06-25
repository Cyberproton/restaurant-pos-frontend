import React, { Component } from "react";
import { ListGroup, Container, Button, Table } from "react-bootstrap";
import axios from "../axios";
import Payment from "./Payment";

class Progress extends Component {
  state = {
    newOrder: [],
    oldOrder: [],
    processingOrder: [],
    confirmOrder: [],
    cancelOrder: [],
    currentOrder: {},
    isOrder: false,
  };

  UNSAFE_componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/api/ordertest/user`, {
      headers: { token: token },
    });
    const orders = res.data.orders;
    this.setState({
      newOrder: orders.filter((order) => order.state === "new"),
      oldOrder: orders.filter((order) => order.state === "finished"),
      confirmOrder: orders.filter((order) => order.state === "confirmed"),
      processingOrder: orders.filter(
        (order) => order.state === "processing" || order.state === "deliver"
      ),
      cancelOrder: orders.filter((order) => order.state === "cancel"),
    });
  };

  handleCancelOrder = async (_id) => {
    await axios.post(`/api/ordertest/delete`, {
      _id: _id,
    });
    this.getData();
  };

  handlePayment = (order) => {
    this.setState({ currentOrder: order, isOrder: !this.state.isOrder });
  };

  render() {
    if (this.state.isOrder) return <Payment order={this.state.currentOrder} />;
    const listNewOrder =
      this.state.newOrder.length === 0 ? (
        <ListGroup.Item> Chưa có đơn nào</ListGroup.Item>
      ) : (
        this.state.newOrder.map((order, index) => (
          <ListGroup.Item key={index}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Giá</th>
                  <th>SL</th>
                </tr>
              </thead>
              <tbody>
                {order.foods.map((food, index) => (
                  <tr key={index}>
                    <td>{food.name}</td>
                    <td>{food.price}</td>
                    <td>{food.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p> Mã hóa đơn: {order._id}</p>
            <p> Số món: {order.quantity}</p>
            <p> Tổng tiền: {order.payment}</p>
            <p> Bàn số: {order.table}</p>
            <Button
              variant="danger"
              onClick={() => this.handleCancelOrder(order._id)}
            >
              Hủy đơn
            </Button>
          </ListGroup.Item>
        ))
      );

    const listCancelOrder =
      this.state.cancelOrder.length === 0 ? (
        <ListGroup.Item> Chưa có đơn nào</ListGroup.Item>
      ) : (
        this.state.cancelOrder.map((order, index) => (
          <ListGroup.Item key={index}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Giá</th>
                  <th>SL</th>
                </tr>
              </thead>
              <tbody>
                {order.foods.map((food, index) => (
                  <tr key={index}>
                    <td>{food.name}</td>
                    <td>{food.price}</td>
                    <td>{food.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p> Mã hóa đơn: {order._id}</p>
            <p> Số món: {order.quantity}</p>
            <p> Tổng tiền: {order.payment}</p>
            <p> Bàn số: {order.table}</p>
            <p> Lý do hủy: {order.reason}</p>
            <Button
              variant="danger"
              onClick={() => this.handleCancelOrder(order._id)}
            >
              Xóa
            </Button>
          </ListGroup.Item>
        ))
      );

    const listProgressOrder =
      this.state.processingOrder.length === 0 ? (
        <ListGroup.Item> Chưa có đơn nào</ListGroup.Item>
      ) : (
        this.state.processingOrder.map((order, index) => (
          <ListGroup.Item key={index}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Giá</th>
                  <th>SL</th>
                </tr>
              </thead>
              <tbody>
                {order.foods.map((food, index) => (
                  <tr key={index}>
                    <td>{food.name}</td>
                    <td>{food.price}</td>
                    <td>{food.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p> Mã hóa đơn: {order._id}</p>
            <p> Số món: {order.quantity}</p>
            <p> Tổng tiền: {order.payment}</p>
            <p> Bàn số: {order.table}</p>
          </ListGroup.Item>
        ))
      );

    const listOldOrder =
      this.state.oldOrder.length === 0 ? (
        <ListGroup.Item> Chưa có đơn nào</ListGroup.Item>
      ) : (
        this.state.oldOrder.map((order, index) => (
          <ListGroup.Item key={index}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Giá</th>
                  <th>SL</th>
                </tr>
              </thead>
              <tbody>
                {order.foods.map((food, index) => (
                  <tr key={index}>
                    <td>{food.name}</td>
                    <td>{food.price}</td>
                    <td>{food.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p> Mã hóa đơn: {order._id}</p>
            <p> Số món: {order.quantity}</p>
            <p> Tổng tiền: {order.payment}</p>
            <p> Bàn số: {order.table}</p>
            <Button
              variant="danger"
              onClick={() => this.handleCancelOrder(order._id)}
            >
              Xóa
            </Button>
          </ListGroup.Item>
        ))
      );

    const listConfirmOrder =
      this.state.confirmOrder.length === 0 ? (
        <ListGroup.Item> Chưa có đơn nào</ListGroup.Item>
      ) : (
        this.state.confirmOrder.map((order, index) => (
          <ListGroup.Item key={index}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Giá</th>
                  <th>SL</th>
                </tr>
              </thead>
              <tbody>
                {order.foods.map((food, index) => (
                  <tr key={index}>
                    <td>{food.name}</td>
                    <td>{food.price}</td>
                    <td>{food.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p> Mã hóa đơn: {order._id}</p>
            <p> Số món: {order.quantity}</p>
            <p> Tổng tiền: {order.payment}</p>
            <p> Bàn số: {order.table}</p>
            <Button
              variant="danger"
              onClick={() => this.handleCancelOrder(order._id)}
            >
              Hủy đơn
            </Button>{" "}
            <Button variant="success" onClick={() => this.handlePayment(order)}>
              Thanh toán
            </Button>
          </ListGroup.Item>
        ))
      );

    return (
      <Container className="progress-page">
        <h3>Danh sách đơn hàng</h3>
        <ListGroup className="margin-top-50">
          <ListGroup.Item active>Đơn hàng chờ xác nhận</ListGroup.Item>
          {listNewOrder}
        </ListGroup>

        <ListGroup className="margin-top-50">
          <ListGroup.Item variant="info">
            Đơn hàng chờ thanh toán
          </ListGroup.Item>
          {listConfirmOrder}
        </ListGroup>

        <ListGroup className="margin-top-50">
          <ListGroup.Item variant="success">
            Đơn hàng đang thực hiện
          </ListGroup.Item>
          {listProgressOrder}
        </ListGroup>

        <ListGroup className="margin-top-50">
          <ListGroup.Item variant="danger">Đơn hàng đã bị hủy</ListGroup.Item>
          {listCancelOrder}
        </ListGroup>

        <ListGroup className="margin-top-50">
          <ListGroup.Item variant="warning">Lịch sử đơn hàng</ListGroup.Item>
          {listOldOrder}
        </ListGroup>
      </Container>
    );
  }
}

export default Progress;
