import React from "react";
import { Form, FormGroup, Col, Button, Container, Row } from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import DataTable from "./DataTable";
import CreateSession from "./CreateSession";

class CreateExam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <>
        <AuthContext.Consumer>
          {(context) => (
            <Container fluid>
              <Row>
                <Col md={4}>
                  <Form>
                    <Form.Group Row>
                      <Form.Label column htmlFor="duration" sm={2}>
                        Duration
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
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
                  </Form>
                  <Button
                    variant="success"
                    size="sm"
                    className="fixed-right-bottom"
                    onClick={this.toggleModal}
                  >
                    Create Session
                  </Button>
                  {this.state.isModalOpen && (
                    <CreateSession
                      isModalOpen={this.state.isModalOpen}
                      toggleModal={this.toggleModal}
                    />
                  )}
                </Col>

                <Col md={8}>
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
      </>
    );
  }
}

export default CreateExam;
