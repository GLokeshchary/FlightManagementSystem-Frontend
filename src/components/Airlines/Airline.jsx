import React from "react";
import Mainheader from "../HeaderComponent/Mainheader";
import "./Airline.css";
import { Link, NavLink, Outlet } from "react-router-dom";
function Airline() {
  document.title = "Airlines";
  return (
    <div className="airlineContainer">
      <div className="airlineheader">
        <Mainheader name="Airlines" />
      </div>
      <div className="al-links">
        <NavLink to="/admin/airlines/list">
          <div className="al-link1">List</div>
        </NavLink>
        <NavLink to="/admin/airlines/save">
          <div className="al-link1">New Airline</div>
        </NavLink>
      </div>
      <hr />
      <div className="airline-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Airline;
