import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import { getSlams } from "../util/APIUtils";
import { getCurrentUser } from "../util/APIUtils";

class Home extends Component {
  _isMounted = true;
  _isMounted1 = true;
  constructor(props) {
    super(props);
    this.state = {
      slams: []
    };
    this.handleClicked = this.handleClicked.bind(this);
  }
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        if (this._isMounted1) {
          this.setState({
            currentUser: response,
            isAuthenticated: true,
            isLoading: false
          });
        }
      })
      .catch(error => {
        if (this._isMounted1) {
          this.props.history.push("/login");
          this.setState({
            isLoading: false
          });
        }
      });
  }
  handleClicked() {
    {
      this.props.onLogout();
    }
  }
  componentDidMount() {
    this._isMounted1 = true;
    this.loadCurrentUser();
    this._isMounted = true;
    if (this.props.currentUser != null) {
      getSlams(this.props.currentUser["emailid"]).then(data => {
        if (this._isMounted) {
          this.setState({ slams: data });
        }
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this._isMounted1 = false;
  }
  render() {
    const { slams } = this.state;
    if (!this._isMounted1) {
      return <p>Loading...</p>;
    }

    if (!this._isMounted) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">
        <p className="bg-primary">Welcome!! this is home page</p>
        <Button color="success" tag={Link} to="/createSlam">
          create new slam
        </Button>

        <Button color="success" onClick={this.handleClicked}>
          logout
        </Button>
        <Container>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {slams.map(slam => {
                return (
                  <tr key={slam.id}>
                    <td>{slam.name}</td>
                    <td>{slam.emailid}</td>
                    <td>
                      <Button
                        color="success"
                        tag={Link}
                        to={"/slam/" + slam.id}
                      >
                        open slam
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Home;
