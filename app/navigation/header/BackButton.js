import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import colors from "../../config/colors";

function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={{ width: 35 }} onPress={onPress}>
      <Feather name="arrow-right-circle" size={35} style={styles.icon} />
    </TouchableOpacity>
  );
}
export default BackButton;

const styles = StyleSheet.create({
  icon: {
    color: colors.white,
  },
});
