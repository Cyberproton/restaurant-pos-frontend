import React, { Component } from "react";
import Introduce from "../components/Introduce";
import Search from "../components/Search";
import FoodMenu from "../components/FoodMenu";
import ListFood from "../components/ListFood";

class Home extends Component {
  state = {
    searchString: "",
    selectType: "",
    selectRegions: "",
    selectSort: "",
  };

  handleRegions = (value) => {
    this.setState({ selectRegions: value });
  };

  handleType = (value) => {
    this.setState({ selectType: value });
  };

  handleSort = (value) => {
    this.setState({ selectSort: value });
  };

  handleSearch = (value) => {
    console.log(value);
    this.setState({ searchString: value });
  };

  render() {
    return (
      <>
        <Introduce />
        <FoodMenu />
        <Search
          handleSearch={this.handleSearch}
          handleRegions={this.handleRegions}
          handleType={this.handleType}
          handleSort={this.handleSort}
        />
        <ListFood
          onInc={this.props.onInc}
          searchString={this.state.searchString}
          selectType={this.state.selectType}
          selectRegions={this.state.selectRegions}
          selectSort={this.state.selectSort}
        />
      </>
    );
  }
}

export default Home;
