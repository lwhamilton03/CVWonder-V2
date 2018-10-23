import React, { Component } from "react";
import NavbarFeatures from "./NavBarFeatures";
import ProfilePage from "../containers/ProfilePage";
import CVTable from "../containers/CVTable";
import { Table, Grid, Row, Col, Clearfix } from "react-bootstrap";
// import UploadCV from "../components/UploadCV";
import TraineeCVPage from "../containers/TraineeCVPage";

class TraineePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      email: ""
    };
  }
  // static email = {email:""};

  render() {
    console.log(this.props.userId);
    return (
      <div className="TraineePage">
        <NavbarFeatures
          class="p-3 mb-2 bg-dark text-white"
          className="NavBarMain1"
        />
        <div>
          <h1>Trainee Dashboard</h1>
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <code>
                  <ProfilePage userId={this.props.userId} />
                </code>
              </Col>

              <Col xs={6} md={4}>
                <Row>
                  <code>
                    <TraineeCVPage userId={this.props.userId} />
                  </code>
                </Row>
                <Row>
                  <CVTable userId={this.props.userId} />
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default TraineePage;
