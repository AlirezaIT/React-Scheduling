import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      slots: listSlots,
    };
  }
  componentDidMount() {
    console.log("list Slots :", this.props);
  }

  handlersave = () => {
    console.log("saving");
  };
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
            {this.state.slots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.date}</td>
                <td>{slot.Start_time}</td>
                <td>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <row>
          <Link
            onClick={() => this.handlersave()}
            width="40"
            eventKey="link-1"
            to={{
              pathname: "/student/",
            }}
            className="btn btn-primary w-100"
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
            className="btn btn-danger w-100"
          >
            Cancel
          </Link>
        </row>
      </div>
    );
  }
}

export default BoookingSlot;
