import React from "react";
import {
  Form,
  FormGroup,
  Col,
  Button,
  Container,
  Row,
  Table,
  FormControl,
  Alert,
} from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import CreateSession from "./CreateSession";
import moment from "moment";
import { Redirect } from "react-router-dom";

class CreateExam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      totalNumberOfStudents: 0,
      duration: "",
      totalNumberOfSlots: 0,
      disabledInputDuration: false,
      startStopTime: [],
      studentsId: [],
      startTime: "",
      totalDuration: "",
      sessions: {},
      lastSession: 1,
      payload: {
        studentIds: [],
        date: "",
        totalDuration: "",
        durationTime: [], // contains the whole start and end time of slots
        startTime: "",
      },
    };
  }

  componentDidMount() {
    this.props.studentLists();
  }

  componentDidUpdate() {
    // console.log(this.state.startStopTime);
    // console.log(this.state.payload);
    // console.log(this.state.studentsId);
    // console.log("gigiglllliiii", this.state);
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      disabledInputDuration: true,
    });
  };

  onCheckChange = (event, username) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    // ----- handle the number of Selected Students and Add/Remove StudentNo from the Specific Array
    if (target.type === "checkbox") {
      if (value === true) {
        // access to the previous value by means of prevState
        this.setState((prevState) => {
          return {
            totalNumberOfStudents: prevState.totalNumberOfStudents + 1, // Add the number of Selected Student
            studentsId: [...prevState.studentsId, username], // add the studentNO. into the Array
          };
        });
      } else {
        const index = this.state.studentsId.indexOf(username);
        this.setState((prevState) => {
          return {
            totalNumberOfStudents: prevState.totalNumberOfStudents - 1, // reduce the number of Selected Student

            // the _ is sometimes used to represent an unused argument. Here, it's the current item in the array.
            studentsId: this.state.studentsId.filter((_, i) => i !== index), // remove the studentNO. from the Array
          };
        });
      }
    }
    // ---------------------------------- END --------------------------------------
  };

  handleCreateSession = (event) => {
    event.preventDefault();
    this.toggleModal(); //close modal once it is created;
  };

  // ---------------------------------  function for Slots Creation --------------------------------------------------
  slotGenerator = (session) => {
    const totalDurationExam = session.totalDuration;
    const startingTime = session.startingTime;
    const date = session.date;
    this.setState({
      startTime: startingTime,
      totalDuration: totalDurationExam,
      date,
    });
    const slotsForEachSession = totalDurationExam / this.state.duration;

    // ---------------------- Calculate required total number of Slots and setState for the exam
    this.setState((prevState) => {
      return {
        totalNumberOfSlots:
          prevState.totalNumberOfSlots +
          totalDurationExam / this.state.duration,
      };
    });

    // ------- take the start tiem from object and change it into moment with "h:mmA" format
    let temp = moment(session.startingTime, "h:mmA"); // in order to prevent issue, set temp variable instead of working with object per sei

    const startStopTime = []; // array for pushing the start and end time of slots

    // ------------------------ Generate an Array of start and end times for each Slot --------------------------------------
    for (let i = 0; i < slotsForEachSession; i++) {
      const endTime = temp
        .add(this.state.duration, "minutes")
        .format("hh:mm A");

      const startTime = temp
        .subtract(this.state.duration, "minutes")
        .format("hh:mm A");

      temp = temp.add(this.state.duration, "minutes"); // change the session start time

      startStopTime.push({
        start_time: startTime,
        end_time: endTime,
      });
    }

    let sessions = { ...this.state.sessions };
    sessions[this.state.lastSession] = startStopTime;
    console.log(sessions);
    this.setState({
      // session[`${this.state.lastSession}`] : startStopTime,
      sessions: { ...sessions },
      // session[1] : startStopTime,
      lastSession: this.state.lastSession + 1,
    });
    console.log(this.state);
    // ------------------------ End function (slotGenerator) for Slots Creation --------------------------------
  };

  // -------------------------- save the Exam and return to /home, Pass the PAYLOAD with all required INFO ---------------------------
  saveExamHandler = () => {
    this.setState({
      payload: {
        date: this.state.date,
        studentIds: this.state.studentsId,
        totalDuration: this.state.totalDuration,
        durationTime: this.state.sessions,
        startTime: this.state.startTime,
      },
    });
    // console.log(this.state.payload);
    let payLoad = this.state.payload;
    console.log(payLoad);
    // this.props.saveExamHandler(this.state.payLoad);
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authUser === null && <Redirect to="/login"></Redirect>}
            <Container fluid>
              <Row>
                <Col md={8}>
                  <Table striped bordered hover size="sm" className="mt-5">
                    <thead>
                      <tr>
                        <th>#</th>
                        {/* <th>student_id</th> */}
                        <th>Student Number</th>
                        <th>Student Name</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.teacherStudentLists?.map((studentList) => (
                        <tr key={studentList.id}>
                          <td>{studentList.id}</td>
                          <td>{studentList.username}</td>
                          <td>{studentList.name}</td>
                          <td>
                            <Form.Group controlId="">
                              <Form.Check
                                onChange={(event) =>
                                  this.onCheckChange(
                                    event,
                                    studentList.username
                                  )
                                }
                                type="checkbox"
                                name="checkbox"
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {/* <FormGroup>
                    <FormControl
                      type="text"
                      value={`The Number of Selected Students :    ${this.state.totalNumberOfStudents}`}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="text"
                      value={`The Number of defined Slots :    ${this.state.totalNumberOfSlots}`}
                    />
                  </FormGroup> */}
                </Col>
                <Col md={4} className="mt-5">
                  <Form>
                    <Form.Group Row>
                      <Form.Label column htmlFor="duration">
                        Duration of Each Slot (in Minute)
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          value={this.state.duration}
                          onChange={this.onCheckChange}
                          id="lastname"
                          size="sm"
                          type="text"
                          name="duration"
                          placeholder="Duration"
                          disabled={this.state.disabledInputDuration}
                          required
                          autoFocus
                          theme={{
                            colors: {
                              primary: "green",
                              underlineColor: "transparent",
                            },
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <FormGroup>
                      <FormControl
                        type="text"
                        value={`The Number of Selected Students :    ${this.state.totalNumberOfStudents}`}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        type="text"
                        value={`The Number of defined Slots :    ${this.state.totalNumberOfSlots}`}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button
                        variant="info"
                        size="sm"
                        className="fixed-right-bottom"
                        onClick={this.toggleModal}
                        // disabled={this.state.duration ? false : true}
                        disabled={!this.state.duration}
                      >
                        Create Session
                      </Button>
                    </FormGroup>

                    {/* {this.state.totalNumberOfStudents &&
                    this.state.totalNumberOfSlots &&
                    this.state.totalNumberOfSlots >=
                      this.state.totalNumberOfStudents ? ( */}
                    <FormGroup>
                      <Button
                        variant="info"
                        size="sm"
                        className="fixed-right-bottom"
                        onClick={this.saveExamHandler}
                        disabled={
                          !this.state.totalNumberOfStudents ||
                          !this.state.totalNumberOfSlots ||
                          !(
                            this.state.totalNumberOfSlots >=
                            this.state.totalNumberOfStudents
                          )
                        }
                      >
                        Save Exam
                      </Button>
                    </FormGroup>
                    {this.state.totalNumberOfSlots >=
                    this.state.totalNumberOfStudents ? (
                      <></>
                    ) : (
                      <Alert variant="danger">
                        <Alert.Heading>ERROR!</Alert.Heading>
                        <p>
                          The Number Of Slots are lower than the Number Of
                          Students. <br />
                          Please Create more Slots.
                        </p>
                      </Alert>
                    )}
                  </Form>
                  {this.state.isModalOpen && (
                    <CreateSession
                      isModalOpen={this.state.isModalOpen}
                      toggleModal={this.toggleModal}
                      handleCreateSession={this.handleCreateSession}
                      slotGenerator={this.slotGenerator}
                      duration={this.state.duration}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default CreateExam;
