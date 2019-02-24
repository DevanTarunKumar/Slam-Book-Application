import React, { Component } from "react";
import "./MyStyles.css";
import { getSlamById } from "../util/APIUtils";
class OpenSlam extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { slams: [], isloading: true };
  }
  async componentDidMount() {
    this._isMounted = true;
    getSlamById(this.props.match.params.id).then(data => {
      if (this._isMounted) {
        this.setState({ slams: data });
      }
    });
  }
  render() {
    const slam = this.state.slams;
    return (
      <div>
        <p>{slam.name}</p>
        <p>{slam.address}</p>
        <p>{slam.phno}</p>
        <p>{slam.emailid}</p>
      </div>
    );
  }
}

export default OpenSlam;
