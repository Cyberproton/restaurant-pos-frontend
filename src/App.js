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
} from "./untils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends Component {
  state = {
    cart: [],
    numberOfCart: 0,
  };

  incAmount = (id, n) => {
    let newcart = this.state.cart;
    for (let i = 0; i < newcart.length; i++) {
      if (newcart[i].id === id) {
        if (newcart[i].amount === 1 && n === -1) {
          newcart.splice(i, 1);
          break;
        }
        newcart[i].amount += n;
        break;
      }
    }
    this.setState({ numberOfCart: this.state.numberOfCart + n, cart: newcart });
  };

  handleInc = (item) => {
    let amount = 1;
    let cart = this.state.cart;
    if (item) {
      amount = item.amount;
      cart.push(item);
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
        <div className="App">
          <Header count={this.state.numberOfCart} />
          <Switch>
            <Route
              exact
              path="/cart"
              render={() => (
                <Cart
                  count={this.state.numberOfCart}
                  cart={this.state.cart}
                  onInc={this.handleInc}
                  onincAmount={this.incAmount}
                  onClear={this.handleClear}
                />
              )}
            />
            <Route
              exact
              path="/progress"
              render={() => (
                <Progress
                  count={this.state.numberOfCart}
                  cart={this.state.cart}
                  onInc={this.handleInc}
                  onincAmount={this.incAmount}
                  onClear={this.handleClear}
                />
              )}
            />
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
          </Switch>
          <FooterSide />
        </div>
      </Router>
    );
  }
}

export default App;
