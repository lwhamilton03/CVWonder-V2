import React, { Component } from "react";
import { Table, Image, Button } from "react-bootstrap";

var url;

class CvTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPeople: []
    };
  }

  onChangeState = () => {
    let animals = this.state.allPeople;

    var t1 = document.getElementById("1");
    var t2 = document.getElementById("2");
    var t3 = document.getElementById("3");

    if (t1 != null) {
      console.log(this.props.userId);
      t1.addEventListener("click", function() {
        url =
          "http://192.168.1.117:8090/api/people/" +
          this.props.userId +
          "/state/" +
          animals[0].files_id;
      });
    }
    if (t2 != null) {
      t2.addEventListener("click", function() {
        url =
          "http://192.168.1.117:8090/api/people/" +
          this.props.userId +
          "/state/" +
          animals[1].files_id;
      });
    }
    if (t3 != null) {
      t3.addEventListener("click", function() {
        url =
          "http://192.168.1.117:8090/api/people/" +
          this.props.userId +
          "/state/" +
          animals[2].files_id;
      });
    }
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    );
    xhttp.responseType = "json";
    xhttp.send("Unapproved");
    xhttp.onload = () => {
      console.log(xhttp.response);
    };
  };

  componentDidUpdate = () => {
    console.log(this.props.userId);
    let request = new XMLHttpRequest();

    var url = "http://192.168.1.117:8090/api/" + this.props.userId + "/cvs/";

    request.open("GET", url);

    request.setRequestHeader("Content-Type", "application/json");

    request.setRequestHeader("Access-Control-Allow-Origin", "*");

    request.responseType = "json";

    request.send();

    request.onload = () => {
      this.setState({ allPeople: request.response });
    };
  };

  //   componentDidMount = () => {
  //     console.log(this.props.userId);
  //     let request = new XMLHttpRequest();

  //     var url = "http://192.168.1.117:8090/api/" + this.props.userId + "/cvs/";

  //     request.open("GET", url);

  //     request.setRequestHeader("Content-Type", "application/json");

  //     request.setRequestHeader("Access-Control-Allow-Origin", "*");

  //     request.responseType = "json";

  //     request.send();

  //     request.onload = () =>     {
  //       this.setState({ allPeople: request.response });
  //     };
  //   };

  render() {
    console.log(this.props.userId);
    let counter = 0;
    return (
      <Table bordered striped hover condensed>
        <thead>
          <tr>
            <th>CV</th>
          </tr>
        </thead>
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

export default CvTable;
