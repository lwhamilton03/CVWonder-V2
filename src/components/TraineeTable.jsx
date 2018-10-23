import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

class TraineeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPeople: []
    };
  }

  sendClick = e => {
    this.props.onClick(e);
  };

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
    console.log(this.props.searchText);
    return (
      <Table bordered striped hover condensed>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>CVs</th> */}
          </tr>
        </thead>
        <tbody>
          {this.state.allPeople
            .filter(item => item.role === "trainee" || item.role === "Trainee")
            .filter(
              item =>
                item.name.includes(this.props.searchText) ||
                item.email.includes(this.props.searchText)
            )
            .map(
              function(item, key) {
                return (
                  <tr onClick={this.sendClick} key={key}>
                    <td className={item.email}>{item.name}</td>
                    <td className={item.email}>{item.email}</td>
                    {/* <td className={item.email}>
                      <Button className="button">Show CV's</Button>
                    </td> */}
                  </tr>
                );
              }.bind(this)
            )}
        </tbody>
      </Table>
    );
  }
}

export default TraineeTable;
