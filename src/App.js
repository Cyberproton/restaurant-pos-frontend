import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodManagement from './components/FoodManagement';
import FoodMenu from './components/FoodMenu';
import FoodDetail from './components/FoodDetail';

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/menu" component={FoodMenu}/>
              <Route exact path="/food/:id" component={FoodDetail}/>
              <Route exact path="/food-management" component={FoodManagement} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
