import React from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";

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
      <div className="container">
        <div className="col-12">
          <h3> Select you Role : </h3>
        </div>
        <div className="col-12">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <select
                role={this.state.value}
                onChange={this.handleInputChange}
                name="role"
              >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>

              {this.state.role == "teacher" && (
                <>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  <Input
                    type="password"
                    id="pass"
                    name="pass"
                    placeholder="Password"
                    value={this.state.pass}
                    onChange={this.handleInputChange}
                  />
                </>
              )}

              {this.state.role === "student" && (
                <>
                  <Input
                    type="text"
                    id="stNO"
                    name="stNO"
                    placeholder="Student Number"
                    value={this.state.stNO}
                    onChange={this.handleInputChange}
                  />
                </>
              )}
            </FormGroup>
            <FormGroup row>
              <Col md={12}>
                <Button type="submit" color="primary">
                  Sumbit
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default UserRole;
