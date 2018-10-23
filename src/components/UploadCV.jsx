import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
class counter extends Component {
  state = {
    selectedFile: null
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    console.log(event.target.files[0]);
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("file", this.state.selectedFile);
    console.log(fd);
    console.log("in fileUploadHandler");

    let xhttp = new XMLHttpRequest();
    console.log(this.props.userId);
    xhttp.open(
      "POST",
      "http://192.168.1.117:8090/api/" + this.props.userId + "/upload"
    );
    //xhttp.setRequestHeader("Content-Type", "multipart/form-data");
    //xhttp.setRequestHeader("Key", "file");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    );
    xhttp.responseType = "text";
    xhttp.send(fd);
    xhttp.onload = () => {
      console.log(xhttp.responseText);
    };
  };

  render() {
    return (
      <div>
        <Table>
          <tbody>
            <tr>
              <td>
                {" "}
                <input type="file" onChange={this.fileSelectedHandler} />
              </td>
              <td>
                <Button onClick={this.fileUploadHandler} bsStyle="info">
                  Upload
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default counter;
