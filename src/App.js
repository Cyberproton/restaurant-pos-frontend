import React, { Component } from "react";
import { Header, Home, Cart, Login, Signup } from "./untils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UserInfo from "./components/UserInfo";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user/:id" component={UserInfo} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
