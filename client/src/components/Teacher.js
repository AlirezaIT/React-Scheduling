import React from "react";
import { Row, Col, Form, FormGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
class Teacher extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const teacher = this.props.teachers.map((teacher) => {
    //   return <div>hi {teacher.name}</div>;
    // });
    return (
      <AuthContext.Consumer>
        {(context) => (
          <Container>
            <h1> Welcome {context.authUser} </h1>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <Form>
                  <FormGroup>
                    <Link
                      width="80"
                      eventKey="link-1"
                      to={{
                        pathname: "/create-exam",
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
                        pathname: "/",
                      }}
                      className="btn btn-primary w-100"
                    >
                      Report
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
