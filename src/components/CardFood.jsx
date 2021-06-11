import React, { Component } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

class CardFood extends Component {
  state = {
    countOrder: 1,
    selectOrder: false,
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
      id: this.props.food._id,
      name: this.props.food.name,
      price: this.props.food.price,
    };
    this.props.onInc(item);
  };

  render() {
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
        <img variant="top" src={this.props.food.imageUrl} alt="" />
        <h6>{this.props.food.name}</h6>
        <div className="d-flex justify-content-between">
          <Button variant="outline-success" size="sm">
            {this.props.food.type}
          </Button>
          <Button variant="outline-warning" size="sm">
            {this.props.food.regions}
          </Button>
        </div>

        <p className="mt-2">{this.props.food.price} VNĐ</p>
        <div className="d-flex justify-content-around card-food-button">
          <Button variant="info">Xem</Button>
          <Button variant="danger" onClick={this.handleOrder}>
            Đặt
          </Button>
        </div>
      </div>
    );
  }
}

export default CardFood;
