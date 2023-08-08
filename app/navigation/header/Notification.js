import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Notification(props) {
  return <MaterialCommunityIcons name="bell" size={30} style={styles.icon} />;
}
export default Notification;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    color: colors.white,
  },
});
