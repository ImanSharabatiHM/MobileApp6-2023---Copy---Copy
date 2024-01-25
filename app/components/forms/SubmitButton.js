import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ buttonStyle, textStyle, title,icon,enabled=true }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      iconName={icon}
      title={title}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
      onPress={handleSubmit}
      enabled={enabled}
    />
  );
}

export default SubmitButton;
