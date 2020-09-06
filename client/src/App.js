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
      listStudentExams: [],
      listReservedExams: [],
      listSlots: [],
      payload: {
        studentIds: [],
        date: "",
        totalDuration: "",
        durationTime: [], // contains the whole start and end time of slots
        startTime: "",
      },
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

  componentDidUpdate() {
    console.log("asdfasdfasdf", this.state.payLoad);
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
          // console.log(this.state.authUser);
        } else if (user.role === ROLES.STUDENT) {
          this.setState({ authUser: user, authErr: null });
          this.props.history.push("/student");
          // console.log(this.state.authUser);
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

  // This is a function that be called in CreateExam Component
  saveExamHandler = (payLoad) => {
    this.setState({
      paylod: payLoad,
    });
    console.log(payLoad);
    this.props.history.push("/home");
  };

  studentExams = () => {
    API.getStudentExams()
      .then((studentExams) => {
        this.setState({
          listStudentExams: studentExams,
        });
        console.log(studentExams);
      })

      .catch((errorObj) => {
        const err = errorObj.errors;
      });
  };
  reservedExams = () => {
    API.getReservedExams()
      .then((reserveredExams) =>
        this.setState({
          listReservedExams: reserveredExams,
        })
      )
      .catch((errorObj) => {
        const err = errorObj.errors;
      });
  };

  handleReserve = async (exam_no) => {
    console.log("exam No : ", exam_no);
    const result = await API.getExamSlots(exam_no);
    console.log("gigiliiii", result);
    this.setState({
      listSlots: result,
    });
    this.props.history.push(`/student/reserve?exam_no=${exam_no}`);
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
            <Route path="/exam/create">
              <CreateExam
                studentLists={this.studentLists}
                teacherStudentLists={this.state.teacherStudentLists}
                saveExamHandler={this.saveExamHandler}
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
                listStudentExams={this.state.listStudentExams} //array
                listReservedExams={this.state.listReservedExams}
                studentExams={this.studentExams} //function
                reservedExams={this.reservedExams}
                handleReserve={this.handleReserve}
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
