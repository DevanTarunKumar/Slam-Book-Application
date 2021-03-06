import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import { login, getCurrentUser } from "../../util/APIUtils";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import "react-notifications/lib/notifications.css";
import "../../components/MyStyles.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class Login extends Component {
  emptyItem = {
    usernameOrEmail: "",
    password: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notificationDOMRef = React.createRef();
  }
  componentDidMount() {
    {
      getCurrentUser()
        .then(response => {
          this.props.history.push("/home");
        })
        .catch(error => {
          // this.props.history.push("/");
        });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    const loginRequest = Object.assign({}, item);
    login(loginRequest)
      .then(response => {
        NotificationManager.success("Enjoy Slam book", "Success!!");
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.props.onLogin();
      })
      .catch(error => {
        if (error.status === 401) {
          NotificationManager.error(
            "Your Email id or password is incorrect, Please try again",
            "Something Went Wrong"
          );
        } else {
          NotificationManager.error(
            "Sorry! We are figuring it out",
            "Something Went Wrong"
          );
        }
      });
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
      <div className="row">
        <div className="col-lg-5 col-centered">
          <h1>LOGIN</h1>

          <Container>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>email:</Label>
                <Input
                  type="email"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  onChange={this.handleChange}
                  required={true}
                  message="please gyyvsvs"
                />
              </FormGroup>
              <FormGroup>
                <Label>password:</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                  required={true}
                />
              </FormGroup>
              <Button type="primary">Login</Button> or{" "}
              <Link to="/signup">register now!</Link>
            </Form>
          </Container>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default Login;
