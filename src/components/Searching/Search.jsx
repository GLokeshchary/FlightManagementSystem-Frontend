import React, { useState, useEffect } from "react";
import "./Search.css";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { getAllAirportsList } from "../../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search } from "../../redux/slice/commonSlice";
function Search() {
  const [airportsList, setairportsList] = useState([]);
  const [filterairportsList, setfilterairportsList] = useState([]);
  const [filterairportsList1, setfilterairportsList1] = useState([]);
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [date, setdate] = useState("");
  const [travellers, settravellers] = useState(1);
  const [cabin, setcabin] = useState("Economy");
  const [isDropDownVisible, setDropdownVisible] = useState(false);
  const [isFromDropDownVisible, setFromDropdownVisible] = useState(false);
  const [isToDropDownVisible, setToDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const swapairports = () => {
    let temp = from;
    setfrom(to);
    setto(temp);
  };
  const fetchAirportsData = async () => {
    try {
      const result = await getAllAirportsList("/airports/airportslist");
      setairportsList(result);
    } catch (error) {
      console.log(error);
    }
  };
  const storevalues = {
    dept: from,
    dest: to,
    travelDate: date,
    noOfTravellers: travellers,
    cabinClass: cabin,
  };
  const handleSearchButton = () => {
    dispatch(search(storevalues));
    navigate(`/searchFlights/${from}/${to}`);
  };
  useEffect(() => {
    fetchAirportsData();
  }, []);
  return (
    <div className="search-container">
      <div className="search-heading">
        <h4>Millions of cheap flights. One simple search.</h4>
      </div>
      <div className="formContainer">
        <div className="fieldInput">
          <label>From</label>
          <input
            type="text"
            placeholder="city or airport"
            onClick={() => {
              setFromDropdownVisible(!isFromDropDownVisible);
            }}
            value={from}
            onChange={(e) => {
              setfilterairportsList(
                airportsList?.filter((airport) =>
                  airport.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
              if (e.target.value !== " ") {
                setfrom(e.target.value);
              }
            }}
          />
          <div>
            {isFromDropDownVisible && (
              <div className="DropDown">
                {filterairportsList
                  ?.filter((airport) => airport !== to)
                  .map((airport, i) => (
                    <div
                      key={i}
                      className="item"
                      onClick={() => {
                        setfrom(airport);
                        setFromDropdownVisible(!isFromDropDownVisible);
                      }}
                    >
                      <div className="item-icon">
                        <GiAirplaneDeparture size="" />
                      </div>
                      {airport}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="icon">
          <IoSwapHorizontalSharp onClick={swapairports} className="swapicon" />
        </div>
        <div className="fieldInput">
          <label htmlFor="">To</label>
          <input
            placeholder="city or airport"
            type="text"
            value={to}
            onChange={(e) => {
              setfilterairportsList1(
                airportsList?.filter((airport) =>
                  airport.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
              if (e.target.value !== " ") {
                setto(e.target.value);
              }
            }}
            onClick={() => {
              setToDropdownVisible(!isToDropDownVisible);
            }}
          />
          <div>
            {isToDropDownVisible && (
              <div className="DropDown">
                {filterairportsList1
                  ?.filter((airport) => airport !== from)
                  .map((airport, i) => (
                    <div
                      className="item"
                      onClick={() => {
                        setto(airport);
                        setToDropdownVisible(!isToDropDownVisible);
                      }}
                    >
                      <div className="item-icon">
                        <GiAirplaneArrival />
                      </div>
                      {airport}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="fieldInput">
          <label htmlFor="">Date</label>
          <input
            type="date"
            min={getCurrentDate()}
            onChange={(e) => {
              if (e.target.value !== "") {
                setdate(e.target.value);
              }
            }}
          />
          <div></div>
        </div>
        <div className="fieldInput">
          <label htmlFor="">Travellers & Cabin class</label>
          <input
            type="text"
            value={`${travellers} Travellers,${cabin}`}
            onClick={() => setDropdownVisible(!isDropDownVisible)}
          />
          <div>
            {isDropDownVisible && (
              <div className="TCDropDown">
                <div className="TC">
                  <label htmlFor="travellers">Travellers:</label>
                  <div className="increase">
                    <button
                      onClick={() => {
                        if (travellers > 0) {
                          settravellers(travellers - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    {travellers}
                    <button
                      onClick={() => {
                        if (travellers < 5) {
                          settravellers(travellers + 1);
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="TC">
                  <label htmlFor="cabin">Cabin:</label>
                  <select
                    id="cabin"
                    name="cabin"
                    onChange={(e) => setcabin(e.target.value)}
                  >
                    {["Economy", "Business Class", "First Class"].map(
                      (cabin) => (
                        <option
                          onClick={() => setDropdownVisible(!isDropDownVisible)}
                          key={cabin}
                          value={cabin}
                        >
                          {cabin}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="searchButton">
          <button type="submit" onClick={handleSearchButton}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
