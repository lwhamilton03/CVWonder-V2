import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "mdbreact";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./LoginPage.css";
import NavbarFeatures from "./NavBarFeatures";
import CryptoJS from "cryptojs";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirectPath: "",
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  state = {
    isLoading: true,
    groups: []
  };

  async componentDidMount() {
    const response = await fetch("/api/people");
    const body = await response.text();
    this.setState({ people: body, isLoading: false });
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // handleClick(event) {
  //   var apiBaseUrl = "http://localhost:3000/api/login";
  //   var self = this;
  //   var payload = {
  //     email: this.state.username,
  //     password: this.state.password
  //   };
  // }

  handleSubmit = event => {
    event.preventDefault();

    var emailstr = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    const url = "http://192.168.1.117:8090/api/login";

    var user = JSON.stringify({
      email: emailstr,
      password: password
    });

    console.log(user);

    try {
      let xhttp = new XMLHttpRequest();
      xhttp.open("POST", url);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhttp.setRequestHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, HEAD"
      );
      xhttp.responseType = "text";
      xhttp.send(user);
      xhttp.onload = () => {
        console.log(xhttp.responseText);

        this.setState({ redirectPath: xhttp.responseText });
        console.log(this.state.redirectPath);
      };

      // alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
    this.props.onLogin(emailstr);
  };

  render() {
    const { people, isLoading } = this.state;

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    var redirectPath = this.state.redirectPath;
    console.log(this.state);
    console.log(redirectPath);
    if (redirectPath === "Trainer" || redirectPath === "trainer") {
      return <Redirect to="/Trainer" />;
    }
    if (redirectPath === "Trainee" || redirectPath === "trainee") {
      return <Redirect to="/Trainee" />;
    }

    return (
      <div className="MainPage">
        <NavbarFeatures
          class="p-3 mb-2 bg-dark text-white"
          className="NavBarMain1"
        />

        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
