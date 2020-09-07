import React, { Component } from "react";

class ShowReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.finalResultReport();
    this.props.studentNotBooked();
  }

  renderFinalResult() {
    // const { length: examCount } = this.props.listStudentExams; //checking the length of listStudentexams array

    // if (examCount === 0)
    //   //if length of array is zero,the below <p> will render instead of table
    //   return <p> Ooops There are no exams assigned to you to reserve !!!!!</p>; //
    return (
      <div>
        <h1>There is a list of the final report of exam and student grade</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Exam Number</th>
              <th>Course name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Date</th>
              <th>Student</th>
              <th>Grade</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {this.props.fullReports.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.exam_no}</td>
                <td>{exam.name}</td>
                <td>{exam.start_time}</td>
                <td>{exam.end_time}</td>
                <td>{exam.date}</td>
                <td>{exam.username}</td>
                <td>{exam.grade}</td>
                <td>{exam.is_absent}</td>
                <td>
                  {/* <Link
                    onClick={() => this.props.handleReserve(exam.exam_no)} //calling the handleReserve (in app.js) to get list of slots of specific exam
                    width="40"
                    eventKey="link-1"
                    to={{
                      pathname: "/student/reserve", //go to the BookingSlot component to see list of availabe slots and do booking
                    }}
                    className="btn btn-primary w-50"
                  >
                    Reserve Exam
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  studentNotBooked() {
    // const { length: examCount } = this.props.listStudentExams; //checking the length of listStudentexams array

    // if (examCount === 0)
    //   //if length of array is zero,the below <p> will render instead of table
    //   return <p> Ooops There are no exams assigned to you to reserve !!!!!</p>; //
    return (
      <div>
        <h1>There is a list of student that did not book the exam</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Exam Number</th>
              <th>Student Name</th>
              <th>Student Username</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listStudentsNotBooked.map((student) => (
              <tr key={student.id}>
                <td>{student.exam_no}</td>
                <td>{student.name}</td>
                <td>{student.username}</td>
                <td>
                  {/* <Link
                    onClick={() => this.props.handleReserve(exam.exam_no)} //calling the handleReserve (in app.js) to get list of slots of specific exam
                    width="40"
                    eventKey="link-1"
                    to={{
                      pathname: "/student/reserve", //go to the BookingSlot component to see list of availabe slots and do booking
                    }}
                    className="btn btn-primary w-50"
                  >
                    Reserve Exam
                  </Link> */}
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
        <div>{this.renderFinalResult()}</div>
        <div>{this.studentNotBooked()}</div>
      </div>
    );
  }
}

export default ShowReport;
