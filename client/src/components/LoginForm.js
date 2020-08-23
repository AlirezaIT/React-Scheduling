import React from "react";
import {
  Form,
  FormGroup,
  Col,
  Button,
  FormControl,
  Container,
  Row,
  Alert,
} from "react-bootstrap";

import { AuthContext } from "../auth/AuthContext";

class UserRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      stNO: "",
      role: "teacher",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log();
    alert(JSON.stringify(this.state));
    this.setState({
      email: "",
      pass: "",
      stNO: "",
    });
  }
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <Container>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <h3> Select your Role: </h3>

                <Form method="POST" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <select
                      className="form-control"
                      role={this.state.value}
                      onChange={this.handleInputChange}
                      name="role"
                    >
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </select>
                  </FormGroup>

                  {this.state.role == "teacher" && (
                    <>
                      <FormGroup>
                        <FormControl
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          required
                          autoFocus
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          type="password"
                          id="pass"
                          name="pass"
                          placeholder="Password"
                          value={this.state.pass}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>
                    </>
                  )}

                  {this.state.role === "student" && (
                    <>
                      <FormGroup>
                        <FormControl
                          type="text"
                          id="stNO"
                          name="stNO"
                          placeholder="Student Number"
                          value={this.state.stNO}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>
                    </>
                  )}

                  <FormGroup>
                    <Button variant="primary" type="submit" color="primary">
                      Login
                    </Button>
                  </FormGroup>
                </Form>
                {context.authErr && (
                  <Alert variant="danger">{context.authErr.msg}</Alert>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default UserRole;
