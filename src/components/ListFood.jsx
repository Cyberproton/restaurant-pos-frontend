import React, { Component } from "react";
import CardFood from "./CardFood";
import axios from "../axios";
import { Row } from "react-bootstrap";
import { compareInc, compareDec } from "../untils/functions";

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
    let listFood = this.state.foods;
    if (this.props.searchString !== "")
      listFood = listFood.filter((food) =>
        food.name.toLowerCase().includes(this.props.searchString.toLowerCase())
      );
    if (this.props.selectType !== "")
      listFood = listFood.filter((food) => food.type === this.props.selectType);
    if (this.props.selectRegions !== "")
      listFood = listFood.filter(
        (food) => food.regions === this.props.selectRegions
      );

    if (this.props.selectSort === "Giá tăng dần")
      listFood = listFood.sort(compareInc);
    else if (this.props.selectSort === "Giá giảm dần")
      listFood = listFood.sort(compareDec);

    listFood = listFood.map((food) => (
      <CardFood food={food} key={food._id} onInc={this.props.onInc} />
    ));
    return <Row className="list-food">{listFood}</Row>;
  }
}

export default ListFood;
