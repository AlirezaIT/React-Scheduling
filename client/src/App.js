import React, { useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import UserRole from "./components/UserRole";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <UserRole />;
  }
}

export default App;
