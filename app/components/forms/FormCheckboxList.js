import React, { useRef } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import CheckBoxList from "../CheckBoxList";

function FormCheckboxList({ name, values }) {
  const { errors, setFieldValue, touched } = useFormikContext();

  const handleChange = (checks) => {
    setFieldValue(name, checks);
   // console.log(checks, name);
  };

  return (
    <>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      <CheckBoxList values={values} onChange={handleChange} />
    </>
  );
}

export default FormCheckboxList;
