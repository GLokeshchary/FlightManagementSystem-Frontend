import React from "react";
import FormikControl from "../../formik/FormikControl";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { saveAirport } from "../../services/api";
import ToastMessage from "../../notifications/ToastMessage";
const initialAirportValues = {
  airportName: "",
  iataCode: "",
  airportType: "",
  country: "INDIA",
  city: "",
};
const airportTypeOptions = [
  "Select Type",
  "International",
  "Domestic",
  "Customs",
  "State/Private",
];
const validationSchema = Yup.object({
  airportName: Yup.string().required("Requried"),
  iataCode: Yup.string()
    .matches(/^[A-Z]+$/, "Must contain only capital letters")
    .required("Required"),
  country: Yup.string()
    .matches(/^[A-Z]+$/, "Must contain only capital letters")
    .required("Required"),
  city: Yup.string()
    .matches(
      /^[A-Z][a-z]+$/,
      "Must start with a capital letter followed by lowercase letters"
    )
    .required("Required"),
  airportType: Yup.string().required("Required"),
});
function SaveAirport() {
  const onSubmit = async (values, formikHelpers) => {
    try {
      const result = await saveAirport("/airports/save", values);
      console.log(result);
      if (result.responseStatus === "Airport already exists") {
        ToastMessage({ type: "WARNING", message: "Airport already exists" });
      }
      if (result.responseStatus === "Successfully Saved") {
        ToastMessage({
          type: "SUCCESS",
          message: "Airport Saved Successfully",
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
  return (
    <div className="saveAirlinecontainer">
      <div className="airlineForm-container">
        <Formik
          initialValues={initialAirportValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form>
              <div>
                <FormikControl
                  control="input"
                  label="Airport Name :"
                  name="airportName"
                  type="text"
                  placeholder="Enter Airport Name"
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
                  control="select"
                  label="Airport Type:"
                  name="airportType"
                  type="text"
                  options={airportTypeOptions}
                  placeholder="Enter Iata Code"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="Country :"
                  name="country"
                  type="text"
                  placeholder="Enter Country"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  label="City :"
                  name="city"
                  type="text"
                  placeholder="Enter City"
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

export default SaveAirport;
