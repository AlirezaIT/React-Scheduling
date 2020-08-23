import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import DataTable from "./components/DataTable";
import Header from "./components/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { Col, Row, Container } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authErr: "", authUser: "" };
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  // componentDidMount() {
  //   //check if the user is authenticated
  //   API.isAuthenticated()
  //     .then((user) => {
  //       this.setState({ authUser: user });
  //     })
  //     .catch((err) => {
  //       this.setState({ authErr: err.errorObj });
  //       this.props.history.push("/login");
  //     });
  // }

  // handleErrors(err) {
  //   if (err) {
  //     if (err.status && err.status === 401) {
  //       this.setState({ authErr: err.errorObj });
  //       this.props.history.push("/login");
  //     }
  //   }
  // }

  render() {
    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login,
      logoutUser: this.logout,
    };

    return (
      <AuthContext.Provider value={value}>
        <Header isNavOpen={this.state.isNavOpen} toggleNav={this.toggleNav} />
        <Container>
          <Switch>
            <Route path="/login" component={LoginForm}>
              <Row className="vheight-100 mt-5">
                {/* <Col sm={4}></Col> */}
                {/* <Col sm={4} className="below-nav"> */}
                <LoginForm />
                {/* {</Col> */}
              </Row>
            </Route>
            {/* <Redirect from="/" to="/login" /> */}
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
          {/* <LoginForm />; */}
          <DataTable
            classes={["table", "table-bordered"]}
            header={["name", "age"]}
            data={[
              { name: "test", age: 20 },
              { name: "test", age: 20 },
            ]}
          />
        </Container>
      </AuthContext.Provider>
    );
  }
}

export default App;
