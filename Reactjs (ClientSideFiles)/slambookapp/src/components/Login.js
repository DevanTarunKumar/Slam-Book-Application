import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Table
} from "reactstrap";
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      userDetails: {
        username: "",
        password: ""
      }
    };
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    //this.loadStudentsFromServer();
    this.state.userDetails = event;
    await fetch("apz/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: "hiii" //this.state.userDetails
    });
    //   .then(checkResponseStatus)
    //   .then(response => loginResponseHandler(response, this.customLoginHandler))
    //   .catch(error => defaultErrorHandler(error, this.customErrorHandler));

    this.props.history.push("/");
  }
  loadStudentsFromServer() {
    fetch("/login", { credentials: "same-origin" })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          students: responseData._embedded.students
        });
      });
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label>userName:</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>password:</Label>
            <Input
              type="password"
              name="address"
              id="address"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
