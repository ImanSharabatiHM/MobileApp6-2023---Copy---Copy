import React from "react";
import { useFormikContext } from "formik";

import Switch from "../Switch";
import ErrorMessage from "./ErrorMessage";

function AppFormSwitch({
  name,
  width,
  onValueChange = () => null,
  placeholder,
  ...otherProps
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <Switch
        placeholder={placeholder}
        onValueChange={(newValue) => {
          setFieldValue(name, newValue);
          onValueChange(newValue);
        }}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormSwitch;
