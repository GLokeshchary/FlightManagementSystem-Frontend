import React from "react";
import "./ScheFlight.css";
import Mainheader from "../HeaderComponent/Mainheader";
import { NavLink, Outlet } from "react-router-dom";
function ScheduledFlights() {
  document.title = "Scheduled Flights";
  return (
    <div className="airlineContainer">
      <div className="airlineheader">
        <Mainheader name="ScheduledFlights" />
      </div>
      <div className="al-links">
        <NavLink to="/admin/scheduledFlights/list">
          <div className="al-link1">List</div>
        </NavLink>
        <NavLink to="/admin/scheduledFlights/save">
          <div className="al-link1">New Scheduled Flight</div>
        </NavLink>
      </div>
      <hr />
      <div className="airline-content">
        <Outlet />
      </div>
    </div>
  );
}

export default ScheduledFlights;
