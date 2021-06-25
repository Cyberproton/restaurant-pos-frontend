import React, { Component } from "react";
import {
  Header,
  Home,
  Cart,
  Login,
  Register,
  Rules,
  FooterSide,
  UserInfo,
  FoodDetail,
  Progress,
  Gallery,
  Payment,
} from "./untils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends Component {
  state = {
    cart: [],
    numberOfCart: 0,
    table: 1,
  };

  incAmount = (_id, n) => {
    let newcart = this.state.cart;
    const index = newcart.findIndex((obj) => obj._id === _id);
    newcart[index].amount += n;
    if (newcart[index].amount === 0) newcart.splice(index, 1);
    this.setState({ numberOfCart: this.state.numberOfCart + n, cart: newcart });
  };

  handleInc = (item) => {
    let amount = 1;
    let cart = this.state.cart;
    if (item) {
      amount = item.amount;
      const index = cart.findIndex((obj) => obj._id === item._id);
      if (index !== -1) cart[index].amount += item.amount;
      else cart.push(item);
    }
    this.setState({
      numberOfCart: this.state.numberOfCart + amount,
      cart: cart,
    });
  };

  handleClear = () => {
    this.setState({
      cart: [],
      numberOfCart: 0,
    });
  };

  render() {
    return (
      <Router>
        <Header count={this.state.numberOfCart} />
        <Switch>
          <Route
            exact
            path="/cart"
            render={() => (
              <Cart
                count={this.state.numberOfCart}
                cart={this.state.cart}
                onincAmount={this.incAmount}
                onClear={this.handleClear}
              />
            )}
          />
          <Route exact path="/progress" component={Progress} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/"
            render={() => <Home onInc={this.handleInc} />}
          />
          <Route
            exact
            path="/food/:id"
            render={() => <FoodDetail onInc={this.handleInc} />}
          />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/user" component={UserInfo} />
          <Route exact path="/rules" component={Rules} />
          <Route exact path="/payment" component={Payment} />
        </Switch>
        <Gallery />
        <FooterSide />
      </Router>
    );
  }
}

export default App;
