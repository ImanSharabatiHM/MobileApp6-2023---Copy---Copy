import React, { useRef } from "react";
import { Formik } from "formik";
import Toast from "react-native-easy-toast";

import colors from "../../config/colors";
import { View } from "react-native";

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
  const toast = useRef();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (
        <View>
          {!isValid &&
            isSubmitting &&
            toast?.current?.show("من فضلك صحح أخطاء النموذج.", 750)}
          <Toast
            ref={toast}
            show={!isValid && isSubmitting}
            style={{ backgroundColor: colors.danger }}
            position="bottom"
            positionValue={250}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: colors.white }}
          />
          {children}
        </View>
      )}
    </Formik>
  );
}

export default AppForm;
