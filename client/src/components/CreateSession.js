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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";

class CreateSession extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().toDate(),
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
    ev.preventDefault();
    this.props.toggleModal(); //close modal once it is created;
    let session = Object.assign({}, this.state);

    this.props.slotGenerator(session);
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
              <DatePicker
                selected={this.state.date}
                name="date"
                value={this.state.date}
                onChange={(date) => this.handleInputChange(date, "date")}
                // value={this.state.date}
                minDate={new Date()}
              />
              {/* <Input
                type="Date"
                id="date"
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              ></Input> */}
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
