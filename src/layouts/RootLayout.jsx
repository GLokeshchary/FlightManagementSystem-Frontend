import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Footerpart from "../components/FooterDesign/Footerpart";
import "./RootLayout.css";
function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <ToastContainer />
      <main>
        <Outlet />
      </main>
      <div style={{ height: 8 }}></div>
      <footer>
        <Footerpart />
      </footer>
    </div>
  );
}

export default RootLayout;
