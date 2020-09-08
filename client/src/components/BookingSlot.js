import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../api/API";
import { Row } from "reactstrap";

//SHOWING THE EXAM'S SLOT IN THIS PAGE
class BoookingSlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlot: {},
      buttonDisabled: true,
      mounted: false,
    };
  }
  componentDidMount() {
    console.log("choghlar", window.location.href);
    this.props.handleReserve(window.location.href.split("=")[1]);
  }

  componentDidMount() {
    this.props.handleReserve(window.location.href.split("=")[1]);
  }

  handlerSelect = async (slot) => {
    //get details in object form of selected slot and store into selectedSlot

    await this.setState({
      selectedSlot: slot,
      buttonDisabled: false,
    });
  };

  handlersave = async () => {
    //saving (PUT) selectedSlot object into database
    const result = await API.reservingSlot(this.state.selectedSlot.id); //passing only the slot's ID to Api
    console.log("saving into database", result);
    this.setState({ redirect: true });
  };

  //---------------------rendering the list of availabe slot and saving and cenceling button -------------------
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/student" />;
    }
    // console.log("asad", this.props.listSlots);
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>Choose..</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listSlots.map((slot, index) => (
              <tr key={index}>
                <td>{slot.date}</td>
                <td>{slot.start_time}</td>
                <td>
                  <input
                    onChange={() => this.handlerSelect(slot)}
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Row>
          {/* <Link
                  onClick={this.handlersave} //reference to handlersave function
                  width="40"
                  
                  to={{
                    pathname: "/student/",
                  }}
                  className="btn btn-primary w-30"
                >
                  Save
                </Link> */}
          <button
            onClick={this.handlersave}
            disabled={this.state.buttonDisabled}
            className="btn btn-primary w-30  "
          >
            Save
          </button>
        </Row>
        <Row>
          <Link
            width="40"
            key="1"
            to={{
              pathname: "/student/", //back to the student main page by clicking cancel button
            }}
            className="btn btn-danger w-30"
          >
            Cancel
          </Link>
        </Row>
      </div>
    );
  }
}

export default BoookingSlot;
