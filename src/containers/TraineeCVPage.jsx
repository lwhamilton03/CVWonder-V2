import React, { Component } from "react";
import UploadCV from "../components/UploadCV";
import { Table, Image, Button } from "react-bootstrap";

class TraineeCVPage extends Component {
  constructor(props) {
    super(props);

    this.state = { allPeople: [] };
  }

  componentDidMount() {
    let request = new XMLHttpRequest();

    request.open("GET", "http://192.168.1.117:8090/api/people");

    request.setRequestHeader("Content-Type", "application/json");

    request.setRequestHeader("Access-Control-Allow-Origin", "*");

    request.responseType = "json";

    request.send();

    request.onload = () => {
      this.setState({ allPeople: request.response });
    };
  }

  render() {
    console.log(JSON.stringify(this.state.allPeople));

    return (
      <Table bordered hover>
        <thead>
          <th>MANAGE CVs</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <UploadCV />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default TraineeCVPage;
