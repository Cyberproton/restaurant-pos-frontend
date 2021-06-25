import React, { Component } from "react";
import { Button, InputGroup, FormControl, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class CardFood extends Component {
  state = {
    countOrder: 1,
    selectOrder: false,
    isView: false,
  };

  handleOrder = () => {
    this.setState({
      selectOrder: !this.state.selectOrder,
    });
  };

  handleRai = () => {
    this.setState({
      countOrder: this.state.countOrder + 1,
    });
  };

  handleDec = () => {
    if (this.state.countOrder > 0) {
      this.setState({
        countOrder: this.state.countOrder - 1,
      });
    }
  };

  addToCart = () => {
    this.handleOrder();
    let item = {
      amount: this.state.countOrder,
      _id: this.props.food._id,
      name: this.props.food.name,
      price: this.props.food.price,
    };
    this.props.onInc(item);
  };

  viewFood = () => {
    this.setState({ isView: true });
  };

  render() {
    if (this.state.isView === true) {
      const url = "/food/" + this.props.food._id;
      return <Redirect to={url} />;
    }

    const food = this.props.food;
    const activeButton =
      food.lock === true ? (
        <Button variant="secondary" disabled>
          Hết
        </Button>
      ) : (
        <Button variant="danger" onClick={this.handleOrder}>
          Đặt
        </Button>
      );
    return (
      <div className="card-food">
        <div className="card-order" hidden={!this.state.selectOrder}>
          <h5>Số lượng</h5>
          <InputGroup className="mb-5">
            <InputGroup.Prepend>
              <Button variant="warning" onClick={this.handleDec}>
                -
              </Button>
            </InputGroup.Prepend>
            <FormControl
              placeholder={this.state.countOrder}
              aria-label="numberFood"
              style={{ textAlign: "center" }}
            />
            <InputGroup.Append>
              <Button variant="warning" onClick={this.handleRai}>
                +
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="d-flex justify-content-around card-food-button">
            <Button variant="info" size="sm" onClick={this.handleOrder}>
              Hủy
            </Button>
            <Button variant="danger" size="sm" onClick={this.addToCart}>
              Đặt
            </Button>
          </div>
        </div>
        <img variant="top" src={food.imageUrl} alt="" />
        <h6>{food.name}</h6>
        <div className="d-flex justify-content-between">
          <Button variant="outline-success" size="sm">
            {food.type}
          </Button>
          <Button variant="outline-warning" size="sm">
            {food.regions}
          </Button>
        </div>

        <p className="mt-2">Giá : {food.price} VNĐ</p>
        <div className="d-flex justify-content-around card-food-button">
          <Button variant="info" onClick={this.viewFood}>
            Xem
          </Button>
          {activeButton}
        </div>
      </div>
    );
  }
}

export default CardFood;
