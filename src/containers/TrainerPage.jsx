import React, { Component } from "react";
import NavbarFeatures from "./NavBarFeatures";
import { Table, Grid, Row, Col, Clearfix } from "react-bootstrap";
import TraineeTable from "../components/TraineeTable";
import ProfilePage from "../containers/ProfilePage";
import CvTable from "../components/CvTable";

class TrainerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPeople: [],
      selectedId: "",
      searchText: ""
    };
  }
  // componentDidMount() {
  //   let request = new XMLHttpRequest();
  //   request.open("GET", "http://localhost:8090/api/people");
  //   request.setRequestHeader("Content-Type", "application/json");
  //   request.setRequestHeader("Access-Control-Allow-Origin", "*");
  //   request.responseType = "json";
  //   request.send();

  //   request.onload = () => {
  //     this.setState({ allPeople: request.response });
  //   };
  // }

  handleClick = e => {
    let email = e.target.className;
    let request = new XMLHttpRequest();
    request.open("GET", "http://192.168.1.117:8090/api/people");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.responseType = "json";
    request.send();

    request.onload = () => {
      for (var i = 0; i < request.response.length; i++) {
        if (request.response[i].email == email) {
          this.setState({ selectedId: request.response[i].id });
        }
      }
    };
  };

  handleChange = e => {
    this.setState({ searchText: e.target.value });
    console.log(this.state.searchText);
  };

  render() {
    var myId = "" + this.state.selectedId;
    return (
      <div className="TrainerPage">
        <NavbarFeatures
          class="p-3 mb-2 bg-dark text-white"
          className="NavBarMain1"
        />
        <div>
          <h1 color="red" class="display-3">
            Trainer Dashboard
          </h1>
          <input id="search" type="text" onChange={this.handleChange} />
        </div>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <code>
                <ProfilePage userId={this.state.selectedId} />
              </code>
            </Col>

            <Col xs={6} md={4}>
              <code>
                <TraineeTable
                  onClick={this.handleClick}
                  searchText={this.state.searchText}
                />
              </code>
            </Col>
            <Col xs={6} md={4}>
              <code>
                <CvTable userId={myId} />
              </code>
            </Col>
          </Row>
        </Grid>
        ;
      </div>
    );
  }
}

export default TrainerPage;
