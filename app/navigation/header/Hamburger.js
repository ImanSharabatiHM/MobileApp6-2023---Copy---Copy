import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

function Hamburger({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="menu" size={40} style={styles.icon} />
    </TouchableOpacity>
  );
}
export default Hamburger;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 20,
    color: colors.white,
  },
});
