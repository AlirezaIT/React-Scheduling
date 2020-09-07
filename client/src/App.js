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
import { ROLES } from "./shared/consts";
import StudentPage from "./components/StudentPage";
import BookingSlot from "./components/BookingSlot";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      teacherStudentLists: [],
      role: "",
      listStudentExams: [], //assaigned exams to the student
      listReservedExams: [], //reserved exam and its slot's details
      listSlots: [], //availabe slots related to the specific exam
    };
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  };
  componentDidMount() {
    //check if the user is authenticated
    API.isAuthenticated()
      .then((user) => {
        this.setState({ authUser: user });
      })
      .catch((err) => {
        this.props.history.push("/login");
        this.setState({ authErr: err.errorObj });
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
          // console.log(this.state.authUser.name);
          this.setState({
            role: this.state.authUser.role,
          });
        } else if (user.role === ROLES.STUDENT) {
          this.setState({ authUser: user, authErr: null });
          this.props.history.push("/student");
          // console.log(this.state.authUser);
          this.setState({
            role: this.state.authUser.role,
          });
        }
      })
      .catch((errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({ authErr: err0 });
      });
  };

  // get the List of Students for a authorized Teacher
  studentLists = () => {
    API.getStudentLists()
      .then((students) =>
        this.setState({
          teacherStudentLists: students || [],
        })
      )
      .catch((errorObj) => {
        const err = errorObj.errors;
      });
  };

  //***------------------------functions related to StudentPage AND BookingSlots components----------------***

  //------------------------calling the API function for getting the array of assaigned exams
  studentExams = () => {
    API.getStudentExams()
      .then((studentExams) => {
        //getting the array of assaigned exams's details from API'S function (exam_no ,name) and storing into listStudentExams Array
        this.setState({
          listStudentExams: studentExams,
        });
      })
      .catch((errorObj) => {
        const err = errorObj.errors;
      });
  };
  //------------------------calling the API function for getting the array of reserved exams
  reservedExams = () => {
    API.getReservedExams()
      .then((reservedExams) => {
        //getting the array of reserved exams's details from API'S function (full details) and storing into listReservedExams Array
        this.setState({
          listReservedExams: reservedExams,
        });
      })
      .catch((errorObj) => {
        const err = errorObj.errors;
      });
  };

  //------------------------after clicking the reserve button in StudentPage component using this is handler function, and it's calling the API function for getting the array of specific exam's slots and passing the exam_no to the API function

  handleReserve = async (exam_no) => {
    const result = await API.getExamSlots(exam_no); //passing the exam number (exam_no) and get the array of objects, contains the details of slots related to that exam number
    this.setState({
      listSlots: result,
    });
    this.props.history.push(`/student/reserve?exam_no=${exam_no}`);
  };

  //------------------------using this function inorder to update the arrays in studentPage components
  updateState = async (key, array) => {
    this.setState({
      [key]: array,
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
        <Header
          isNavOpen={this.state.isNavOpen}
          toggleNav={this.toggleNav}
          role={this.state.role}
        />
        <Container fluid>
          <Switch>
            <Route path="/exam/create">
              <CreateExam
                studentLists={this.studentLists}
                teacherStudentLists={this.state.teacherStudentLists}
              />
            </Route>
            <Route path="/home" component={Teacher}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/student/reserve">
              <BookingSlot
                listSlots={this.state.listSlots}
                handleReserve={this.handleReserve}
              />
            </Route>
            <Route path="/student">
              <StudentPage
                listStudentExams={this.state.listStudentExams}
                listReservedExams={this.state.listReservedExams}
                studentExams={this.studentExams}
                reservedExams={this.reservedExams}
                handleReserve={this.handleReserve}
                updateState={this.updateState}
              />
            </Route>
            <Route path="/logout"></Route>
          </Switch>
        </Container>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
