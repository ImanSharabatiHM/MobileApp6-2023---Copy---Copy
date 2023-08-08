import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../../config/colors";

function LogoTitle({ logoStyle }) {
  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, logoStyle]}
        source={require("../../assets/logo.png")}
      />
    </View>
  );
}
export default LogoTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
});
