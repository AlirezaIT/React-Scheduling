import React, { Component } from "react";

class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      address: {
        street: "",
      },
    };
  }
  renderExams() {
    if (this.state.exams.lengh === 0)
      return <p>There are no any exams for you at this moment</p>;

    return (
      <ul>
        {this.state.exams.map((exam) => (
          <li key={exam}>{exam}</li>
        ))}
      </ul>
    );
  }

  //   styles = {
  //     fontSize: 50,
  //     fontWeight: "Bold",
  //   };

  handleIncrement = (product) => {
    console.log("increment clicked", this.state.count);
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <React.Fragment>
        {this.renderExams()}
        {/* <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
        <button>Select</button> */}
        <button onClick={this.handleIncrement}></button>
        <button onClick={() => this.handleIncrement(product)}></button>
      </React.Fragment>
    );
  }
  getBadgeClasses() {
    const classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    // return count === 0 ? "zero" : count;
    return count === 0 ? <h1>zero </h1> : count;
  }
}

export default StudentPage;
