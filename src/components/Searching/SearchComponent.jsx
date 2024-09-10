import React, { useEffect, useState } from "react";
import "./Search.css";
import { getAllAirportsList } from "../../services/api";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
function SearchComponent() {
  const [airportsList, setairportsList] = useState([]);
  const [departFrom, setdepartFrom] = useState("");
  const [arrivalTo, setarrivalTo] = useState("");
  const [departDate, setdepartDate] = useState("");
  const [isDropDownVisible, setDropdownVisible] = useState(false);
  const [selectedTravelers, setSelectedTravelers] = useState(1);
  const [selectedCabin, setSelectedCabin] = useState("Economy");
  const toggleDropdown = () => {
    setDropdownVisible(!isDropDownVisible);
  };
  console.log(departFrom);
  const handleTravelersChange = (e) => {
    setSelectedTravelers(e.target.value);
  };

  const handleCabinChange = (e) => {
    setSelectedCabin(e.target.value);
    setDropdownVisible(!isDropDownVisible);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const onSubmit = () => {
    console.log(departFrom);
  };
  const fetchAirportsData = async () => {
    try {
      const result = await getAllAirportsList("/airports/airportslist");
      setairportsList(result);
    } catch (error) {}
  };
  useEffect(() => {
    fetchAirportsData();
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="search-heading">
          <h4>Millions of cheap flights. One simple search.</h4>
        </div>
        <div className="search-form">
          <div className="fieldInput">
            <span>From</span>
            <Autocomplete
              id="airport-select-demo"
              sx={{ width: "100%" }}
              options={airportsList}
              aria-required
              renderInput={(params) => (
                <TextField
                  onChange={(e) => {
                    setdepartFrom(e.target.value);
                  }}
                  {...params}
                  placeholder="Country or Code"
                />
              )}
            />
          </div>
          {/* <!-- <div className="swap-icon">
                swapicon
            </div>  */}
          <div className="fieldInput">
            <span>To</span>
            <Autocomplete
              id="airport-select-demo"
              sx={{ width: "100%" }}
              options={airportsList}
              aria-required
              renderInput={(params) => (
                <TextField
                  onChange={(e) => {
                    setarrivalTo(e.target.value);
                  }}
                  placeholder="Country or Code"
                  {...params}
                />
              )}
            />
          </div>
          <div className="fieldInput">
            <span>Departure Date</span>
            <div className="deptdate">
              <input
                type="date"
                id="datePicker"
                min={getCurrentDate()}
                required
                onChange={(e) => setdepartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="fieldInput">
            <div className="TravellersField">
              <span>Travellers & Cabin class</span>
              <div className="TravellersInput">
                <input
                  value={`${selectedTravelers} Travellers,${selectedCabin} Class`}
                  onClick={toggleDropdown}
                  required
                />
              </div>
              {isDropDownVisible && (
                <div>
                  <div className="dropdown-container">
                    <label htmlFor="travelers">Travelers:</label>
                    <select
                      id="travellers"
                      value={selectedTravelers}
                      onChange={handleTravelersChange}
                    >
                      {[1, 2, 3, 4, 5].map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="cabin">Cabin:</label>
                    <select
                      id="cabin"
                      value={selectedCabin}
                      onChange={handleCabinChange}
                    >
                      {["Economy", "Business", "First Class"].map((cabin) => (
                        <option key={cabin} value={cabin}>
                          {cabin}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="search-button">
            <button onClick={onSubmit}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
