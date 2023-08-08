import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "./Text";
import defaultStyles from "../config/styles";
import { Switch } from "react-native";

function AppSwitch({
  placeholder,
  onValueChange,
  width = "100%",
  status,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <Switch value={status} onValueChange={onValueChange} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: defaultStyles.colors.light,
    // borderRadius: 25,
    // flexDirection: "row",
    // alignItems: "center",
    // padding: 15,
    // marginVertical: 10,
    backgroundColor: defaultStyles.colors.white,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 15,
    // marginBottom: 10,
  },
  placeholder: {
    flex: 1,
    color: defaultStyles.colors.facebook,
    fontSize: 16,
    //fontWeight: "bold",
    width: "100%",
  },
  text: {
    flex: 1,
  },
});

export default AppSwitch;
