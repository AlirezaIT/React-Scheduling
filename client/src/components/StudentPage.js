import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../api/API";
import moment from "moment";

//STUDENT SEGMENT
class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.props.studentExams(); //calling this function to get data of assigned exam to student from the database after login
    this.props.reservedExams(); //calling this function to get data of student's reserved exam from the database after login
  }

  //----------------Conditional rendering of "cancel button"

  renderCancelButton(reservedExam) {
    //passed reserved exam object to this funciton to cancel
    if (moment().isSameOrAfter(reservedExam.date))
      //checking the current date is sameOrafter of exam date or not
      return <p>Not possible to cancel the exam</p>; // show this msg instead of button
    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.handleCancelReservation(reservedExam)} //calling handler and pass the single reservedexam object
      >
        Cancel
      </button>
    );
  }

  //----------------handler of "cancel button"-------------------
  handleCancelReservation = async (reservedExam) => {
    // console.log("cancelling", reservedExam);
    const result = await API.cancelExam(reservedExam);
    const listStudentExams = this.state.listStudentExams.filter(
      (e) => e.exam_no !== reservedExam.exam_no
    );
    listStudentExams.push({ ...reservedExam });
    let listReservedExams = this.state.listReservedExams;
    listReservedExams = listReservedExams.filter(
      (e) => e.id !== reservedExam.id
    );
    this.props.updateState("listStudentExams", listStudentExams);
    this.props.updateState("listReservedExams", listReservedExams);
    console.log("result of canceling", result);
  };

  //----------------Conditional rendering of list of availabe exams for student-------------------
  renderExams() {
    const { length: examCount } = this.props.listStudentExams; //checking the length of listStudentexams array

    if (examCount === 0)
      //if length of array is zero,the below <p> will render instead of table
      return <p> Ooops There are no exams assigned to you to reserve !!!!!</p>; //
    return (
      <div>
        <p>You have {examCount} exams</p>
        <table className="table">
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>Reserve the exam</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listStudentExams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.name}</td>
                <td>
                  <Link
                    onClick={() => this.props.handleReserve(exam.exam_no)} //calling the handleReserve (in app.js) to get list of slots of specific exam
                    width="40"
                    eventKey="link-1"
                    to={{
                      pathname: "/student/reserve", //go to the BookingSlot component to see list of availabe slots and do booking
                    }}
                    className="btn btn-primary w-50"
                  >
                    Reserve Exam
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  //----------------Conditional rendering of list of Reserved exams and it's slot for student-------------------

  renderReserveredExams() {
    const { length: countReserved } = this.props.listReservedExams; // checking the length of listReservedExams array that contains list of exams that student has already reserved.
    if (countReserved === 0) return <p>There are no reserved exams </p>;
    return (
      <div>
        <p>You have {countReserved} exams</p>
        <table className="table">
          <thead>
            <tr>
              <td>Exam title</td>
              <td>Date</td>
              <td>Start Time</td>
              <td>End Time</td>
              <td>Grade</td>
              <td>Cancel the exam</td>
            </tr>
          </thead>
          <tbody>
            {this.props.listReservedExams.map((reservedExam) => (
              <tr key={reservedExam.id}>
                <td>{reservedExam.name}</td>
                <td>{reservedExam.date}</td>
                <td>{reservedExam.start_time}</td>
                <td>{reservedExam.end_time}</td>
                <td>{reservedExam.grade}</td>
                <td>{this.renderCancelButton(reservedExam)}</td>
                {/* calling the conditional rendering function of button  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>{this.renderExams()}</div>{" "}
        {/*calling the conditional rendering function of showing list availabe exams which are assainged to the student  */}
        <div> {this.renderReserveredExams()}</div>{" "}
        {/*calling the conditional rendering function of showing list reserved exams which are registered by student  */}
      </div>
    );
  }
}

export default StudentPage;
