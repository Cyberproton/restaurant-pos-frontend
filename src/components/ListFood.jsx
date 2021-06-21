import React, { Component } from "react";
import CardFood from "./CardFood";
import axios from "../axios";
import { Row } from "react-bootstrap";

class ListFood extends Component {
  state = {
    foods: [],
  };

  UNSAFE_componentWillMount() {
    this.getFoods();
  }

  getFoods = async () => {
    const { data } = await axios.get(`/api/food`);
    this.setState({
      foods: data.foods,
    });
  };

  render() {
    const foods = this.state.foods;
    const listFood = foods.map((food) => (
      <CardFood food={food} key={food._id} onInc={this.props.onInc} />
    ));
    return <Row className="list-food">{listFood}</Row>;
  }
}

export default ListFood;
