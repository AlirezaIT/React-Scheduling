import React, { Component } from "react";
import { Table } from "reactstrap";
import DataTable from "./DataTable";
import BookingSlot from "./BookingSlot";
import { Link } from "react-router-dom";
// const listExams = [
//   {
//     title: "web-application",
//     examCode: "1010",
//   },
//   {
//     title: "computer architectures",
//   },
//   {
//     title: "network",
//   },
// ];

const listReserveExams = [
  {
    id: 1,
    title: "web application",
    date: "date",
    slot: "",
    grade: "20",
  },
  {
    id: 2,
    title: "netowrk ",
    date: "date",
    slot: "",
    grade: "40",
  },
  {
    id: 3,
    title: "netowrk ",
    date: "date",
    slot: "",
    grade: "20",
  },
  { id: 4, title: "database", date: "date", slot: "", grade: "withrow" },
];
class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      reservedExams: [],
    };
  }

  async componentDidMount() {
    const studentExams = await this.props.studentExams();
    const reservedExams = await this.props.reservedExams();
    this.setState({
      exams: studentExams,
      reservedExams: reservedExams,
    });
  }

  handleCancelReservation = (reserveExam) => {
    const reservedExams = this.state.reservedExams.filter(
      (re) => re.id !== reserveExam.id
    );
    this.setState({ reservedExams }); //reserveExams = reserveExams
  };

  handleReserve = (exam) => {
    console.log(exam);
  };
  renderCancel() {
    // if (this.state.reserveExams.find((re) => re.date  Date() )
  }
  renderExams() {
    const { length: examCount } = this.state.exams;

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
            {this.state.exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.name}</td>
                <td>
                  <Link
                    onClick={() => this.handleReserve(exam)}
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
    const { length: countReserved } = this.state.reservedExams;
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
            {this.state.reservedExams.map((reservedExam) => (
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
