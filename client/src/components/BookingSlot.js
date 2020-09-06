import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../api/API";
import { FormGroup } from "reactstrap";

//SHOWING THE EXAM'S SLOT IN THIS PAGE
class BoookingSlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlot: {},
    };
  }

  handlerSelect = (slot) => {
    //get details in object form of selected slot and store into selectedSlot

    this.setState({
      selectedSlot: slot,
    });
  };

  handlersave = async () => {
    //saving (PUT) selectedSlot object into database
    const result = await API.reservingSlot(this.state.selectedSlot.id); //passing only the slot's ID to Api
    console.log("saving into database", result);
  };

  //---------------------rendering the list of availabe slot and saving and cenceling button -------------------
  render() {
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
            {this.props.listSlots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.date}</td>
                <td>{slot.start_time}</td>
                <td>
                  <input
                    onChange={() => this.handlerSelect(slot)}
                    class="form-check-input"
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
        <row>
          {this.state.selectedSlot ? (
            <FormGroup>
              <Link
                onClick={this.handlersave} //reference to handlersave function
                width="40"
                eventKey="link-1"
                to={{
                  pathname: "/student/",
                }}
                className="btn btn-primary w-30"
              >
                Save
              </Link>
            </FormGroup>
          ) : (
            <></>
          )}
        </row>
        <row>
          <Link
            width="40"
            eventKey="link-1"
            to={{
              pathname: "/student/", //back to the student main page by clicking cancel button
            }}
            className="btn btn-danger w-30"
          >
            Cancel
          </Link>
        </row>
      </div>
    );
  }
}

export default BoookingSlot;
