import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function Icon({
  name,
  size = 35,
  backgroundColor = "transparent",
  iconColor = "#fff",
  localIcon = false,
  iconStyle,
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        iconStyle,
      ]}
    >
      {!localIcon && (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.6}         
        />
      )}
      {localIcon && (
        <Image
          style={[styles.image,iconStyle, { width: size * 0.8, height: size * 0.8 }]}
          source={name}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { resizeMode: "contain" },
});

export default Icon;
