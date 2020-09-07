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
  }

  componentDidMount() {
    this.props.getExamtLists();
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authUser === null && <Redirect to="/login"></Redirect>}
            <Container>
              <Row>
                <Col md={12}>
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
                                // onChange={(event) =>
                                //   this.onCheckChange(event, studentList.id)
                                // }

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
