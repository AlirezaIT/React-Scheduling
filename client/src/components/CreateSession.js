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

    this.state = {
      date: "",
      startingTime: "",
      totalDuration: "",
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleCreateSession = (ev) => {
    this.props.toggleModal(); //close modal once it is created;
    let exams = Object.assign({}, this.state);
    console.log(exams);
    this.props.isCreatedSlotsEnough(exams);
    ev.preventDefault();
  };
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
              <Input
                type="Date"
                id="date"
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="startingTime">Starting Time :</Label>
              <Input
                type="time"
                id="startingTime"
                name="startingTime"
                value={this.state.startingTime}
                onChange={this.handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date">Total Duration :</Label>
              <Input
                type="text"
                id="totalduration"
                name="totalDuration"
                value={this.state.totalDuration}
                onChange={this.handleInputChange}
              ></Input>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Create
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateSession;
