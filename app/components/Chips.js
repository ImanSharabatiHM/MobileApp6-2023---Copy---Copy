import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

function Chips({ title, onPress, color = "white", buttonStyle, textStyle }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 3,
    height: 40,
    minWidth: 100,
    width: "auto",
    marginRight: 10,
  },
  text: {
    color: defaultStyles.colors.medium,
    // color: colors.white,
    fontSize: 15,
    //fontWeight: "bold",
  },
});

export default Chips;
