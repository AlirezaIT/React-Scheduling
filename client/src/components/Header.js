import React from "react";

import { Nav, Navbar, NavbarToggler, Collapse, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Header = (props) => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <Navbar light expand="md">
          <div className="container">
            <NavbarToggler onClick={props.toggleNav} />
            <Collapse isOpen={props.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/teacher">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/teacher/create">
                    Create Exam
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    Show Report
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      )}
    </AuthContext.Consumer>
  );
};

export default Header;
