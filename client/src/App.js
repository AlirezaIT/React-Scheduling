import React, { useState } from "react";
import logo from "./logo.svg";
import { Form, FormGroup, Col, Label, Input } from "reactstrap";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "teacher" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // alert("Your Role is: " + this.state.value);
    console.log(this.state.value);
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
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>

              {this.state.value === "teacher" && (
                <>
                  {/* <Label htmlFor="email">Email</Label> */}
                  <Input type="text" id="email" placeholder="Email" />
                  <Input type="password" id="pass" placeholder="Password" />
                </>
              )}

              {this.state.value === "student" && (
                <>
                  <Input type="text" id="stNO" placeholder="Student Number" />
                </>
              )}

              <input type="submit" value="Submit" />
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
