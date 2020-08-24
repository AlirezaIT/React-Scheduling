import React, { Component } from "react";
import { movies } from "../services/fakeMovieService";
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
      reserveExams: listReserveExams,
    };
  }

  handleCancelReservation = (reserveExam) => {
    const reserveExams = this.state.reserveExams.filter(
      (re) => re.id !== reserveExam.id
    );
    this.setState({ reserveExams }); //reserveExams = reserveExams
  };

  handleReserve = (exam) => {
    console.log(exam);
  };
  renderCancel() {
    // if (this.state.reserveExams.find((re) => re.date  Date() )
  }
  render() {
    return (
      <div>
        <DataTable
          classes={["table", "table-bordered"]}
          header={["ExamTitle", "Reserve"]}
          data={[
            {
              ExamTitle: this.state.exams,
              Reserve: (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => this.handleReserve()}
                >
                  Reserve
                </button>
              ),
            },
          ]}
        />
      </div>
    );
  }
}

export default StudentPage;

{
  /* <table className="table">
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
            {this.state.reserveExams.map((reserveExam) => (
              <tr key={reserveExam.id}>
                <td>{reserveExam.title}</td>
                <td>{reserveExam.date}</td>
                <td>{reserveExam.slot}</td>
                <td>{reserveExam.grade}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleCancelReservation(reserveExam)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */
}
