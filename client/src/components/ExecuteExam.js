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
import { Redirect, Link } from "react-router-dom";

class ExecuteExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam_no: "",
    };
  }

  componentDidMount() {
    this.props.getExamtLists();
  }

  executeExamHandler = (exam_no) => {
    this.setState({
      exam_no: exam_no,
    });
    this.props.getTeacherSlots(exam_no);
  };

  render() {
    if (this.state.exam_no) {
      return <Redirect to={`/exams/slots?exam_no=${this.state.exam_no}`} />;
    }
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authUser === null && <Redirect to="/login"></Redirect>}
            <Container>
              <Row>
                <Col md={12}>
                  {this.props.len !== 0 ? (
                    <Table striped bordered hover size="sm" className="mt-5">
                      <thead>
                        <tr>
                          {/* <th>#</th> */}
                          <th>Exam Number</th>
                          <th>Date</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.examLists?.map((examList) => (
                          <tr key={examList.id}>
                            {/* <td>{examList.id}</td> */}
                            <td>{examList.exam_no}</td>
                            <td>{examList.date}</td>
                            <td>
                              <Form.Group controlId="">
                                <Link
                                  onClick={() =>
                                    this.executeExamHandler(examList.exam_no)
                                  }
                                  // to={{
                                  //   pathname: "/exams/slots",
                                  // }}
                                  name="execute"
                                  className="btn btn-primary"
                                >
                                  Execute
                                </Link>
                              </Form.Group>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="d-flex justify-content-center text-danger display-5 mt-5">
                      There is no Exam to execute
                    </p>
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

export default ExecuteExam;
