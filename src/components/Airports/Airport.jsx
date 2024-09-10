import React from "react";
import Mainheader from "../HeaderComponent/Mainheader";
import "./Airport.css";
import { NavLink, Outlet } from "react-router-dom";

function Airport() {
  document.title = "Airports";
  return (
    <div className="airlineContainer">
      <div className="airlineheader">
        <Mainheader name="Airports" />
      </div>
      <div className="al-links">
        <NavLink to="/admin/airports/list">
          <div className="al-link1">List</div>
        </NavLink>
        <NavLink to="/admin/airports/save">
          <div className="al-link1">New Aiport</div>
        </NavLink>
      </div>
      <hr />
      <div className="airline-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Airport;
