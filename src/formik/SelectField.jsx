import React from "react";
import { ErrorMessage, Field } from "formik";
import ErrorMessageText from "./ErrorMessageText";
import "./InputField.css";
function SelectField(props) {
  const { label, name, options, type, placeholder, ...rest } = props;
  return (
    <div className="input-container">
      <div className="inputHeader">
        <label htmlFor={name}>{label}</label>
        <ErrorMessage name={name} component={ErrorMessageText} />
      </div>
      <div>
        <Field
          className="fieldInput"
          as="select"
          type={type}
          label={label}
          name={name}
          id={name}
          placeholder={placeholder}
          required
          {...rest}
        >
          {options?.map((option, i) => {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })}
        </Field>
      </div>
    </div>
  );
}

export default SelectField;
