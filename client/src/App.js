import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import DataTable from "./components/DataTable";
import StudentPage from "./components/StudentPage";
import Header from "./components/Header";
import AddExam from "./components/AddExam";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { Col, Row, Container } from "react-bootstrap";
import StudentListReservedExams from "./components/StudentListReservedExams";
import BookingSlots from "./components/BookingSlots";

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
        <Container fluid>
          <Switch>
            <Route path="/login" component={LoginForm}>
              <Row className="vheight-100 mt-5">
                <LoginForm />
              </Row>
            </Route>

            <Route path="/addexam" component={LoginForm}>
              <Row className="vheight-100 mt-5">
                <AddExam />
              </Row>
            </Route>

            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
          <StudentPage />

          {/* <LoginForm />; */}
          {/* <DataTable
            classes={["table", "table-bordered"]}
            header={["name", "age", 'remove_btn', 'add_btn', 'absent_checkbox', 'detail_btn', 'course_dropdown', 'teacher_dropdown']}
            dropdowns={{
              "course_dropdown": [{name: "course 3", id: "3"}, {name: "course 1", id: "1"}, {name: "course 2", id: "2"}],
              "teacher_dropdown": [{name: "teacher 3", id: "3"}, {name: "teacher 1", id: "1"}, {name: "teacher 2", id: "2"}],
            }}
            data={[
              { name: "test5", age: 20, remove_btn: `remove`, is_absent: true},
              { name: "test12", age: 30, remove_btn: `remove`, is_absent: false},
              { name: "test42", age: 30, remove_btn: `remove`, is_absent: true},
              { name: "test25", age: 75, remove_btn: `remove`, is_absent: true},
              { name: "test20", age: 30, remove_btn: `remove`, is_absent: false},
            ]}
          /> */}
          {/* <StudentListReservedExams /> */}
        </Container>
      </AuthContext.Provider>
    );
  }
}

export default App;
