import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

function Favorite({
  isFavorite,
  color = colors.white,
  onPress,
  size = 30,
  style,
  ...props
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} {...props}>
      <View style={[styles.container, style]}>
        <MaterialCommunityIcons
          size={size}
          color={color}
          name={isFavorite ? "star" : "star-outline"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    padding: 3,
  },
});

export default Favorite;
