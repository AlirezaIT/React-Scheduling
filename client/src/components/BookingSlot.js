import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../api/API";
const listSlots = [
  {
    id: 1,
    date: "20200824",
    Start_time: "10:10",
  },
  {
    id: 2,
    date: "20200824",
    Start_time: "10:20",
  },
  {
    id: 3,
    date: "20200824",
    Start_time: "10:30",
  },
  {
    id: 4,
    date: "20200824",
    Start_time: "10:40",
  },
];

class BoookingSlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlot: { listSlots },
    };
  }
  componentDidMount() {
    console.log("list Slots******* :", this.props);
  }

  handlerSelect = (slot) => {
    console.log("details of slot", slot);
    this.setState({
      selectedSlot: slot,
    });
  };

  handlersave = async () => {
    console.log("content of saving into database", this.state.selectedSlot);
    const result = await API.reservingSlot(this.state.selectedSlot.id);
    console.log("result of saving into database", result);
  };
  //TODO: checking the  result

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
          <Link
            onClick={this.handlersave}
            width="40"
            eventKey="link-1"
            to={{
              pathname: "/student/",
            }}
            className="btn btn-primary w-30"
          >
            Save
          </Link>
        </row>
        <row>
          <Link
            width="40"
            eventKey="link-1"
            to={{
              pathname: "/student/",
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
