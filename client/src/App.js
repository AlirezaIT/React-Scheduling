import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import DataTable from "./components/DataTable";
import Header from "./components/Header";
import CreateExam from "./components/CreateExam";
import CreateSession from "./components/CreateSession";
import API from "./api/API";
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

  login = (username, password, role) => {
    API.userLogin(username, password, role)
      .then((user) => {
        this.setState({ authUser: user, authErr: null });
        this.props.history.push("/addexam");
      })
      .catch((errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({ authErr: err0, authUser: null });
      });
  };

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
        <Container fluid>
          <Switch>
            <Route path="/login" component={LoginForm}>
              <Row className="vheight-100 mt-5">
                <LoginForm />
              </Row>
            </Route>

            <Route path="/create-exam">
              <Row className="vheight-100 mt-5">
                <CreateExam />
              </Row>
            </Route>
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>

          {/* <DataTable
            classes={["table", "table-bordered"]}
            header={["name", "age", "family"]}
            data={[
              { name: "test5", age: 20, family: "aaa" },
              { name: "test12", age: 80 },

              { name: "test42", age: 65 },

              { name: "test25", age: 75 },
              { name: "test20", age: 30, family: "bbb" },
            ]}
          /> */}
        </Container>
      </AuthContext.Provider>
    );
  }
}

export default App;
