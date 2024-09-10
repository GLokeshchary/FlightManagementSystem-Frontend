import React, { useEffect, useState } from "react";
import Mainheader from "../HeaderComponent/Mainheader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosPricetags } from "react-icons/io";
import SearchResults from "./SearchResults";
import {
  getAllAirlineNames,
  getAllScheduledFlightsbetweenTwoPoints,
} from "../../services/api";
import ToastMessage from "../../notifications/ToastMessage";
import "./SearchFlights.css";
function SearchFlights() {
  const { dept, dest } = useParams();
  const [airlines, setairlines] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const values = useSelector((state) => state.search.searchForm) || {};
  const [flights, setflights] = useState([]);
  const [flights2, setflights2] = useState([]);
  const [cheapestPrice, setcheapestPrice] = useState(0);
  const [highestPrice, sethighestPrice] = useState(0);
  const [pricerange, setpricerange] = useState(highestPrice);
  let cheapestFlight = flights[0];
  let highestFlight = flights[0];
  const cabin = values.cabinClass;
  console.log(cabin);
  useEffect(() => {
    fetchScheduledFlightsBewteenTwoAirports();
  }, []);
  useEffect(() => {
    fetch2();
    for (let index = 0; index < flights.length; index++) {
      const currrentflight = flights[index];
      if (cabin === "Economy") {
        if (currrentflight.economySeatFare < cheapestFlight.economySeatFare) {
          cheapestFlight = currrentflight;
          setcheapestPrice(currrentflight.economySeatFare);
        }
        if (currrentflight.economySeatFare > highestFlight.economySeatFare) {
          highestFlight = currrentflight;
          sethighestPrice(highestFlight.economySeatFare);
        }
      }
      if (cabin === "Business Class") {
        if (currrentflight.businessSeatFare < cheapestFlight.businessSeatFare) {
          cheapestFlight = currrentflight;
          setcheapestPrice(currrentflight.businessSeatFare);
        }
        if (currrentflight.businessSeatFare >= highestFlight.businessSeatFare) {
          highestFlight = currrentflight;
          sethighestPrice(highestFlight.businessSeatFare);
        }
      }
      if (cabin === "First Class") {
        if (
          currrentflight.firstClassSeatFare < cheapestFlight.firstClassSeatFare
        ) {
          cheapestFlight = currrentflight;
          setcheapestPrice(currrentflight.firstClassSeatFare);
        }
        if (
          currrentflight.firstClassSeatFare >= highestFlight.firstClassSeatFare
        ) {
          highestFlight = currrentflight;
          sethighestPrice(highestFlight.firstClassSeatFare);
        }
      }
    }
  }, [flights2]);

  const mDept = dept.replace(/\([^)]*\)/g, "");
  const mDest = dest.replace(/\([^)]*\)/g, "");
  const fetch2 = async () => {
    try {
      const result = await getAllScheduledFlightsbetweenTwoPoints(
        `/scheduledFlights/search/${mDept}/${mDest}`
      );
      if (result !== null) {
        setflights2(result.ScheduledFlights);
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
  const fetchScheduledFlightsBewteenTwoAirports = async () => {
    try {
      const result = await getAllScheduledFlightsbetweenTwoPoints(
        `/scheduledFlights/search/${mDept}/${mDest}`
      );
      if (result !== null) {
        setflights(result.ScheduledFlights);
        setairlines(result.AirlinesLst);
        setSelectedAirlines(result.AirlinesLst);
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
  const handleChekBoxChnage = (airline) => {
    const updatedSelection = selectedAirlines.includes(airline)
      ? selectedAirlines.filter((selected) => selected !== airline)
      : [...selectedAirlines, airline];
    setSelectedAirlines(updatedSelection);
  };
  const filteredFlights = flights.filter((flight) =>
    selectedAirlines.includes(flight.airline)
  );

  return (
    <div className="sflightContainer">
      <div className="header">
        <Mainheader
          travellers={values.noOfTravellers}
          cabin={values.cabinClass}
          position={"center"}
          name={`${mDept} - ${mDest}`}
        />
      </div>
      <div className="content">
        <div className="sideFliter">
          <div className="airlineFilter">
            <h3>Airline</h3>
            {airlines?.map((airline, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => handleChekBoxChnage(airline)}
                />
                {airline}
              </label>
            ))}
          </div>
          {/* <div className="priceRangeFilter">
            <h3>Price Range</h3>
            <input
              type="range"
              min={cheapestPrice}
              max={highestPrice}
              onChange={(e) => setpricerange(e.target.value)}
            />
            <span>Rs. {pricerange}</span>
          </div> */}
        </div>
        <div className="searchlist">
          <div className="priceFliter">
            <div className="pricetype">
              <IoIosPricetags />
              <span>Cheapest</span>
              <h2>Rs. {cheapestPrice}</h2>
            </div>
            <div className="pricetype ty2">
              <IoIosPricetags />
              <span>Highest</span>
              <h2>Rs. {highestPrice}</h2>
            </div>
            <div className="pricetype ty3">
              <IoIosPricetags />
              <span>Best</span>
              <h2>Rs. {cheapestPrice}</h2>
            </div>
          </div>
          <SearchResults
            data={filteredFlights}
            cabin={values.cabinClass}
            cheapestFlight={cheapestFlight}
            highestFlight={highestFlight}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchFlights;
