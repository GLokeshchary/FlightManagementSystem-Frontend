import React, { useEffect, useState } from "react";
import FlightCard from "./FlightCard";
import "./SearchResults.css";
function SearchResults({ data, cabin, cheapestFlight, highestFlight }) {
  return (
    <div className="slContainer">
      <div className="flightresults">
        {data?.map((flight, i) => (
          <div className="flightCard" key={i}>
            <FlightCard data={flight} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
