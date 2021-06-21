import React, { Component } from "react";
import Introduce from "../components/Introduce";
import Search from "../components/Search";
import ListFood from "../components/ListFood";

class Home extends Component {
  render() {
    return (
      <>
        <Introduce />
        <Search />
        <ListFood onInc={this.props.onInc} />
      </>
    );
  }
}

export default Home;
