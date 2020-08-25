import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

class CreateSession extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal toggle={this.props.toggleModal} isOpen={this.props.isModalOpen}>
        <ModalHeader closeButton toggle={this.props.toggleModal}>
          Create Session
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>
    );
  }
}

export default CreateSession;
