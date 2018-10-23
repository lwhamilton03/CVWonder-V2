import React, { Component } from "react";
import { Table, Image, Button } from "react-bootstrap";

var url;

export default class CVTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPeople: []
    };
  }

  componentDidUpdate = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open(
      "GET",
      "http://192.168.1.117:8090/api/" + this.props.userId + "/cvs"
    );
    xhttp.setRequestHeader("Content-Type", "application/json");
    //xhttp.setRequestHeader("Key", "file");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    );
    xhttp.responseType = "json";
    xhttp.send();

    xhttp.onload = () => {
      this.setState({ allPeople: xhttp.response });
      console.log(this.state.allPeople);
    };
  };

  componentDidMount = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open(
      "GET",
      "http://192.168.1.117:8090/api/" + this.props.userId + "/cvs"
    );
    xhttp.setRequestHeader("Content-Type", "application/json");
    //xhttp.setRequestHeader("Key", "file");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    );
    xhttp.responseType = "json";
    xhttp.send();

    xhttp.onload = () => {
      this.setState({ allPeople: xhttp.response });
      console.log(this.state.allPeople);
    };
  };

  render() {
    let animals = this.state.allPeople;
    console.log(this.state.allPeople);
    var counter = 0;
    return (
      <Table bordered striped hover condensed>
        <tbody>
          {this.state.allPeople.map(
            function(item, key) {
              return (
                <div>
                  <tr key={key}>
                    <td>
                      <a
                        href={
                          "http://192.168.1.117:8090/api/" +
                          this.props.userId +
                          "/cv/" +
                          item.files_id
                        }
                      >
                        {item.name}
                      </a>
                    </td>
                    <td>{item.state}</td>
                    <td>
                      {" "}
                      <Button
                        className="button"
                        id={"" + ++counter}
                        name={"" + counter}
                        onClick={this.onChangeState}
                      >
                        Flag
                        <img
                          height="20px"
                          width="20px"
                          src="https://steemitimages.com/DQmWmkoSPMJ1JrGvkc5caLQyvBysuRtN8uMhHK1Ajf9BvNw/redflag.png"
                        />
                      </Button>
                    </td>
                  </tr>
                </div>
              );
            }.bind(this)
          )}
        </tbody>
      </Table>
    );
  }
}
