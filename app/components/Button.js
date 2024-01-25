import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import style from "../config/styles";

function AppButton({
  iconName,
  enabled=true,
  title,
  onPress,
  color = "primary",
  buttonStyle,
  textStyle,
}) {
  return (
    <TouchableOpacity
       style={[styles.button, { backgroundColor: colors[color] }, buttonStyle]}
      onPress={onPress}
      disabled={!enabled}
    >
       {iconName&&<MaterialCommunityIcons
                name={iconName}
                color={colors.dark}
                size={35}
              />}
     {title&& <Text style={[style.text, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "100%",
    marginVertical: 5,
    paddingVertical: 5,
  },

});

export default AppButton;
