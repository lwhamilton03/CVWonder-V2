import React, { Component } from "react";
import NavBarFeatures from "./containers/NavBarFeatures";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./containers/LoginPage";
import Dashboard from "./containers/Dashboard";
import AddUser from "./containers/AddUser";
import TraineePage from "./containers/TraineePage";
import TrainerPage from "./containers/TrainerPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    };
  }

  handleLogin = email => {
    console.log("Manish understands much more than Lucy");
    // let email = e.target.className;
    // console.log(e.target.name);
    let request = new XMLHttpRequest();
    request.open("GET", "http://192.168.1.117:8090/api/people");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.responseType = "json";
    request.send();

    request.onload = () => {
      for (var i = 0; i < request.response.length; i++) {
        // console.log(request.response[i].email);
        if (request.response[i].email == email) {
          this.setState({ userId: request.response[i].id });
        }
      }
    };
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => (
              <LoginPage onLogin={this.handleLogin} {...props} />
            )}
          />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/AddUser" component={AddUser} />
          <Route path="/Trainer" component={TrainerPage} />
          <Route
            path="/Trainee"
            render={props => (
              <TraineePage userId={this.state.userId} {...props} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
