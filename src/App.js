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
} from "./untils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";

class App extends Component {
  state = {
    username: "an.tran2123153",
    fullname: "Trần Long Ẩn",
    phonenumber: "0376102927",
    address: "KTX Khu A - DHQG",
    birthday: "05/10/2000",
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <UserInfo use={this.state} />
          {/* <Switch>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user/:id" component={UserInfo} />
            <Route exact path="/rules" component={Rules} />
          </Switch> */}

          <FooterSide />
        </div>
      </Router>
    );
  }
}

export default App;
