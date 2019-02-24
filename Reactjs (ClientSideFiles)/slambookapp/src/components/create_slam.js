import React, { Component } from "react";
import { sendSlam } from "../util/APIUtils";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
class CreateSlam extends Component {
  emptyItem = {
    to: "",
    name: "",
    address: "",
    phno: "",
    emailid: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    sendSlam(item);
    // const { item } = this.state;
    // await fetch("/apz/slam", {
    //   method: item.id ? "PUT" : "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(item)
    // });
    this.props.history.push("/"); //doubt
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  render() {
    return (
      <div>
        <p>this is create slam page</p>
        <Container>
          <Form onSubmit={this.handleFormSubmit}>
            <FormGroup>
              <Label>to:</Label>
              <Input
                type="email"
                name="toAddress"
                id="toAddress"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>address:</Label>
              <Input
                type="textarea"
                name="address"
                id="address"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>phone number:</Label>
              <Input
                type="number"
                name="phno"
                id="phno"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>email id:</Label>
              <Input
                type="email"
                name="emailid"
                id="emailid"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateSlam;
