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
} from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import CreateSession from "./CreateSession";
import moment from "moment";

class CreateExam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      checkedCount: 0,
      duration: "",
      totalNumberOfSlots: 0,
      slots: [],
      studentsId: [],
    };
  }

  componentDidMount() {
    this.props.studentLists();
  }

  componentDidUpdate() {
    console.log(this.state.slots);
    console.log(this.state.studentsId);
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
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
            checkedCount: prevState.checkedCount + 1, // Add the number of Selected Student
            studentsId: [...prevState.studentsId, username], // add the studentNO. into the Array
          };
        });
      } else {
        const index = this.state.studentsId.indexOf(username);
        console.log(index);
        this.setState((prevState) => {
          return {
            checkedCount: prevState.checkedCount - 1, // reduce the number of Selected Student

            // the _ is sometimes used to represent an unused argument. Here, it's the current item in the array.
            studentsId: this.state.studentsId.filter((_, i) => i !== index), // remove the studentNO. from the Array
          };
        });
      }
    }
    // ---- END --------------------------------------
  };

  handleCreateSession = (event) => {
    event.preventDefault();
    this.toggleModal(); //close modal once it is created;
  };

  // ---------------------------------  function for Slots Creation
  slotGenerator = (session) => {
    const totalDurationExam = session.totalDuration;
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
    session.startingTime = moment(session.startingTime, "h:mmA");

    // ------------- Generate an Array of Times for each Slot
    for (let i = 0; i < slotsForEachSession; i++) {
      const startTime = session.startingTime
        .add(this.state.duration, "minutes")
        .format("hh:mm A");
      this.setState((prevState) => {
        return { slots: [...prevState.slots, startTime] };
      });
    }
    // ------------- End------------------------
  };

  render() {
    return (
      <>
        <AuthContext.Consumer>
          {(context) => (
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
                      {this.props.teacherStudentLists.map((studentList) => (
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
                  <FormGroup>
                    <FormControl
                      type="text"
                      value={`The Number of Selected Students :    ${this.state.checkedCount}`}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="text"
                      value={`The Number of defined Slots :    ${this.state.totalNumberOfSlots}`}
                    />
                  </FormGroup>
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
                          required
                          autoFocus
                        />
                      </Col>
                    </Form.Group>
                    {this.state.duration && (
                      <Button
                        variant="success"
                        size="sm"
                        className="fixed-right-bottom"
                        onClick={this.toggleModal}
                      >
                        Create Session
                      </Button>
                    )}
                  </Form>
                  {this.state.isModalOpen && (
                    <CreateSession
                      isModalOpen={this.state.isModalOpen}
                      toggleModal={this.toggleModal}
                      handleCreateSession={this.handleCreateSession}
                      slotGenerator={this.slotGenerator}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          )}
        </AuthContext.Consumer>
      </>
    );
  }
}

export default CreateExam;
