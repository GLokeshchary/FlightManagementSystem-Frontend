import React from "react";
import { ErrorMessage, Field } from "formik";
import ErrorMessageText from "./ErrorMessageText";
import "./InputField.css";
function InputField(props) {
  const { label, name, type, placeholder, ...rest } = props;

  return (
    <div className="input-container">
      <div className="inputHeader">
        <label htmlFor={name}>{label}</label>
        <ErrorMessage name={name} component={ErrorMessageText} />
      </div>
      <div>
        <Field
          className="fieldInput"
          type={type}
          label={label}
          name={name}
          id={name}
          placeholder={placeholder}
          required
          {...rest}
        />
      </div>
    </div>
  );
}

export default InputField;
