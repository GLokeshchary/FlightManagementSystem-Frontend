import React, { useEffect, useState } from "react";
import { getAllScheduledFlights } from "../../services/api";
import ToastMessage from "../../notifications/ToastMessage";

function ScheFlightList() {
  const [scheduledFlights, setscheduledFlights] = useState([]);
  const fetchScheduledFlights = async () => {
    try {
      const result = await getAllScheduledFlights("/scheduledFlights/all");
      if (result !== null) {
        setscheduledFlights(result);
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
    fetchScheduledFlights();
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
              <th>Flight Number</th>
              <th>Airline Name</th>
              <th>DepatureAirport</th>
              <th>ArrivalAirport</th>
              <th>depatureTime</th>
              <th>arrivalTime</th>
              <th>economySeatFare</th>
              <th>businessSeatFare</th>
              <th>firstClassSeatFare</th>
              <th>flightStatus</th>
              <th>totalSeatsAvaliable</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {scheduledFlights?.map((scheduledflight, i) => (
              <tr>
                <td>{scheduledflight.flightNumber}</td>
                <td>{scheduledflight.airline}</td>
                <td>{scheduledflight.depatureAirport}</td>
                <td>{scheduledflight.arrivalAirport}</td>
                <td>{scheduledflight.depatureTime}</td>
                <td>{scheduledflight.arrivalTime}</td>
                <td>{scheduledflight.economySeatFare}</td>
                <td>{scheduledflight.businessSeatFare}</td>
                <td>{scheduledflight.firstClassSeatFare}</td>
                <td>{scheduledflight.flightStatus}</td>
                <td>{scheduledflight.totalSeatsAvaliable}</td>
                <td>{scheduledflight.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheFlightList;
