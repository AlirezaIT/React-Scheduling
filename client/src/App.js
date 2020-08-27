import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import CreateExam from "./components/CreateExam";
import Teacher from "./components/Teacher";
import API from "./api/API";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { Col, Row, Container } from "react-bootstrap";

import { TEACHER } from "./shared/fakeTeacher";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authErr: "", authUser: "" };
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,

      teachers: TEACHER,
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

  // login = (username, password, role) => {
  //   API.userLogin(username, password, role)
  //     .then((user) => {
  //       this.setState({ authUser: user, authErr: null });
  //       this.props.history.push("/addexam");
  //     })
  //     .catch((errorObj) => {
  //       const err0 = errorObj.errors[0];
  //       this.setState({ authErr: err0, authUser: null });
  //     });
  // };

  login = (username, password, role) => {
    this.state.teachers.map((teacher) => {
      if (role === "teacher") {
        if (username === teacher.email && password === teacher.pass) {
          console.log("teacher");
          this.setState({ authUser: teacher.name });
          this.props.history.push("/teacher");
        }
      }
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

            <Route path="/teacher/create">
              <Row className="vheight-100 mt-5">
                <CreateExam />
              </Row>
            </Route>
            <Route path="/teacher">
              <Row className="vheight-100 mt-5">
                <Teacher />
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

export default withRouter(App);
