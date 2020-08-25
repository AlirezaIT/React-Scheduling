import React, { Component } from "react";

import { Table } from "reactstrap";
import DataTable from "./DataTable";
const listExams = [
  {
    title: "web-application",
    examCode: "1010",
  },
  {
    title: "computer architectures",
  },
  {
    title: "network",
  },
];

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
      exams: listExams,
      reservedExams: listReserveExams,
    };
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
    const { lenght: examCount } = this.state.exams;

    if (examCount === 0) return <p>There are no exams assigned to you</p>;
    return (
      <div>
        <p>You have {examCount} exams</p>
        <table className="table">
          <thead>
            <tr>
              <th>Exam Tile</th>
              <th>Reserve the exam</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exams.map((exam) => (
              <tr key={exam.title}>
                <td>{exam.title}</td>
                <td>{exam.examCode}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.handleReserve(exam)}
                  >
                    Reserve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderReserveredExams() {
    const { lenght: countReserved } = this.state.reservedExams;
    if (countReserved === 0) return <p>There are no reserved exams </p>;
    return (
      <div>
        <p>You have {countReserved} exams</p>
        <table className="table">
          <thead>
            <tr>
              <td>Exam title</td>
              <td>Date</td>
              <td>Slot</td>
              <td>Grade</td>
              <td>Cancel the exam</td>
            </tr>
          </thead>
          <tbody>
            {this.state.reservedExams.map((reservedExam) => (
              <tr key={reservedExam.id}>
                <td>{reservedExam.title}</td>
                <td>{reservedExam.date}</td>
                <td>{reservedExam.slot}</td>
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
