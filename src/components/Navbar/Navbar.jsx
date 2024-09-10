import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <div className="appname">
        <Link to="/">
          <div className="appname-left">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDUi2rJxsOqNbL0YRQQCHOuNusbxp-akZQnA&usqp=CAU"
              alt="logo"
            />
            <div>
              <p className="app-name-header">GARUDA</p>
            </div>
          </div>
        </Link>
        <div className="appname-right">
          <div>login-person-name</div>
          <div className="logintab">
            <div>icon</div>
            <div>Log in</div>
            <div>Log out</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
