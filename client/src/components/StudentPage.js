import React, { Component } from "react";
import { Table } from "reactstrap";

import BookingSlot from "./BookingSlot";
import { Link } from "react-router-dom";
import API from "../api/API";

class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.studentExams();
    this.props.reservedExams();
  }

  handleCancelReservation = (reserveExam) => {
    const reservedExams = this.props.listReservedExams.filter(
      (re) => re.id !== reserveExam.id
    );
    this.setState({ reservedExams }); //reserveExams = reserveExams
  };

  handleReserve = async (exam) => {
    console.log(exam);
    await API.getExamSlots(exam.exam_no);
  };
  renderCancel() {
    // if (this.state.reserveExams.find((re) => re.date  Date() )
  }
  renderExams() {
    const { length: examCount } = this.props.listStudentExams;

    if (examCount === 0) return <p>There are no exams assigned to you</p>;
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
                    onClick={() => this.props.handleReserve(exam.exam_no)}
                    width="40"
                    eventKey="link-1"
                    to={{
                      pathname: "/student/reserve",
                    }}
                    className="btn btn-primary w-100"
                  >
                    Reserve Exam
                  </Link>
                  {/* <button
                      className="btn btn-primary btn-sm"
                      onClick={() => this.handleReserve(exam)}
                    >
                      Reserve
                    </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderReserveredExams() {
    const { length: countReserved } = this.props.listReservedExams;
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
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleCancelReservation(reservedExam)}
                  >
                    Cancel
                  </button>
                </td>
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
        <div>{this.renderExams()}</div>
        <div> {this.renderReserveredExams()}</div>
      </div>
    );
  }
}

export default StudentPage;
