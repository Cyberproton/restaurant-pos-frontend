import React, { Component } from "react";
import Introduce from "../components/Introduce";
import Search from "../components/Search";

class Home extends Component {
  render() {
    return (
      <>
        <Introduce />
        <Search />
      </>
    );
  }
}

export default Home;
