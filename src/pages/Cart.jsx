import React, { Component, useState } from "react";
import { Button, Container, Modal, Table, Dropdown, Tabs, TabContent, Tab, Row, Col, ListGroup, Navbar } from "react-bootstrap";
import axios from '../axios'
import CartItem from "../components/CartItem";

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.onClickOrder = this.onClickOrder.bind(this)
    this.onPopup = this.onPopup.bind(this)
    this.onViewClicked = this.onViewClicked.bind(this)

    this.state = {
      cart: props.cart ? props.cart : [],
      foods: [],
      orders: [],
      orderSelected: null,
      isSelected: false,
      isPopup: false,
    }
  }

  componentDidMount() {
    axios
      .get('/api/order')
      .then((res) => {
        const order = res.data.orders
        this.setState({
          orders: order
        })
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get("/api/food")
      .then((res) => {
        this.setState({
          foods: res.data.foods
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const order = this.state.orders.find(x => x._id === this.state.orderSelected)
    const removeOrder = (this.state.isPopup && order) ? this.getPopup(order, this.state.isPopup) : <div />
    return (
      <>
      <div className="container mt-3" size="sm">
        <h4><span role='img' aria-label='accessible-emoji'>🛒</span>Giỏ hàng </h4>
        <CartViewer cart={this.state.cart} foods={this.state.foods}/>
        <hr/>
        <h4><span role='img' aria-label='accessible-emoji'>🛒</span>Đơn hàng </h4>
        <OrderViewer orders={this.state.orders} onClickOrder={this.onClickOrder} remove={order} onPopup={this.onPopup} />
        <hr />
        {removeOrder}
      </div>
      <Navbar fixed="bottom" style={{ backgroundColor: "#fefefe" }} className="mr-0">
        <Row style={{ width: "100%" }}>
          <Col className="d-flex justify-content-center align-items-center">
            <Navbar.Text style={{ color: "black" }}>Số món: 12 <br/> Số lượng: 13</Navbar.Text>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Navbar.Text style={{ color: "black", fontWeight: "bold" }}>Tổng tiền: 120000</Navbar.Text>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button variant="warning" style={{ height: "3rem" }}>Đặt hàng</Button>
          </Col>
        </Row>
    </Navbar>
    </>
    );
  }

  getListOrder = () => {
    if (this.props.count === 0) {
      this.setState({
        isEmpty: true,
      });
    } else {
      const listOrder = this.props.cart;
      this.setState({
        isEmpty: false,
        listOrder: listOrder,
      });
    }
  };

  canceOrder = () => {
    this.props.onClear();
    this.setState({
      isEmpty: true,
      listOrder: [],
    });
  };

  handleOrder = async () => {
    const listOrder = this.state.listOrder;
    let price = 0;
    let quantity = 0;
    for (let item of listOrder) {
      price += item.price * item.amount;
      quantity += item.amount;
    }
    await axios.post(
      `/api/ordertest/add`,
      {
        foods: listOrder,
        table: 1,
        quantity: quantity,
        payment: price,
      },
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    this.props.onClear();
    this.setState({
      isEmpty: true,
      listOrder: [],
    });
  };
}

function CartViewer(props) {
  const items = props.cart.map(item => {
    const index = props.foods.findIndex(food => food._id === item.id);
    if (index < 0) {
      return null;
    }
    const food = props.foods[index];
    return <CartItem key={food._id} food={food} quantity={item.quantity}/>
  });
  return (
    <Container>
      {items}
    </Container>
  );
}

class OrderViewer extends Component {
  render() {
    const order = this.props.order
    const food = order.food
    const checkedRow = this.state.isSelected ? 'table-primary text-dark' : 'table-light text-dark'

    if (order.food === null)
      return null
    else return (
      <tr key={order._id} className={checkedRow} onClick={this.handleClick}>
        <td>{food.name}</td>
        <td>{order.state}</td>
        <td>{order.quantity}</td>
        <td width="12%">{food.price * order.quantity}</td>
      </tr >
    )
  }

  handleClick() {
    const update = this.props.onClickOrder(this.props.order._id, this.state.isSelected);
    if (update){
      this.setState({
        isSelected: !this.state.isSelected
      })
    }
    console.log(this.state.isSelected)
  }
}

function TableView(props) {
  const control = props.control;
  if (control === 0)
    return (
      <React.Fragment>
        <p>
          <i>Có vẻ không có gì ở đây cả, quý khách vui lòng kiểm tra lại nhé</i>
          <span role='img' aria-label='accessible-emoji'>🙄</span>
        </p>
        <br />
      </React.Fragment>
    )
  else return (
    <Table striped bordered size="sm" className="text-center shadow-lg">
      <thead>
        <tr>
          <th>Tên món ăn</th>
          <th>State</th>
          <th>Số lượng</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>{props.ListBy}</tbody>
    </Table>
  )
}
