import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ buttonStyle, textStyle, title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      title={title}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
