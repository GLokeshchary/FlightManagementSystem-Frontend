import React from "react";
import "./FlightCard.css";
import { DISCOUNT } from "../../Constants/Constants";
import { useSelector } from "react-redux";
function FlightCard({ data }) {
  const values = useSelector((state) => state.search.searchForm) || {};
  const [hours, mintues] = data.depatureTime.split(":");
  const [ahours, amintues] = data.arrivalTime.split(":");
  return (
    <div>
      <div className="bookpanel-container">
        <div className="name-logo">
          <img src={data.airlineLogo} alt="logo.png" />
          <span className="smallsize">{data.airline}</span>
        </div>
        <div className="TimeAndPlace">
          <span className="TimeBold">{`${hours}:${mintues}`}</span>
          <span className="smallsize">{data.depatureAirport}</span>
        </div>
        <div className="duration">
          <span>{data.duration}</span>
          <span>-----------</span>
          <span>Nonstop</span>
        </div>
        <div className="TimeAndPlace">
          <span className="TimeBold">{`${ahours}:${amintues}`}</span>
          <span className="smallsize">{data.arrivalAirport}</span>
        </div>
        <div className="pricefare">
          {values.cabinClass === "Economy" && (
            <div>
              <span className="uprice">Rs. {data.economySeatFare}</span>
              <span className="dprice">
                Rs. {data.economySeatFare - DISCOUNT}
              </span>
            </div>
          )}
          {values.cabinClass === "Business Class" && (
            <div>
              <span className="uprice">Rs. {data.businessSeatFare}</span>
              <span className="dprice">
                Rs. {data.businessSeatFare - DISCOUNT}
              </span>
            </div>
          )}
          {values.cabinClass === "First Class" && (
            <div>
              <span className="uprice">Rs. {data.firstClassSeatFare}</span>
              <span className="dprice">
                Rs. {data.firstClassSeatFare - DISCOUNT}
              </span>
            </div>
          )}
        </div>
        <div className="booknow">
          <button>BOOK NOW</button>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
