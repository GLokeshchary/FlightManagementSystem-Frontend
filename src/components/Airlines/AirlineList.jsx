import React, { useState, useEffect } from "react";
import { fetchAirlineData } from "../../services/api";
import "./AirlineList.css";
import ToastMessage from "../../notifications/ToastMessage";
function AirlineList() {
  const [airlines, setairlines] = useState([]);
  const fetchAirlines = async () => {
    try {
      const result = await fetchAirlineData("/airlines/all");
      if (result !== null) {
        setairlines(result);
        // ToastMessage({
        //   type: "SUCCESS",
        //   message: "Fetched Data Successfully!!",
        // });
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        ToastMessage({
          type: "ERR_NETWORK",
          message: "Server is too busy or is Temporarily down for Maintenance.",
        });
      }
      if (error.code === 500) {
        ToastMessage({
          type: "ERR_NETWORK",
          message: "Server is too busy or is Temporarily down for Maintenance.",
        });
      }
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    fetchAirlines();
    // const intervalId = setInterval(() => {
    //   fetchAirlines();
    // }, 2500);
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="list-container">
      <div className="airlineTable">
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Airline Name</th>
              <th>IataCode</th>
              <th>WebsiteLink</th>
              <th>TotalSeats</th>
              <th>RegistrationNumber</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {airlines?.map((airline, i) => (
              <tr key={i}>
                <td>
                  <img
                    src={airline.airlineLogo}
                    alt={airline.airlineName + ".png"}
                  />
                </td>
                <td>{airline.airlineName}</td>
                <td>{airline.iataCode}</td>
                <td>
                  <a
                    className="websitelink"
                    href={airline.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {airline.websiteLink}
                  </a>
                </td>
                <td>{airline.totalSeats}</td>
                <td>{airline.registrationNumber}</td>
                <td>{airline.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AirlineList;
