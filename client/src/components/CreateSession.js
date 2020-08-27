import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  FormGroup,
  Form,
} from "reactstrap";

class CreateSession extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal toggle={this.props.toggleModal} isOpen={this.props.isModalOpen}>
        <ModalHeader toggle={this.props.toggleModal}>
          Create Session
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleCreateSession}>
            <FormGroup>
              <Label htmlFor="date">Date :</Label>
              <Input type="Date" id="date" name="date"></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="time">Starting Time :</Label>
              <Input type="time" id="time" name="time"></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date">Total Duration :</Label>
              <Input
                type="text"
                id="totalduration"
                name="totalduration"
              ></Input>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateSession;
