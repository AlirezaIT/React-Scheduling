import React, { Component } from "react";

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

class BoookingSlots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slots: listSlots,
    };
  }
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
            {this.state.slots.map((slot) => {
              <tr key={slot.id}>
                <td>{slot.date}</td>
                <td>{slot.Start_time}</td>
                <td>{}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BoookingSlots;
