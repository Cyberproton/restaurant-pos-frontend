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
  FoodMenu,
  FoodDetail,
  NotFound404,
} from "./untils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.cookie = new Cookies();
    const cart = this.cookie.get("cart");
    this.state = {
      cart: cart ? cart : [],
      numberOfFoods: 0,
    };
  }

  addItem(item) {
    const cart = this.state.cart;
    const exist = this.state.cart.find(it => it._id === item._id);
    if (exist) {
      exist.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    this.setState({
      cart: cart,
    });
    this.cookie.set("cart", cart, { maxAge: 60 * 60 * 24 * 3 });
  }

  removeItem(item) {
    const cart = this.state.cart;
    const exist = this.state.cart.find(it => it._id === item._id);
    if (exist) {
      cart.splice(exist);
    }
    this.setState({
      cart: cart,
    });
    this.cookie.set("cart", cart, { maxAge: 60 * 60 * 24 * 3 });
  }

  clearCart() {
    this.setState({
      cart: [],
    });
    this.cookie.remove("cart");
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route 
              exact 
              path="/cart" 
              component={() => <Cart cart={this.state.cart} addItem={this.addItem} clearCart={this.clearCart}/>} 
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/user" component={UserInfo} />
            <Route exact path="/rules" component={Rules} />
            <Route exact path="/menu" component={FoodMenu} />
            <Route exact path="/food/:id" component={FoodDetail} />
            <Route component={NotFound404}/>
          </Switch>
          <FooterSide />
        </div>
      </Router>
    );
  }
}

export default App;
