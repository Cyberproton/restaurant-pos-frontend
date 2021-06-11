import React, { Component } from "react";
import { ListGroup, Container, Button, Row, Col } from "react-bootstrap";

class Cart extends Component {
  state = {
    isEmpty: true,
    listOrder: [],
  };

  UNSAFE_componentWillMount() {
    this.getListOrder();
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

  render() {
    if (this.state.isEmpty) {
      return (
        <div className="cart-empty">
          <h1>Bạn chưa đặt món nào</h1>;
          <img
            src="https://stlukesokc.org/wp-content/uploads/2017/05/empty-plate.jpg"
            alt=""
          />
        </div>
      );
    }
    const listOrder = this.state.listOrder;
    // console.log(listOrder);
    let allprice = 0;
    let count = 0;
    let allcount = 0;
    for (let item of listOrder) {
      allprice += item.price * item.amount;
      count += 1;
      allcount += item.amount;
    }

    const listfood = listOrder.map((food) => (
      <ListGroup.Item as="li" key={food.id}>
        <Row>
          <Col xs={6}>{food.name}</Col>
          <Col xs={1}>{food.amount}</Col>
          <Col xs={2}>{food.price * food.amount}</Col>
          <Col xs={3}>
            <Button
              variant="warning"
              onClick={() => this.props.onincAmount(food.id, -1)}
            >
              -
            </Button>
            <Button
              variant="warning"
              onClick={() => this.props.onincAmount(food.id, 1)}
            >
              +
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    ));
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
          {listfood}
        </ListGroup>

        <h6>Số loại món ăn: {count}</h6>
        <h6>Tổng số lượng món ăn: {allcount}</h6>
        <h6>Tổng giá tiền: {allprice} VND</h6>

        <div className="d-flex justify-content-around">
          <Button variant="danger">Đặt ngay</Button>
          <Button variant="info" onClick={this.canceOrder}>
            Hủy đặt
          </Button>
        </div>
      </Container>
    );
  }
}

export default Cart;
