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

// import { TEACHER } from "./shared/fakeTeacher";
import StudentPage from "./components/studentPage";
import BookingSlot from "./components/BookingSlot";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authErr: "", authUser: "", studentLists: [] };
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      studentExams: [],
      isNavOpen: false,

      // teachers: TEACHER,
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

  // handleErrors(err) {
  //   if (err) {
  //     if (err.status && err.status === 401) {
  //       this.setState({ authErr: err.errorObj });
  //       this.props.history.push("/login");
  //     }
  //   }
  // }
  logout = () => {
    return API.userLogout().then(() => {
      this.setState({ authUser: null, authErr: null });
      this.props.history.push("/login");
    });
  };
  login = (username, password, role) => {
    return API.userLogin(username, password, role)
      .then((user) => {
        if (user.role === ROLES.TEACHER) {
          this.setState({ authUser: user, authErr: null });
          this.props.history.push("/home");
          console.log(this.state.authUser);
        } else {
          this.setState({ authUser: user, authErr: null });
          this.props.history.push("/student");
        }
      })
      .catch((errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({ authErr: err0 });
      });
  };

  studentLists = () => {
    return API.studentLists()
      .then((students) => {
        this.setState({ studentLists: students });
      })
      .catch((errorObj) => {
        const err = errorObj.errors[0];
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

            <Route path="/reservingslot" component={BookingSlot}></Route>
            <Route path="/student" component={StudentPage}></Route>
            <Route path="/logout"></Route>
          </Switch>

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

export default withRouter(App);
