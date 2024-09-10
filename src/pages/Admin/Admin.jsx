import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Admin.css";
function Admin() {
  return (
    <>
      <div className="totalConatiner">
        <div className="sidenavbar">
          <div className="adminname">
            <div>Admin</div>
            <div className="small">gmail.com</div>
          </div>
          <div className="navlinks">
            <div className="items-side">
              <div className="sidenavlink">DASHBOARD</div>
              <NavLink to="/admin/airports">
                <div className="sidenavlink">AIRPORTS</div>
              </NavLink>
              <NavLink to="/admin/airlines">
                <div className="sidenavlink">AIRLINES</div>
              </NavLink>
              <NavLink to="/admin/scheduledFlights">
                <div className="sidenavlink">SCHEDULED FLIGHTS</div>
              </NavLink>
              <div className="sidenavlink">CUSTOMERS</div>
            </div>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Admin;
