import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ToastMessage from "../../notifications/ToastMessage";
import * as Yup from "yup";
import FormikControl from "../../formik/FormikControl";
import {
  getAllAirlineNames,
  getAllAirportsList,
  saveScheduledFlight,
} from "../../services/api";
const initialScheduledFlightValues = {
  flightNumber: 0,
  airline: "",
  depatureAirport: "",
  arrivalAirport: "",
  depatureTime: "",
  arrivalTime: "",
  economySeatFare: 0,
  businessSeatFare: 0,
  firstClassSeatFare: 0,
  flightStatus: "",
  totalSeatsAvaliable: 0,
};
const flightStatuslist = ["Select Status", "Scheduled", "Arrived", "Depatured"];

const validationSchema = Yup.object({
  flightNumber: Yup.number()
    .min(1000, "Must be exactly 5 digits")
    .max(9999, "Must be exactly 5 digits")
    .required("Required"),
  airline: Yup.string().required("Required"),
  depatureAirport: Yup.string().required("Required"),
  arrivalAirport: Yup.string().required("Required"),
  depatureTime: Yup.string().required("Required"),
  arrivalTime: Yup.string().required("Required"),
  economySeatFare: Yup.number().required("Required"),
  businessSeatFare: Yup.number().required("Required"),
  firstClassSeatFare: Yup.number().required("Required"),
  flightStatus: Yup.string().required("Required"),
  totalSeatsAvaliable: Yup.number().required("Required"),
});

function SaveScheFlight() {
  const [airlineNames, setairlineNames] = useState([]);
  const [airportsNames, setairportsNames] = useState([]);
  const onSubmit = async (values, formikHelpers) => {
    try {
      const result = await saveScheduledFlight(
        "/scheduledFlights/save",
        values
      );
      console.log(result);
      if (result.responseStatus === "ScheduledFlight Saved Succesfully") {
        ToastMessage({
          type: "SUCCESS",
          message: "Flight Scheduled Succesfully",
        });
        formikHelpers.resetForm();
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
  const fetchAirlineNames = async () => {
    try {
      const result = await getAllAirlineNames("/airlines/airlineNames");
      const result2 = await getAllAirportsList("/airports/airportslist");
      if (result !== null && result2 !== null) {
        let list1 = ["Select Airline"];
        let list2 = ["Select Airport"];
        for (let i of result) {
          list1.push(i);
        }
        for (let i of result2) {
          list2.push(`${i}`);
        }
        setairlineNames(list1);
        setairportsNames(list2);
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
    fetchAirlineNames();
  }, []);
  return (
    <div className="saveAirlinecontainer">
      <div className="airlineForm-container">
        <Formik
          initialValues={initialScheduledFlightValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form>
              <div>
                <FormikControl
                  control="input"
                  label="Flight Number :"
                  name="flightNumber"
                  type="number"
                  placeholder="Enter flightNumber"
                />
              </div>
              <div>
                <FormikControl
                  control="select"
                  label="Airline :"
                  name="airline"
                  type="text"
                  options={airlineNames}
                  placeholder="Select Airline"
                />
              </div>
              <div>
                <FormikControl
                  control="select"
                  label="Depature Airport :"
                  name="depatureAirport"
                  type="text"
                  options={airportsNames}
                  placeholder="Select Airport"
                />
              </div>
              <div>
                <FormikControl
                  control="select"
                  label="Arrival Airport :"
                  name="arrivalAirport"
                  type="text"
                  options={airportsNames}
                  placeholder="Select Airport"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Depature Time :"
                  name="depatureTime"
                  type="time"
                  placeholder="Select Time"
                />
                <FormikControl
                  control="input"
                  label="Arrival Time :"
                  name="arrivalTime"
                  type="time"
                  placeholder="Select Time"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Economy SeatFare :"
                  name="economySeatFare"
                  type="number"
                  placeholder="Enter Fare "
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Business SeatFare :"
                  name="businessSeatFare"
                  type="number"
                  placeholder="Enter Fare"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="FirstClass SeatFare :"
                  name="firstClassSeatFare"
                  type="number"
                  placeholder="Enter Fare"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Total SeatsAvaliable :"
                  name="totalSeatsAvaliable"
                  type="number"
                  placeholder="Enter SeatsAvaliable"
                />
              </div>
              <div>
                <FormikControl
                  control="select"
                  label="Flight Status :"
                  name="flightStatus"
                  type="text"
                  options={flightStatuslist}
                  placeholder="Enter Status"
                />
              </div>
              <div className="airlineSubmit">
                <button type="submit" disabled={!formik.isValid}>
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SaveScheFlight;
