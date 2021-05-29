import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodManagement from './components/FoodManagement';

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/food-management" component={FoodManagement} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
