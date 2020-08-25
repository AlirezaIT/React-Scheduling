import React from "react";
import {
  Form,
  FormGroup,
  Col,
  Button,
  FormControl,
  Container,
  Row,
} from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import DataTable from "../components/DataTable";

class AddExam extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <Container fluid>
            <Row>
              <Col>
                <Form>
                  <Form.Group row>
                    <Form.Label md={2}>Duration</Form.Label>
                    <Col md={10}>
                      <Form.Control
                        size="sm"
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        required
                        autoFocus
                      />
                    </Col>
                  </Form.Group>
                </Form>
                {/* <FormControl
                    size="sm"
                    className="sm"
                    type="text"
                    placeholder="Duration"
                    onChange={this.handleInputChange}
                    required
                  /> */}
              </Col>
              <Col sm={8}>
                <DataTable
                  classes={["table", "table-bordered"]}
                  header={["name", "age", "family"]}
                  data={[
                    {
                      name: "test5",
                      age: 20,
                      family: "aaa",
                    },
                    { name: "test12", age: 80 },

                    { name: "test42", age: 65 },

                    { name: "test25", age: 75 },
                    { name: "test20", age: 30, family: "bbb" },
                  ]}
                />
              </Col>
            </Row>
          </Container>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default AddExam;
