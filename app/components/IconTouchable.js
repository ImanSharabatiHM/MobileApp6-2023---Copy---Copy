import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./Text";
import colors from "../config/colors";

function IconTouchable({
  name,
  size = 40,
  backgroundColor = "transparent",
  iconColor = "#fff",
  localIcon = false,
  iconStyle,
  onPress,
  text,
}) {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <View
        style={[
          {
            flexDirection:"row",
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
            size={size * 0.5}
            style={{margin:0,padding:0}}
          />
        )}
        {localIcon && (
          <Image
            style={[styles.image, { width: size * 0.8, height: size * 0.8 }]}
            source={name}
          />
        )}
        {text&&
        <AppText  style={styles.text}>{text}</AppText>
        }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: { resizeMode: "contain" },
  text: { 
    fontSize:12,
    fontFamily:'Cairo_600SemiBold',
    color:colors.primary,
    backgroundColor:colors.danger
  },
});

export default IconTouchable;
