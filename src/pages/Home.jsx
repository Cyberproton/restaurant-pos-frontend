import React, { Component } from "react";
import Introduce from "../components/Introduce";
import Search from "../components/Search";
import FoodMenu from "../components/FoodMenu";

class Home extends Component {
  render() {
    return (
      <>
        <Introduce />
        <FoodMenu />
      </>
    );
  }
}

export default Home;
