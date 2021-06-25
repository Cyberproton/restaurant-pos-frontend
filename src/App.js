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
  Progress,
  Gallery,
} from "./untils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.changeItem = this.changeItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.cookie = new Cookies();
    const cart = this.cookie.get("cart");
    this.state = {
      cart: cart ? cart : [],
      numberOfFoods: 0,
    };
  }

  changeItem(item) {
    const cart = this.state.cart;
    const existIndex = this.state.cart.findIndex(it => it.id === item.id);
    if (existIndex > -1) {
      const exist = this.state.cart[existIndex];
      exist.quantity += item.quantity;
      if (exist.quantity < 1) {
        exist.quantity = 1;
      }
    } else {
      if (item.quantity > 0) {
        cart.push(item);
      }
    }
    const numberOfFoods = cart.reduce((x, y) => x + y.quantity, 0);
    this.setState({
      cart: cart,
      numberOfFoods: numberOfFoods,
    });
    this.cookie.set("cart", cart, { maxAge: 60 * 60 * 24 * 3 });
  }

  removeItem(item) {
    const cart = this.state.cart;
    const existIndex = this.state.cart.findIndex(it => it.id === item.id);
    if (existIndex > -1) {
      cart.splice(existIndex, 1);
    }
    const numberOfFoods = cart.reduce((x, y) => x + y.quantity, 0);
    this.setState({
      cart: cart,
      numberOfFoods: numberOfFoods,
    });
    this.cookie.set("cart", cart, { maxAge: 60 * 60 * 24 * 3 });
  }

  clearCart() {
    this.setState({
      cart: [],
      numberOfFoods: 0,
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
              component={() => <Cart cart={this.state.cart} changeItem={this.changeItem} clearCart={this.clearCart}/>} 
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/user" component={UserInfo} />
            <Route exact path="/rules" component={Rules} />
            <Route exact path="/menu" component={FoodMenu} />
            <Route exact path="/food/:id" component={() => <FoodDetail changeItem={this.changeItem} />} />
            <Route component={NotFound404}/>
          </Switch>
          <Gallery />
          <FooterSide />
        </div>
      </Router>
    );
  }
}

export default App;
