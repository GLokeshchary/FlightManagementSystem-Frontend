import axios from "axios";

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
});

//Fetching Airlines Data
const fetchAirlineData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log("Error in Fetch Airline data", error);
    throw error;
  }
};
const fetchAirportData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getAllAirportsList = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getAllScheduledFlights = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getAllScheduledFlightsbetweenTwoPoints = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getAllAirlineNames = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const saveAirport = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      return error.response;
    }
  }
};

const saveAirline = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      return error.response;
    }
  }
};
const saveScheduledFlight = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      return error.response;
    }
  }
};

export {
  fetchAirlineData,
  saveAirline,
  fetchAirportData,
  saveAirport,
  getAllAirportsList,
  getAllScheduledFlights,
  getAllAirlineNames,
  saveScheduledFlight,
  getAllScheduledFlightsbetweenTwoPoints,
};
