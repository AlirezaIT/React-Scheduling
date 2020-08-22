import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import DataTable from "./components/DataTable";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authErr: "", authUser: "" };
  }

  // componentDidMount() {
  //   //check if the user is authenticated
  //   API.isAuthenticated()
  //     .then((user) => {
  //       this.setState({ authUser: user });
  //     })
  //     .catch((err) => {
  //       this.setState({ authErr: err.errorObj });
  //       this.props.history.push("/login");
  //     });
  // }

  // handleErrors(err) {
  //   if (err) {
  //     if (err.status && err.status === 401) {
  //       this.setState({ authErr: err.errorObj });
  //       this.props.history.push("/login");
  //     }
  //   }
  // }

  render() {
    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login,
      logoutUser: this.logout,
    };

    return (
      <AuthContext.Provider value={value}>
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Redirect from="/" to="/login" />
          </Switch>
          {/* <LoginForm />; */}
          <DataTable
            classes={["table", "table-bordered"]}
            header={["name", "age"]}
            data={[
              { name: "test", age: 20 },
              { name: "test", age: 20 },
            ]}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
