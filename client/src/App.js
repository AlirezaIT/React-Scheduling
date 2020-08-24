import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserRole from "./components/UserRole";
import DataTable from "./components/DataTable";
import StudentPage from "./components/studentPage";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <UserRole />;
        <DataTable
          classes={["table", "table-bordered"]}
          header={["name", "age"]}
          data={[
            { name: "test", age: 20 },
            { name: "test", age: 20 },
          ]}
        />
        <StudentPage />
      </div>
    );
  }
}

export default App;
