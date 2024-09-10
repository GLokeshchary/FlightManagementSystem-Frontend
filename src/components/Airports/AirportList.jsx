import React, { useEffect, useState } from "react";
import { fetchAirportData } from "../../services/api";
import ToastMessage from "../../notifications/ToastMessage";

function AirportList() {
  const [airports, setairports] = useState([]);
  const fetchAirports = async () => {
    try {
      const result = await fetchAirportData("/airports/all");

      if (result !== null) {
        setairports(result);
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
    }
  };
  useEffect(() => {
    fetchAirports();
    const intervalId = setInterval(() => {
      fetchAirports();
    }, 2500);
    return () => clearInterval(intervalId);
  }, []);
  const internaltionalStyle = {
    backgroundColor: "pink",
  };
  const DomesticStyle = {
    backgroundColor: "skyblue",
  };
  const customsStyle = {
    backgroundColor: "yellow",
  };
  return (
    <div className="list-container">
      <div className="airlineTable">
        <table>
          <thead>
            <tr>
              <th>Airport</th>
              <th>IataCode</th>
              <th>Country</th>
              <th>Airport Type</th>
              <th>City</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {airports?.map((airport, i) => (
              <tr key={i}>
                <td>{airport.airportName}</td>
                <td>{airport.iataCode}</td>
                <td>{airport.country}</td>
                {airport.airportType === "International" && (
                  <td style={internaltionalStyle}>{airport.airportType}</td>
                )}
                {airport.airportType === "Domestic" && (
                  <td style={DomesticStyle}>{airport.airportType}</td>
                )}
                {airport.airportType === "Customs" && (
                  <td style={customsStyle}>{airport.airportType}</td>
                )}
                <td>{airport.city}</td>
                <td>{airport.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AirportList;
