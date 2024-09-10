import React from "react";
import "./SaveAirline.css";
import FormikControl from "../../formik/FormikControl";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { saveAirline } from "../../services/api";
import ToastMessage from "../../notifications/ToastMessage";
const initialAirlineValues = {
  registrationNumber: 0,
  airlineName: "",
  airlineLogo: "",
  iataCode: "",
  websiteLink: "",
  economySeats: 100,
  businessSeats: 100,
  firstClassSeats: 100,
};
const validationSchema = Yup.object({
  registrationNumber: Yup.number().min(5).required("Required"),
  airlineName: Yup.string().required("Requried"),
  iataCode: Yup.string().required("Required"),
  websiteLink: Yup.string().required("Required"),
  economySeats: Yup.number().required("Required"),
  businessSeats: Yup.number().required("Required"),
  firstClassSeats: Yup.number().required("Required"),
  // imageLogoType: Yup.string().required("Required"),
  airlineLogo: Yup.string().required("Required"),
});
function SaveAirline() {
  const onSubmit = async (values, formikHelpers) => {
    try {
      const result = await saveAirline("/airlines/save", values);
      console.log(result);
      if (result.data.responseStatus === "Airline already exists") {
        ToastMessage({ type: "WARNING", message: "Airline Already exists" });
      }
      if (result.responseStatus === "Saved Successfully") {
        ToastMessage({
          type: "SUCCESS",
          message: "Airline Saved Successfully",
        });
        formikHelpers.resetForm();
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        ToastMessage({ type: "WARNING", message: "Airline Already exists" });
      }
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
  return (
    <div className="saveAirlinecontainer">
      <div className="airlineForm-container">
        <Formik
          initialValues={initialAirlineValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form>
              <div>
                <FormikControl
                  control="input"
                  label="RegistrationNumber :"
                  name="registrationNumber"
                  type="number"
                  placeholder="Enter RegistrationNumber"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Airline Name :"
                  name="airlineName"
                  type="text"
                  placeholder="Enter Airline Name"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="IATA code :"
                  name="iataCode"
                  type="text"
                  placeholder="Enter Iata Code"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Website :"
                  name="websiteLink"
                  type="text"
                  placeholder="Enter WebSite Link"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Economy Seats :"
                  name="economySeats"
                  type="number"
                  placeholder="Enter Economy Seats"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Business Seats :"
                  name="businessSeats"
                  type="number"
                  placeholder="Enter Business Seats"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="FirstClass Seats :"
                  name="firstClassSeats"
                  type="number"
                  placeholder="Enter FirstClass Seats"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Airline Logo :"
                  name="airlineLogo"
                  type="text"
                  placeholder="Upload Image link"
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

export default SaveAirline;
