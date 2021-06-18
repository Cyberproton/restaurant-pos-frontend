import React, { Component } from "react";
import {
  Header,
  Home,
  Cart,
  Login,
  Signup,
  Rules,
  FooterSide,
  UserInfo,
  FoodManagement,
  FoodMenu,
  FoodDetail,
  QrCodeManagement,
} from "./untils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user" component={UserInfo} />
            <Route exact path="/rules" component={Rules} />
            <Route exact path="/menu" component={FoodMenu} />
            <Route exact path="/food/:id" component={FoodDetail} />
            <Route exact path="/manager/foodmanagement" component={FoodManagement} />
            <Route exact path="/manager/qrcodemanagement" component={QrCodeManagement}/>
          </Switch>

          <FooterSide />
        </div>
      </Router>
    );
  }
}

export default App;
