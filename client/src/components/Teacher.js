import React from "react";
import { Row, Col, Form, FormGroup, Container, Button } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
class Teacher extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    // alert("Hello");
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <Container>
            <h2 className="mt-5 , mb-5">
              Welcome Prof. {context.authUser?.name}{" "}
            </h2>

            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <Form>
                  <FormGroup>
                    <Link
                      onClick={this.handleClick}
                      width="80"
                      eventKey="link-1"
                      to={{
                        pathname: "/exam/create",
                      }}
                      className="btn btn-primary w-100"
                    >
                      Create Exam
                    </Link>
                  </FormGroup>
                  <FormGroup>
                    <Link
                      to={{
                        pathname: "/",
                      }}
                      className="btn btn-primary w-100"
                    >
                      Execute Exam
                    </Link>
                  </FormGroup>
                  <FormGroup>
                    <Link
                      to={{
                        pathname: "/exam/showreport",
                      }}
                      className="btn btn-primary w-100"
                    >
                      Show Report
                    </Link>
                  </FormGroup>

                  {/* <FormGroup>
            <Button variant="primary" type="Button" color="primary">
              Create Exam
            </Button>
          </FormGroup>

          <FormGroup>
            <Button variant="primary" type="Button" color="primary">
              Execute Exam
            </Button>
          </FormGroup>

          <FormGroup>
            <Button variant="primary" type="Button" color="primary">
              Report
            </Button>
          </FormGroup> */}
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Teacher;
