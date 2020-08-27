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
import StudentListReservedExams from "./components/StudentListReservedExams";
import { ROLES } from "./shared/consts";

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
  componentDidMount() {
    //check if the user is authenticated
    API.isAuthenticated()
      .then((user) => {
        this.setState({ authUser: user });
      })
      .catch((err) => {
        this.setState({ authErr: err.errorObj });
        this.props.history.push("/login");
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
  logout = () => {
    return API.userLogout().then(() => {
      this.setState({ authUser: null, authErr: null });
    });
    this.props.history.push("/login");
  };
  login = (username, password, role) => {
    return API.userLogin(username, password, role)
      .then((user) => {
        this.setState({ authUser: user, authErr: null });
        this.props.history.push("/home");
      })
      .catch((errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({ authErr: err0 });
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
            <Route path="/exam/create" component={CreateExam}></Route>
            <Route path="/home" component={Teacher}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={this.logout}></Route>
          </Switch>
        </Container>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
