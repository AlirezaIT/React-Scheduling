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

class CreateExam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      studentLists: [],
      checkedCount: 0,
      duration: "",
    };
  }

  componentDidMount() {
    this.props.studentLists();
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  onCheckChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // console.log(value);
    const name = target.name;

    this.setState({
      [name]: value,
    });

    if (target.type === "checkbox") {
      if (value === true) {
        // access to the previous value by means of prevState
        this.setState((prevState) => {
          return {
            checkedCount: prevState.checkedCount + 1,
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            checkedCount: prevState.checkedCount - 1,
          };
        });
      }
    }
  };

  handleCreateSession = (e) => {
    this.toggleModal(); //close modal once it is created;
    e.preventDefault();
  };

  isCreatedSlotsEnough = (numberOfSlots) => {};
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
                                onChange={this.onCheckChange}
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
                      value={`The Number Of Selected Students :    ${this.state.checkedCount}`}
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

                    <Button
                      variant="success"
                      size="sm"
                      className="fixed-right-bottom"
                      onClick={this.toggleModal}
                    >
                      Create Session
                    </Button>
                  </Form>
                  {this.state.isModalOpen && (
                    <CreateSession
                      isModalOpen={this.state.isModalOpen}
                      toggleModal={this.toggleModal}
                      handleCreateSession={this.handleCreateSession}
                      isCreatedSlotsEnough={this.isCreatedSlotsEnough}
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
