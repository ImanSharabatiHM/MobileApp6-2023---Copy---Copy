import React, { useState } from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import styles from "../../config/styles";
import colors from "../../config/colors";

function AppFormField({ name, width,showPlaceholder,style,onChangeText,  ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    editable=true,
    touched,
    values,
    keyboardType
    } = useFormikContext();

  const [isBlured, setIsBlured] = useState(false);

  return (
    <>
      <TextInput
        onBlur={() => {
          setFieldTouched(name);
          setIsBlured(true);
           
        }}
        paddingVertical={6}
        editable={true}       
        keyboardType={keyboardType}      
        onChangeText={(text) =>{           
          setFieldValue(name, text); 
          if(onChangeText!=null)
          onChangeText(text);           
          }}
        value={values[name]}
        style={[styles.text,style]}
        showPlaceholder={showPlaceholder}
        
      {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
