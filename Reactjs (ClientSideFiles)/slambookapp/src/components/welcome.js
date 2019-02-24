import React, { Component } from "react";
import { getCurrentUser } from "../util/APIUtils";
class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    {
      getCurrentUser()
        .then(response => {
          // this.props.history.push("/login");
        })
        .catch(error => {
          // this.props.history.push("/");
        });
    }
  }
  render() {
    return (
      <div>
        <p>This is Welcome page</p>
      </div>
    );
  }
}

export default WelcomePage;
